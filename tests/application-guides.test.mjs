import test from 'node:test';
import assert from 'node:assert/strict';
import { programmes } from '../src/data.js';
import { getProgrammeApplicationAdvice } from '../src/application-guides.js';

test('an English-taught Italian undergraduate course gets the correct language and submission advice', () => {
  const course = programmes.find((item) => item.id === 'polimi-interaction-ug');
  const advice = getProgrammeApplicationAdvice(course);
  assert.equal(advice.country.name, '意大利');
  assert.ok(advice.language.includes('英语授课'));
  assert.ok(advice.portfolioNote.includes('不代表本课程要求提交作品集'));
  assert.equal(advice.direction.cluster, 'Experience Design');
  assert.equal(advice.qualificationNote, '');
});

test('Italian specialising Masters are distinguished from second-cycle degrees', () => {
  const domus = getProgrammeApplicationAdvice(programmes.find((item) => item.id === 'domus-interaction-pg'));
  const polimi = getProgrammeApplicationAdvice(programmes.find((item) => item.id === 'polimi-digital-interaction-pg'));
  assert.ok(domus.qualificationNote.includes('专业进修型 Master'));
  assert.equal(polimi.qualificationNote, '');
});

test('a bilingual Italian course asks the applicant to confirm the teaching track', () => {
  const advice = getProgrammeApplicationAdvice(programmes.find((item) => item.id === 'naba-creative-game-ug'));
  assert.ok(advice.language.includes('教学班'));
  assert.equal(advice.direction.cluster, 'Design & Story');
});

test('every catalogue course receives advice matching its own destination, degree level and cluster', () => {
  for (const course of programmes) {
    const advice = getProgrammeApplicationAdvice(course);
    assert.ok(advice, `Missing advice: ${course.id}`);
    assert.equal(advice.direction?.cluster, course.cluster, `Wrong direction: ${course.id}`);
    assert.ok(advice.route.sources.length, `Missing official sources: ${course.id}`);
  }
  const undergraduate = getProgrammeApplicationAdvice(programmes.find((item) => item.id === 'ual-games'));
  const postgraduate = getProgrammeApplicationAdvice(programmes.find((item) => item.id === 'ual-games-pg'));
  assert.notEqual(undergraduate.route.emphasis, postgraduate.route.emphasis);
  assert.ok(postgraduate.route.steps.some((step) => step.includes('研究')));
});

test('an unsupported destination is not silently assigned another country’s admission advice', () => {
  assert.equal(getProgrammeApplicationAdvice({ country:'Unknown', level:'Postgraduate' }), null);
  assert.equal(getProgrammeApplicationAdvice({ country:'Italy', level:'Foundation' }), null);
});
