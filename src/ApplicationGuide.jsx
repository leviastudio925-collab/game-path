import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CaretDown } from '@phosphor-icons/react';
import { programmes } from './data.js';
import { destinations } from './destinations.js';
import { filterProgrammes } from './logic.js';
import { countryGuides, directionGuides, getProgrammeApplicationAdvice, guideReviewedAt, studyLevelLabels } from './application-guides.js';

function OfficialSources({ sources }) {
  return <div className="guide-sources"><span>官方依据</span>{sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label}<ArrowRight /></a>)}</div>;
}

function RequirementCards({ route, language = route.language }) {
  return <div className="guide-requirements">{[
    ['01','学术背景',route.academic],
    ['02','作品与项目',route.portfolio],
    ['03','语言准备',language],
    ['04','考试与评估',route.selection],
  ].map(([index,label,description]) => <article key={label}><span className="eyebrow">{index} / REQUIREMENTS</span><h4>{label}</h4><p>{description}</p></article>)}</div>;
}

export function ProgrammeApplicationAdvice({ item }) {
  const advice = getProgrammeApplicationAdvice(item);
  if (!advice) return null;
  const { country, route, direction } = advice;
  return <details className="programme-advice" lang="zh-CN">
    <summary><span><small>APPLICATION &amp; DIRECTION</small><strong>申请难度与专业方向分析</strong></span><CaretDown aria-hidden="true" /></summary>
    <div className="programme-advice-body">
      <p className="advice-context">{country.name} · {studyLevelLabels[item.level]} · 准备难度参考：{route.difficulty}</p>
      <p>{route.summary}</p>
      <p className="guide-method">按目的地与学习阶段归纳，供准备规划使用；并非本课程的录取概率或个人“冲稳保”评级。</p>
      <RequirementCards route={route} language={advice.language} />
      {advice.qualificationNote && <p className="advice-highlight">{advice.qualificationNote}</p>}
      {direction && <div className="advice-direction"><h4>{direction.name}</h4><p>{direction.study}</p><p><strong>适合谁：</strong>{direction.fit}</p><p><strong>难点：</strong>{direction.challenge}</p><p>{advice.portfolioNote}</p><ul>{direction.evidence.map((evidence) => <li key={evidence}>{evidence}</li>)}</ul><p className="advice-highlight"><strong>常见误区：</strong>{direction.pitfall}</p></div>}
      <OfficialSources sources={route.sources} />
    </div>
  </details>;
}

export function ApplicationGuide({ onExplore }) {
  const [countryKey, setCountryKey] = useState('United Kingdom');
  const [level, setLevel] = useState('Postgraduate');
  const [cluster, setCluster] = useState('Experience Design');
  useEffect(() => {
    const selectGuide = ({ detail = {} }) => {
      if (countryGuides[detail.country]) setCountryKey(detail.country);
      if (studyLevelLabels[detail.level]) setLevel(detail.level);
      if (directionGuides.some((guide) => guide.cluster === detail.cluster)) setCluster(detail.cluster);
    };
    window.addEventListener('gamepath-guide', selectGuide);
    return () => window.removeEventListener('gamepath-guide', selectGuide);
  }, []);
  const country = countryGuides[countryKey];
  const route = country.routes[level];
  const direction = directionGuides.find((guide) => guide.cluster === cluster);
  const matching = useMemo(() => filterProgrammes(programmes, { country:countryKey, level, cluster }), [countryKey, level, cluster]);
  return <section className="application-guide" id="application-guide" lang="zh-CN" aria-labelledby="application-guide-title">
    <div className="guide-heading"><div><p className="eyebrow">05 / APPLICATION GUIDE</p><h2 id="application-guide-title">看清申请门槛，<br />再选专业方向。</h2></div><p>英国、澳洲、香港、意大利。按本科与研究生分别看准备难点，再把你的兴趣转成有依据的专业选择。</p></div>
    <div className="guide-toolbar"><p>你正在规划哪一阶段？</p><div className="guide-levels" role="group" aria-label="申请级别">{Object.entries(studyLevelLabels).map(([value,label]) => <button key={value} type="button" aria-pressed={level === value} onClick={() => setLevel(value)}>{label}<span>{value === 'Undergraduate' ? 'UG' : 'PG'}</span></button>)}</div></div>
    <p className="guide-method">难度为编辑依据材料投入、创作成熟度及申请环节作出的准备参考，不是录取率。以下以样本院校说明路径，不代表目的地内所有课程统一要求；最低条件也不等于录取承诺。</p>
    <div className="guide-destinations" role="group" aria-label="申请目的地">{destinations.map((value) => {
      const guide = countryGuides[value];
      return <button type="button" key={value} className={value === countryKey ? 'selected' : ''} aria-pressed={value === countryKey} onClick={() => setCountryKey(value)}><span className="eyebrow">{guide.short}</span><strong>{guide.name}</strong><span className="guide-difficulty">{guide.routes[level].difficulty}</span><small>{guide.focus}</small></button>;
    })}</div>
    <div className="guide-country-content" aria-live="polite" aria-atomic="false">
      <div className="guide-route-intro"><div><p className="eyebrow">{country.short} / {level === 'Undergraduate' ? 'UNDERGRADUATE' : 'POSTGRADUATE'}</p><h3>{country.name} · {studyLevelLabels[level]}申请</h3><span className="guide-rating">准备难度参考：{route.difficulty}</span></div><div><h4>{route.emphasis}</h4><p>{route.summary}</p></div></div>
      <RequirementCards route={route} />
      <div className="guide-next"><h4>准备顺序</h4><ol>{route.steps.map((step) => <li key={step}>{step}</li>)}</ol></div>
      <OfficialSources sources={route.sources} />
    </div>
    <div className="guide-direction-heading"><div><p className="eyebrow">MATCH YOUR PRACTICE</p><h3>这个方向，适合你吗？</h3></div><label htmlFor="guide-direction">专业方向<select id="guide-direction" value={cluster} onChange={(event) => setCluster(event.target.value)}>{directionGuides.map((guide) => <option key={guide.cluster} value={guide.cluster}>{guide.name}</option>)}</select></label></div>
    <div className="guide-direction-content" aria-live="polite" aria-atomic="false">
      <div className="guide-direction-overview"><p className="eyebrow">{direction.tag}</p><h4>{direction.name}</h4><p>{direction.study}</p><h5>适合谁</h5><p>{direction.fit}</p><h5>投入与难点</h5><p>{direction.challenge}</p></div>
      <div className="guide-direction-evidence"><h4>作品要证明什么</h4><ol>{direction.evidence.map((evidence) => <li key={evidence}>{evidence}</li>)}</ol><p className="advice-highlight"><strong>常见误区：</strong>{direction.pitfall}</p><p className="guide-method">以上为准备建议；项目数量、格式、工具与提交方式以各课程官方要求为准。</p></div>
      <div className="guide-local-note"><h4>{country.name} · 选课提醒</h4><p>{direction.countryNotes[countryKey]}</p><p><strong>职业关联：</strong>{direction.careers}</p></div>
    </div>
    <div className="guide-actions"><p>{matching.length ? <>当前目录有 <strong>{matching.length}</strong> 条符合「{country.name} · {studyLevelLabels[level]} · {direction.name}」的专业／方向。</> : <>当前目录暂未收录「{country.name} · {studyLevelLabels[level]} · {direction.name}」的课程。可切换方向，或查看该目的地已收录课程；不代表当地没有相关专业。</>}</p><button type="button" className="dark-button" onClick={() => onExplore({ country:countryKey, level, ...(matching.length ? { cluster } : {}) })}>{matching.length ? '查看对应专业' : '查看该目的地课程'}<ArrowRight /></button></div>
    <p className="guide-reviewed">REVIEWED {guideReviewedAt} · 难度与方向分析用于规划，正式入学要求以所选课程当年公布的信息为准。</p>
  </section>;
}
