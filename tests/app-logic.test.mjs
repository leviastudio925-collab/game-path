import test from 'node:test';
import assert from 'node:assert/strict';

test('filters programmes across country, discipline, portfolio and strength', async () => {
  const { programmes } = await import('../src/data.js');
  const { filterProgrammes } = await import('../src/logic.js');
  const result = filterProgrammes(programmes, {
    country: 'Australia',
    discipline: 'Game Design',
    portfolio: 'Portfolio Recommended',
    strength: 'Game Mechanics',
  });
  assert.deepEqual(result.map((item) => item.university), ['RMIT University', 'QUT']);
});

test('quiz answers recommend game programming for coding plus strong mathematics', async () => {
  const { calculatePath } = await import('../src/logic.js');
  const result = calculatePath(['Technology', 'Coding', 'C++ / Python', 'Strong', 'Programming gameplay systems']);
  assert.equal(result.discipline, 'Game Programming');
  assert.equal(result.match, 94);
  assert.ok(result.careers.includes('Gameplay Programmer'));
});

test('quiz answers recommend narrative design for story-led choices', async () => {
  const { calculatePath } = await import('../src/logic.js');
  const result = calculatePath(['Story & Narrative', 'Stories', 'Writing', 'Average', 'Writing game narratives']);
  assert.equal(result.discipline, 'Narrative Design');
  assert.ok(result.match >= 90);
});

test('saved comparison list is capped at four and toggles existing ids off', async () => {
  const { toggleSaved } = await import('../src/logic.js');
  assert.deepEqual(toggleSaved(['a', 'b'], 'a'), ['b']);
  assert.deepEqual(toggleSaved(['a', 'b', 'c', 'd'], 'e'), ['a', 'b', 'c', 'd']);
  assert.deepEqual(toggleSaved(['a', 'b'], 'c'), ['a', 'b', 'c']);
});

test('tuition cap filters numeric GBP and AUD amounts', async () => {
  const { programmes } = await import('../src/data.js');
  const { filterProgrammes } = await import('../src/logic.js');
  const result = filterProgrammes(programmes, { country:'United Kingdom', tuitionMax:17000 });
  assert.deepEqual(result.map((item) => item.university), ['Teesside University', 'University of Derby']);
});

test('filters by study level, destination and subject family before discipline', async () => {
  const { filterProgrammes } = await import('../src/logic.js');
  const sample = [
    { id:'hk-pg-dm', level:'Postgraduate', country:'Hong Kong', family:'Digital Media Arts', discipline:'Service Design', portfolio:'Portfolio Required', strengths:['Research'], type:'Art & Design University', difficulty:'Reach', tuitionValue:210000 },
    { id:'hk-ug-dm', level:'Undergraduate', country:'Hong Kong', family:'Digital Media Arts', discipline:'Service Design', portfolio:'Portfolio Required', strengths:['Research'], type:'Art & Design University', difficulty:'Reach', tuitionValue:180000 },
    { id:'hk-pg-game', level:'Postgraduate', country:'Hong Kong', family:'Game Design', discipline:'Service Design', portfolio:'Portfolio Required', strengths:['Research'], type:'Art & Design University', difficulty:'Reach', tuitionValue:200000 },
  ];
  const result = filterProgrammes(sample, {
    level:'Postgraduate', country:'Hong Kong', family:'Digital Media Arts', discipline:'Service Design',
  });
  assert.deepEqual(result.map((item) => item.id), ['hk-pg-dm']);
});

test('uses tuitionValue so Hong Kong tuition caps work without parsing labels', async () => {
  const { filterProgrammes } = await import('../src/logic.js');
  const sample = [
    { id:'within', country:'Hong Kong', tuition:'HKD 190,000', tuitionValue:190000, strengths:[] },
    { id:'above', country:'Hong Kong', tuition:'HKD 220,000', tuitionValue:220000, strengths:[] },
  ];
  assert.deepEqual(filterProgrammes(sample, { country:'Hong Kong', tuitionMax:200000 }).map((item) => item.id), ['within']);
});

test('builds three routing questions plus the selected subject branch', async () => {
  const { getQuizQuestions } = await import('../src/logic.js');
  const common = getQuizQuestions();
  const games = getQuizQuestions('Game Design');
  const digital = getQuizQuestions('Digital Media Arts');
  assert.equal(common.length, 3);
  assert.equal(games.length, 8);
  assert.equal(digital.length, 8);
  assert.equal(common[0].key, 'level');
  assert.equal(common[1].key, 'country');
  assert.equal(common[2].key, 'family');
  assert.notEqual(games[3].prompt, digital[3].prompt);
});

test('digital media quiz recommends service design and preserves routing choices', async () => {
  const { calculatePath } = await import('../src/logic.js');
  const result = calculatePath({
    level:'Postgraduate',
    country:'Hong Kong',
    family:'Digital Media Arts',
    preferences:['Services & Systems','Research & Strategy','Figma / Prototyping','Strong','Improving a public service'],
  });
  assert.equal(result.level, 'Postgraduate');
  assert.equal(result.country, 'Hong Kong');
  assert.equal(result.family, 'Digital Media Arts');
  assert.equal(result.discipline, 'Service Design');
  assert.ok(result.careers.includes('Service Designer'));
});

test('every programme discipline is available in its matching subject-area explorer', async () => {
  const { disciplines, programmes } = await import('../src/data.js');
  const available = new Set(disciplines.map((item) => `${item.family}:${item.name}`));
  const missing = programmes
    .filter((item) => !available.has(`${item.family}:${item.discipline}`))
    .map((item) => `${item.family}:${item.discipline}`);
  assert.deepEqual([...new Set(missing)], []);
});

test('Hong Kong postgraduate game quiz route has a matching programme result', async () => {
  const { programmes } = await import('../src/data.js');
  const { calculatePath, filterProgrammes } = await import('../src/logic.js');
  const result = calculatePath({
    level:'Postgraduate', country:'Hong Kong', family:'Game Design',
    preferences:['Rules & Mechanics','Game Prototypes','Unity / Unreal Engine','Average','Designing how a game works'],
  });
  const matches = filterProgrammes(programmes, result);
  assert.ok(matches.some((item) => item.university === 'City University of Hong Kong'));
});

test('catalogue provides balanced coverage across destination, level and subject area', async () => {
  const { programmes } = await import('../src/data.js');
  assert.ok(programmes.length >= 60);
  for (const country of ['United Kingdom', 'Australia', 'Hong Kong']) {
    for (const level of ['Undergraduate', 'Postgraduate']) {
      for (const family of ['Game Design', 'Digital Media Arts']) {
        const count = programmes.filter((item) => item.country === country && item.level === level && item.family === family).length;
        assert.ok(count >= 4, `${country} / ${level} / ${family} only has ${count}`);
      }
    }
  }
});

test('every programme exposes a specialist cluster and a reviewable official source', async () => {
  const { programmes } = await import('../src/data.js');
  const incomplete = programmes.filter((item) => !item.cluster || !item.source?.startsWith('https://') || !item.reviewedAt);
  assert.deepEqual(incomplete.map((item) => item.id), []);
});

test('filters programmes by specialist cluster', async () => {
  const { programmes } = await import('../src/data.js');
  const { filterProgrammes } = await import('../src/logic.js');
  const result = filterProgrammes(programmes, {
    country:'Hong Kong', level:'Undergraduate', family:'Digital Media Arts', cluster:'Experience Design',
  });
  assert.ok(result.length >= 2);
  assert.ok(result.every((item) => item.cluster === 'Experience Design'));
});

test('adjacent recommendations preserve route and rank the requested cluster first', async () => {
  const { programmes } = await import('../src/data.js');
  const { getAdjacentProgrammes } = await import('../src/logic.js');
  const result = getAdjacentProgrammes(programmes, {
    country:'Australia', level:'Postgraduate', family:'Game Design', discipline:'Narrative Design',
  }, 3);
  assert.equal(result.length, 3);
  assert.ok(result.every((item) => item.country === 'Australia' && item.level === 'Postgraduate' && item.family === 'Game Design'));
  assert.equal(result[0].cluster, 'Design & Story');
});

test('filters the catalogue by university without losing the selected study route', async () => {
  const { programmes } = await import('../src/data.js');
  const { filterProgrammes } = await import('../src/logic.js');
  const result = filterProgrammes(programmes, {
    country:'United Kingdom',
    level:'Postgraduate',
    family:'Digital Media Arts',
    university:'UAL London College of Communication',
  });
  assert.ok(result.length >= 10);
  assert.ok(result.every((item) => item.university === 'UAL London College of Communication'));
  assert.ok(result.every((item) => item.country === 'United Kingdom' && item.level === 'Postgraduate'));
});

test('the expanded UK catalogue covers specialist schools and substantial course depth', async () => {
  const { programmes } = await import('../src/data.js');
  const uk = programmes.filter((item) => item.country === 'United Kingdom');
  const universities = new Set(uk.map((item) => item.university));
  assert.ok(uk.length >= 100, `UK catalogue only has ${uk.length} programmes`);
  assert.ok(universities.size >= 25, `UK catalogue only has ${universities.size} universities`);
  assert.ok(uk.filter((item) => item.university === 'UAL London College of Communication').length >= 35);
  assert.ok(uk.filter((item) => item.university === 'UAL Creative Computing Institute').length >= 8);
});

test('builds an alphabetical university list from the active study route', async () => {
  const { programmes } = await import('../src/data.js');
  const { getUniversityOptions } = await import('../src/logic.js');
  const result = getUniversityOptions(programmes, {
    country:'United Kingdom', level:'Postgraduate', family:'Digital Media Arts', discipline:'Service Design',
  });
  assert.ok(result.includes('UAL London College of Communication'));
  assert.ok(result.includes('Royal College of Art'));
  assert.deepEqual(result, [...result].sort((a,b) => a.localeCompare(b)));
  assert.ok(!result.includes('Abertay University'));
});

test('pages long programme results without hiding the total count', async () => {
  const { getProgrammePage } = await import('../src/logic.js');
  const items = Array.from({ length:25 }, (_, index) => ({ id:String(index + 1) }));
  const page = getProgrammePage(items, 18);
  assert.equal(page.items.length, 18);
  assert.equal(page.total, 25);
  assert.equal(page.remaining, 7);
});

test('every programme has detail-safe focus content and a consistent university type', async () => {
  const { programmes } = await import('../src/data.js');
  const missingFocus = programmes.filter((item) => typeof item.focus !== 'string' || !item.focus.trim());
  assert.deepEqual(missingFocus.map((item) => item.id), []);
  const types = new Map();
  for (const item of programmes) {
    if (!types.has(item.university)) types.set(item.university, new Set());
    types.get(item.university).add(item.type);
  }
  const inconsistent = [...types.entries()].filter(([, values]) => values.size > 1).map(([university]) => university);
  assert.deepEqual(inconsistent, []);
});

test('changing a route or advanced filter clears a university that may no longer be valid', async () => {
  const { updateProgrammeFilters } = await import('../src/logic.js');
  const current = { country:'United Kingdom', university:'UAL London College of Communication', portfolio:'', tuitionMax:null };
  assert.equal(updateProgrammeFilters(current, 'portfolio', 'Portfolio Required').university, '');
  assert.equal(updateProgrammeFilters(current, 'tuitionMax', 30000).university, '');
  assert.equal(updateProgrammeFilters(current, 'university', 'Royal College of Art').university, 'Royal College of Art');
});
