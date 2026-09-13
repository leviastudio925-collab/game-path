const scoring = {
  'Characters & Worlds': { 'Game Art':3, 'Narrative Design':2 },
  'Rules & Mechanics': { 'Game Design':4 },
  Technology: { 'Game Programming':4, 'Technical Art':2 },
  'Story & Narrative': { 'Narrative Design':4 },
  'Immersion & Interaction': { 'XR & Interactive Media':4, 'Game Design':1 },
  'Drawing & Illustration': { 'Game Art':4 },
  '3D Models': { 'Game Art':3, 'Technical Art':3 },
  'Game Prototypes': { 'Game Design':4, 'Game Development':2 },
  Coding: { 'Game Programming':4 },
  Stories: { 'Narrative Design':4 },
  'Interactive Experiences': { 'XR & Interactive Media':4 },
  'Photoshop / Procreate': { 'Game Art':3 },
  'Blender / Maya': { 'Game Art':3, 'Technical Art':3 },
  'Unity / Unreal Engine': { 'Game Design':3, 'Game Development':3 },
  'C++ / Python': { 'Game Programming':5 },
  'TouchDesigner / Creative Coding': { 'XR & Interactive Media':4, 'Technical Art':2 },
  Writing: { 'Narrative Design':4 },
  Strong: { 'Game Programming':3, 'Technical Art':1 },
  Average: { 'Game Design':1, 'Narrative Design':1 },
  'Not My Strength': { 'Game Art':2, 'Narrative Design':2 },
  'Designing how a game works': { 'Game Design':5 },
  'Building game worlds': { 'Game Art':4, 'Technical Art':1 },
  'Creating characters': { 'Game Art':5 },
  'Programming gameplay systems': { 'Game Programming':5 },
  'Writing game narratives': { 'Narrative Design':5 },
  'Creating immersive experiences': { 'XR & Interactive Media':5 },
  'Services & Systems': { 'Service Design':5, 'Interaction Design':1 },
  'Products & Interfaces': { 'Product Design':5, 'UX/UI Design':2 },
  'Moving Image & Sound': { 'Multimedia Entertainment':5, 'Digital Media Arts':2 },
  'Immersive Experiences': { 'Immersive Media':5, 'Creative Technology':2 },
  'Research & Strategy': { 'Service Design':4, 'Product Design':1 },
  'Visual Craft': { 'Digital Media Arts':4, 'Multimedia Entertainment':2 },
  'Prototyping & Making': { 'Product Design':4, 'Interaction Design':2 },
  'Creative Coding': { 'Creative Technology':4, 'Immersive Media':2 },
  'Figma / Prototyping': { 'Service Design':3, 'Product Design':3, 'UX/UI Design':2 },
  'Adobe Creative Cloud': { 'Digital Media Arts':3, 'Multimedia Entertainment':3 },
  'TouchDesigner / Unity': { 'Immersive Media':4, 'Creative Technology':3 },
  'Research tools': { 'Service Design':4, 'UX/UI Design':2 },
  'Improving a public service': { 'Service Design':5 },
  'Designing a useful product': { 'Product Design':5 },
  'Crafting a digital interface': { 'UX/UI Design':5, 'Interaction Design':2 },
  'Producing entertainment media': { 'Multimedia Entertainment':5 },
  'Building an immersive installation': { 'Immersive Media':5, 'Creative Technology':2 },
};

const careerMap = {
  'Game Design':['Game Designer','Level Designer','Systems Designer','Technical Designer'],
  'Game Art':['Character Artist','Environment Artist','3D Artist','Concept Artist'],
  'Game Programming':['Gameplay Programmer','Engine Programmer','AI Programmer','Tools Programmer'],
  'Game Development':['Game Developer','Technical Designer','Producer'],
  'Technical Art':['Technical Artist','Tools Artist','VFX Artist'],
  'Narrative Design':['Narrative Designer','Game Writer','Quest Designer'],
  'XR & Interactive Media':['XR Designer','Creative Technologist','Interaction Designer'],
  'Service Design':['Service Designer','Design Researcher','Experience Strategist'],
  'Product Design':['Product Designer','UX Designer','Design Strategist'],
  'Interaction Design':['Interaction Designer','Experience Designer','UX Prototyper'],
  'UX/UI Design':['UX Designer','UI Designer','Product Designer'],
  'Multimedia Entertainment':['Multimedia Designer','Motion Designer','Creative Producer'],
  'Creative Technology':['Creative Technologist','Interactive Developer','Experience Designer'],
  'Immersive Media':['Immersive Designer','XR Designer','Spatial Experience Designer'],
  'Digital Media Arts':['Digital Media Artist','Visual Designer','Creative Producer'],
};

const routingQuestions = [
  { key:'level', prompt:'Which level are you applying for?', options:['Undergraduate','Postgraduate'] },
  { key:'country', prompt:'Where would you like to study?', options:['United Kingdom','Australia','Hong Kong'] },
  { key:'family', prompt:'Which broad direction feels closer to you?', options:['Game Design','Digital Media Arts'] },
];

const gameQuestions = [
  { key:'preference', prompt:'What attracts you most when playing a game?', options:['Characters & Worlds','Rules & Mechanics','Technology','Story & Narrative','Immersion & Interaction'] },
  { key:'preference', prompt:'What do you enjoy creating?', options:['Drawing & Illustration','3D Models','Game Prototypes','Coding','Stories','Interactive Experiences'] },
  { key:'preference', prompt:'Which tools interest you?', options:['Photoshop / Procreate','Blender / Maya','Unity / Unreal Engine','C++ / Python','TouchDesigner / Creative Coding','Writing'] },
  { key:'preference', prompt:'How comfortable are you with mathematics?', options:['Strong','Average','Not My Strength'] },
  { key:'preference', prompt:'Which outcome sounds most exciting?', options:['Designing how a game works','Building game worlds','Creating characters','Programming gameplay systems','Writing game narratives','Creating immersive experiences'] },
];

const digitalQuestions = [
  { key:'preference', prompt:'What kind of experience do you most want to shape?', options:['Services & Systems','Products & Interfaces','Moving Image & Sound','Immersive Experiences'] },
  { key:'preference', prompt:'Which way of working feels most natural?', options:['Research & Strategy','Visual Craft','Prototyping & Making','Creative Coding'] },
  { key:'preference', prompt:'Which tools would you like to develop?', options:['Figma / Prototyping','Adobe Creative Cloud','TouchDesigner / Unity','Research tools'] },
  { key:'preference', prompt:'How comfortable are you presenting research and rationale?', options:['Strong','Average','Not My Strength'] },
  { key:'preference', prompt:'Which outcome sounds most meaningful?', options:['Improving a public service','Designing a useful product','Crafting a digital interface','Producing entertainment media','Building an immersive installation'] },
];

export function getQuizQuestions(family) {
  if (!family) return routingQuestions;
  return [...routingQuestions, ...(family === 'Digital Media Arts' ? digitalQuestions : gameQuestions)];
}

export function filterProgrammes(items, filters) {
  return items.filter((item) =>
    (!filters.level || item.level === filters.level) &&
    (!filters.country || item.country === filters.country) &&
    (!filters.university || item.university === filters.university) &&
    (!filters.family || item.family === filters.family) &&
    (!filters.cluster || item.cluster === filters.cluster) &&
    (!filters.discipline || item.discipline === filters.discipline) &&
    (!filters.portfolio || item.portfolio === filters.portfolio) &&
    (!filters.strength || item.strengths.includes(filters.strength)) &&
    (!filters.type || item.type === filters.type) &&
    (!filters.difficulty || item.difficulty === filters.difficulty) &&
    (!filters.tuitionMax || (() => {
      const amount = item.tuitionValue ?? Number(item.tuition?.replace(/[^0-9]/g,'') || 0);
      return amount > 0 && amount <= filters.tuitionMax;
    })())
  );
}

export function getUniversityOptions(items, filters={}) {
  const { university: _selectedUniversity, ...routeFilters } = filters;
  return [...new Set(filterProgrammes(items, routeFilters).map((item) => item.university))]
    .sort((a,b) => a.localeCompare(b));
}

export function getProgrammePage(items, limit=18) {
  const visible = Math.max(0, limit);
  return { items:items.slice(0, visible), total:items.length, remaining:Math.max(0, items.length - visible) };
}

export function updateProgrammeFilters(current, key, value) {
  return {
    ...current,
    [key]:value,
    ...(key !== 'university' ? { university:'' } : {}),
    ...(key === 'family' ? { cluster:'', discipline:'' } : {}),
    ...(key === 'cluster' ? { discipline:'' } : {}),
    ...(key === 'country' ? { tuitionMax:null } : {}),
  };
}

const clusterByDiscipline = {
  'Game Design':'Design & Story', 'Narrative Design':'Design & Story',
  'Game Art':'Visual Art & Animation', 'Games Animation':'Visual Art & Animation',
  'Game Programming':'Technology & Real-time', 'Game Development':'Technology & Real-time', 'Technical Art':'Technology & Real-time', 'XR & Interactive Media':'Technology & Real-time',
  'Service Design':'Experience Design', 'Product Design':'Experience Design', 'Interaction Design':'Experience Design', 'UX/UI Design':'Experience Design',
  'Digital Media Arts':'Media Arts & Production', 'Multimedia Entertainment':'Media Arts & Production',
  'Animation & Motion':'Media Arts & Production', 'Visual Effects & 3D':'Media Arts & Production',
  'Creative Technology':'Creative Technology & Immersion', 'Immersive Media':'Creative Technology & Immersion',
};

export function getAdjacentProgrammes(items, filters, limit=3) {
  const routeMatches = items.filter((item) =>
    (!filters.level || item.level === filters.level) &&
    (!filters.country || item.country === filters.country) &&
    (!filters.family || item.family === filters.family)
  );
  const preferredCluster = filters.cluster || clusterByDiscipline[filters.discipline];
  return routeMatches
    .map((item, index) => ({ item, index, score:(item.cluster === preferredCluster ? 3 : 0) + (item.discipline === filters.discipline ? 2 : 0) }))
    .sort((a,b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map(({ item }) => item);
}

export function calculatePath(answers) {
  const profile = Array.isArray(answers) ? { preferences:answers, family:'Game Design' } : answers;
  const preferences = profile.preferences || [];
  const totals = {};
  preferences.forEach((answer) => Object.entries(scoring[answer] || {}).forEach(([key, value]) => {
    totals[key] = (totals[key] || 0) + value;
  }));
  const fallback = profile.family === 'Digital Media Arts' ? 'Digital Media Arts' : 'Game Design';
  const [discipline=fallback, score=0] = Object.entries(totals).sort((a,b) => b[1]-a[1])[0] || [];
  const match = Math.min(94, 82 + score);
  return { level:profile.level, country:profile.country, family:profile.family || 'Game Design', discipline, match, careers: careerMap[discipline] || careerMap[fallback] };
}

export function toggleSaved(saved, id) {
  if (saved.includes(id)) return saved.filter((value) => value !== id);
  if (saved.length >= 4) return saved;
  return [...saved, id];
}
