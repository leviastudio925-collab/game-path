import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BookmarkSimple, CaretDown, Check, GameController, List, MagnifyingGlass, X } from '@phosphor-icons/react';
import { disciplines, entryRoutes, programmes } from './data.js';
import { countryLabel, destinations, tuitionConfig } from './destinations.js';
import { ApplicationGuide, ProgrammeApplicationAdvice } from './ApplicationGuide.jsx';
import { calculatePath, filterProgrammes, getAdjacentProgrammes, getProgrammePage, getQuizQuestions, getUniversityOptions, toggleSaved, updateProgrammeFilters } from './logic.js';

const filterOptions = {
  level:['Undergraduate','Postgraduate'],
  country:destinations,
  family:['Game Design','Digital Media Arts'],
  portfolio:['Portfolio Required','Portfolio Recommended','No Portfolio'],
  strength:['Visual Art','3D','Game Mechanics','Programming','Mathematics','Storytelling','Creative Technology','Research','Prototyping','Systems Thinking'],
  type:['Art & Design University','Traditional University','Technology University','Specialist Games School'],
};
const emptyFilters = { level:'', country:'', family:'', cluster:'', discipline:'', university:'', portfolio:'', strength:'', type:'', difficulty:'', tuitionMax:null };

const formatTuition = (item) => `${item.tuition}${item.tuitionValue ? ` / ${item.tuitionPeriod || 'year'}` : ''}`;

function Brand() {
  return <button className="brand" onClick={() => window.scrollTo({ top:0, behavior:'smooth' })} aria-label="GAME PATH home"><GameController weight="fill" /><span>GAME PATH</span></button>;
}

function SelectField({ label, value, options, onChange }) {
  return <label className="select-field"><span>{label}</span><span className="select-shell"><select value={value} onChange={(event) => onChange(event.target.value)}><option value="">Any {label.toLowerCase()}</option>{options.map((option) => <option key={option}>{option}</option>)}</select><CaretDown /></span></label>;
}

function Header({ onQuiz, saved, onCompare, menuOpen, setMenuOpen }) {
  return <header className="site-header"><Brand /><nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Primary navigation">
    <a href="#programmes" onClick={() => setMenuOpen(false)}>Programmes</a><a href="#application-guide" onClick={() => setMenuOpen(false)}>Application Guide</a><a href="#disciplines" onClick={() => setMenuOpen(false)}>Disciplines</a><a href="#routes" onClick={() => setMenuOpen(false)}>Entry Routes</a><a href="#portfolio" onClick={() => setMenuOpen(false)}>Portfolio Guide</a><button className="nav-compare" onClick={onCompare}>Compare <sup>{saved.length}</sup></button>
  </nav><button className="search-button" aria-label="Search programmes" onClick={() => document.querySelector('#programmes')?.scrollIntoView({behavior:'smooth'})}><MagnifyingGlass /></button><button className="parents-button" onClick={() => document.querySelector('#routes')?.scrollIntoView({behavior:'smooth'})}>For Parents</button><button className="dark-button header-cta" onClick={onQuiz}>Find My Path <ArrowRight /></button><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><List /></button></header>;
}

function Hero({ onQuiz }) {
  return <section className="hero"><div className="hero-copy"><p className="eyebrow">CREATIVE EDUCATION / UK + AUSTRALIA + HONG KONG + ITALY</p><h1><span>GAME</span><span>PATH</span></h1><h2>Find Your Creative Path.</h2><p className="hero-intro">Explore undergraduate and postgraduate programmes in games and digital media arts.</p><div className="hero-actions"><button className="dark-button" onClick={onQuiz}>Find My Path <ArrowRight /></button><a className="outline-button" href="#programmes">Explore Universities <ArrowRight /></a></div><p className="microcopy">PEOPLE&nbsp;&nbsp;/&nbsp;&nbsp; IDEAS&nbsp;&nbsp;/&nbsp;&nbsp; MEDIA&nbsp;&nbsp;/&nbsp;&nbsp; BRIGHTER TOMORROWS</p></div><div className="hero-visual"><img src="/assets/game-path-hero.png" alt="A creative technology student refining a 3D environment beside a digital model" /><div className="hero-manifesto">CURIOSITY<br />SKILLS<br />OPPORTUNITY<br />A BRIGHTER<br />PLAYGROUND</div><div className="hero-index">01</div><div className="hero-lavender"><span>CREATIVE EDUCATION<br />REAL WORLD IMPACT</span><span>STUDENTS TODAY<br />BOLDER WORLDS TOMORROW</span></div></div></section>;
}

function ProgrammeRow({ item, saved, onSave, onOpen }) {
  return <article className="programme-row"><button className={saved ? 'save-button saved' : 'save-button'} onClick={() => onSave(item.id)} aria-label={saved ? `Remove ${item.university} from compare` : `Save ${item.university} to compare`}><BookmarkSimple weight={saved ? 'fill' : 'regular'} /></button><div className="programme-school"><p className="row-kicker">{item.city}, {countryLabel[item.country]}</p><h3>{item.university}</h3></div><div className="programme-degree"><div className="route-badges"><span>{item.level === 'Undergraduate' ? 'UG' : 'PG'}</span><span>{item.family === 'Game Design' ? 'GAMES' : 'DIGITAL MEDIA'}</span></div><h4>{item.programme}</h4><p>{item.description}</p><div className="tags"><span>{item.cluster}</span><span>{item.discipline}</span><span>{item.portfolio}</span><span>{item.duration}</span>{item.language && <span>{item.language}</span>}{item.sector && <span>{item.sector}</span>}</div></div><button className="row-action" onClick={() => onOpen(item)} aria-label={`View ${item.programme}`}><ArrowRight /></button></article>;
}

function Finder({ saved, setSaved, onCompare, onOpen }) {
  const [filters, setFilters] = useState(emptyFilters);
  const [advanced, setAdvanced] = useState(false);
  const [visibleCount, setVisibleCount] = useState(18);
  useEffect(() => {
    const handle = (event) => setFilters({ ...emptyFilters, ...event.detail });
    window.addEventListener('gamepath-recommend', handle);
    return () => window.removeEventListener('gamepath-recommend', handle);
  }, []);
  const results = useMemo(() => filterProgrammes(programmes, filters), [filters]);
  const adjacent = useMemo(() => results.length || !filters.level || !filters.country || !filters.family ? [] : getAdjacentProgrammes(programmes, filters, 3), [results.length, filters]);
  const update = (key, value) => {
    setVisibleCount(18);
    setFilters((current) => updateProgrammeFilters(current, key, value));
  };
  const relevantDisciplines = disciplines.filter((item) => (!filters.family || item.family === filters.family) && (!filters.cluster || item.cluster === filters.cluster));
  const disciplineOptions = relevantDisciplines.map((item) => item.name);
  const clusterOptions = [...new Set(disciplines.filter((item) => !filters.family || item.family === filters.family).map((item) => item.cluster))];
  const universityOptions = getUniversityOptions(programmes, filters);
  const universityCount = new Set(programmes.map((item) => item.university)).size;
  const resultPage = getProgrammePage(results, visibleCount);
  const tuition = tuitionConfig[filters.country] || tuitionConfig['United Kingdom'];
  return <section className="finder" id="programmes"><div className="section-lead"><p className="eyebrow">01 / UNIVERSITY FINDER</p><h2>Explore Creative<br />Programmes</h2></div><div className="finder-intro"><p>Browse {programmes.length} curated routes from {universityCount} universities across {destinations.length} destinations, two study levels and six specialist clusters.</p><button className="text-button" onClick={() => setAdvanced(!advanced)}>{advanced ? 'Fewer filters' : 'More filters'} <CaretDown /></button></div><div className="finder-arrow"><ArrowRight /></div><div className="filters primary-filters"><SelectField label="Study Level" value={filters.level} options={filterOptions.level} onChange={(v) => update('level',v)} /><SelectField label="Country / Region" value={filters.country} options={filterOptions.country} onChange={(v) => update('country',v)} /><SelectField label="Subject Area" value={filters.family} options={filterOptions.family} onChange={(v) => update('family',v)} /><SelectField label="Specialist Cluster" value={filters.cluster} options={clusterOptions} onChange={(v) => update('cluster',v)} /><SelectField label="Discipline" value={filters.discipline} options={disciplineOptions} onChange={(v) => update('discipline',v)} /><SelectField label="University" value={filters.university} options={universityOptions} onChange={(v) => update('university',v)} />{advanced && <><SelectField label="Portfolio" value={filters.portfolio} options={filterOptions.portfolio} onChange={(v) => update('portfolio',v)} /><SelectField label="Student Strength" value={filters.strength} options={filterOptions.strength} onChange={(v) => update('strength',v)} /><SelectField label="University Type" value={filters.type} options={filterOptions.type} onChange={(v) => update('type',v)} />{filters.country && <label className="range-field"><span>Tuition cap{filters.country === 'Italy' ? ' (EUR)' : ''}</span><strong>{tuition.symbol}{(filters.tuitionMax || tuition.max).toLocaleString()}</strong><input type="range" min={tuition.min} max={tuition.max} step={tuition.step} value={filters.tuitionMax || tuition.max} onChange={(event) => update('tuitionMax', Number(event.target.value))} />{filters.country === 'Italy' && <small>Listed fee: per year or per programme as shown in course details. Unknown and historical fees are excluded when a cap is set.</small>}</label>}</>}<div className="result-count"><strong>{results.length || adjacent.length}</strong> {results.length || !adjacent.length ? 'programmes' : 'closest'}</div><button className="lime-button" onClick={() => { setVisibleCount(18); setFilters(emptyFilters); }} aria-label="Clear filters">{Object.values(filters).some(Boolean) ? 'Clear' : <ArrowRight />}</button></div><button className="finder-guide-link" onClick={() => { window.dispatchEvent(new CustomEvent('gamepath-guide', { detail:filters })); document.querySelector('#application-guide')?.scrollIntoView({ behavior:'smooth' }); }}>{filters.country ? '查看所选目的地的申请难度与方向分析' : '比较四个目的地的申请难度与专业方向'}<ArrowRight /></button>{filters.country === 'Italy' && <aside className="destination-note"><p className="eyebrow">STUDY IN ITALY / NEW MEDIA &amp; CREATIVE TECHNOLOGY</p><p>Explore public academies, universities and private design schools. Triennio / first-cycle diplomas are undergraduate routes; Biennio / second-cycle diplomas and Laurea Magistrale are master’s-level routes. A one-year Academic Master is a separate specialising award. Check each course’s teaching language and current intake.</p><p>Official names and specialisations are retained. Confirm unlisted or income-based fees with the institution.</p></aside>}<div className="programme-list">{results.length ? resultPage.items.map((item) => <ProgrammeRow key={item.id} item={item} saved={saved.includes(item.id)} onSave={(id) => setSaved(toggleSaved(saved,id))} onOpen={onOpen} />) : adjacent.length ? <><div className="adjacent-intro"><p className="eyebrow">CLOSEST ROUTES</p><h3>No exact match — these keep your destination and study level.</h3></div>{adjacent.map((item) => <ProgrammeRow key={item.id} item={item} saved={saved.includes(item.id)} onSave={(id) => setSaved(toggleSaved(saved,id))} onOpen={onOpen} />)}</> : <div className="empty-state"><h3>No exact match yet.</h3><p>Choose a study level, destination and subject area to see the closest routes.</p><button className="outline-button" onClick={() => { setVisibleCount(18); setFilters(emptyFilters); }}>Reset filters</button></div>}</div>{resultPage.remaining > 0 ? <button className="load-more" onClick={() => setVisibleCount((count) => count + 18)}>Show 18 more <span>{resultPage.remaining} remaining</span><ArrowRight /></button> : results.length > 4 && <p className="list-note">Showing all {results.length} programmes — select any programme for full entry details.</p>}{saved.length > 0 && <button className="compare-ribbon" onClick={onCompare}>Compare {saved.length} Programme{saved.length > 1 ? 's' : ''}<ArrowRight /></button>}</section>;
}

function Quiz({ onClose, onRecommendations }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ level:'', country:'', family:'', preferences:[] });
  const [result, setResult] = useState(null);
  const questions = getQuizQuestions(answers.family);
  const question = questions[step];
  const answer = (choice) => {
    const next = question.key === 'preference'
      ? { ...answers, preferences:[...answers.preferences, choice] }
      : { ...answers, [question.key]:choice };
    const nextQuestions = getQuizQuestions(next.family);
    if (step === nextQuestions.length - 1) setResult(calculatePath(next));
    else { setAnswers(next); setStep(step + 1); }
  };
  const goBack = () => {
    const previousQuestion = questions[step - 1];
    setAnswers((current) => previousQuestion.key === 'preference'
      ? { ...current, preferences:current.preferences.slice(0,-1) }
      : { ...current, [previousQuestion.key]:'' });
    setStep(step - 1);
  };
  return <div className="modal-backdrop" role="presentation"><section className="quiz-modal" role="dialog" aria-modal="true" aria-label="Find My Path quiz"><button className="modal-close" onClick={onClose} aria-label="Close quiz"><X /></button>{result ? <div className="quiz-result"><p className="eyebrow">YOUR CREATIVE PATH</p><div className="result-route"><span>{result.level}</span><span>{result.country}</span><span>{result.family}</span></div><h2>{result.discipline}</h2><div className="match-score"><strong>{result.match}%</strong><span>match</span></div><p>Based on your study plans and the way you like to research, make and communicate, this is your strongest starting direction.</p><h3>Suitable careers</h3><div className="result-careers">{result.careers.map((career) => <span key={career}>{career}</span>)}</div><button className="lime-button result-cta" onClick={() => { onRecommendations(result); onClose(); }}>Explore Recommended Programmes <ArrowRight /></button></div> : <><div className="quiz-progress"><span>QUESTION {String(step + 1).padStart(2,'0')} / 08</span><div>{Array.from({length:8},(_,index) => <i key={index} className={index <= step ? 'active' : ''} />)}</div></div><p className="quiz-stage">{step < 3 ? 'YOUR STUDY PLAN' : answers.family.toUpperCase()}</p><h2>{question.prompt}</h2><div className="quiz-options">{question.options.map((choice) => <button key={choice} onClick={() => answer(choice)}>{choice}<ArrowRight /></button>)}</div><button className="quiz-back" disabled={step === 0} onClick={goBack}>← Previous</button></>}</section></div>;
}

function ProgrammeModal({ item, onClose, saved, onSave }) {
  if (!item) return null;
  return <div className="modal-backdrop"><section className="detail-modal" role="dialog" aria-modal="true" aria-label={`${item.university} programme details`}><button className="modal-close" onClick={onClose} aria-label="Close programme"><X /></button><p className="eyebrow">{item.city} / {item.country}</p><div className="result-route"><span>{item.level}</span><span>{item.family}</span><span>{item.cluster}</span></div><h2>{item.university}</h2><h3>{item.programme}</h3><p className="detail-summary">{item.description}</p><div className="detail-grid"><div><span>Overview</span><strong>{item.focus}</strong></div><div><span>Entry Requirements</span><strong>{item.entry}</strong></div><div><span>Portfolio</span><strong>{item.portfolio}</strong></div><div><span>Language Requirement</span><strong>{item.english}</strong></div><div><span>Tuition</span><strong>{formatTuition(item)}</strong></div><div><span>Duration</span><strong>{item.duration}</strong></div>{[['Qualification',item.qualification],['Teaching Language',item.language],['Credits',item.credits],['Institution',item.sector]].filter(([,value]) => value).map(([label,value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>{(item.intakeNote || item.tuitionNote) && <div className="course-notes">{item.intakeNote && <p><strong>Intake:</strong> {item.intakeNote}</p>}{item.tuitionNote && <p><strong>Fees:</strong> {item.tuitionNote}</p>}{item.feeSource && <a href={item.feeSource} target="_blank" rel="noreferrer">View official fee schedule <ArrowRight /></a>}</div>}<div className="student-fit"><p className="eyebrow">STUDENT FIT</p><h4>Best for students interested in:</h4><div className="tags large">{[item.discipline,...item.strengths,item.focus.split(',')[0]].map((tag) => <span key={tag}>{tag}</span>)}</div></div><ProgrammeApplicationAdvice item={item} /><div className="source-note"><span>LAST REVIEWED {item.reviewedAt}</span><a href={item.source} target="_blank" rel="noreferrer">View official programme source <ArrowRight /></a></div><div className="detail-footer"><button className={saved ? 'lime-button' : 'dark-button'} onClick={() => onSave(item.id)}>{saved ? <Check /> : <BookmarkSimple />}{saved ? 'Added to Compare' : 'Save to Compare'}</button><p>Career direction: {item.careers.join(' · ')}</p></div></section></div>;
}

function CompareModal({ items, onClose, onRemove }) {
  return <div className="modal-backdrop"><section className="compare-modal" role="dialog" aria-modal="true" aria-label="Compare programmes"><button className="modal-close" onClick={onClose} aria-label="Close compare"><X /></button><p className="eyebrow">SIDE BY SIDE / UP TO FOUR</p><h2>Compare Programmes</h2>{items.length < 2 ? <div className="empty-state"><h3>Choose at least two programmes.</h3><p>Use the bookmark controls in the finder to build your comparison.</p></div> : <div className="compare-scroll"><table><thead><tr><th>Dimension</th>{items.map((item) => <th key={item.id}>{item.university}<button onClick={() => onRemove(item.id)} aria-label={`Remove ${item.university}`}><X /></button></th>)}</tr></thead><tbody>{[['Programme','programme'],['Study Level','level'],['Subject Area','family'],['Country','country'],['Duration','duration'],['Portfolio','portfolio'],['Academic Entry','entry'],['Teaching Language','language'],['Qualification','qualification'],['Language Requirement','english'],['Tuition','tuition'],['Main Focus','focus'],['Career Direction','careers']].map(([label,key]) => <tr key={key}><th>{label}</th>{items.map((item) => <td key={item.id}>{key === 'tuition' ? formatTuition(item) : Array.isArray(item[key]) ? item[key].join(', ') : item[key] || 'See official course page'}</td>)}</tr>)}</tbody></table></div>}</section></div>;
}

function DisciplineSection() {
  const [family, setFamily] = useState('Game Design');
  const [active, setActive] = useState(0);
  const visible = disciplines.filter((item) => item.family === family); const item = visible[active] || visible[0];
  const clusters = [...new Set(visible.map((discipline) => discipline.cluster))];
  const changeFamily = (value) => { setFamily(value); setActive(0); };
  return <section className="discipline-section" id="disciplines"><div className="discipline-list"><p className="eyebrow">02 / DISCIPLINES</p><div className="family-tabs"><button className={family==='Game Design'?'active':''} onClick={() => changeFamily('Game Design')}>Game Design</button><button className={family==='Digital Media Arts'?'active':''} onClick={() => changeFamily('Digital Media Arts')}>Digital Media Arts</button></div>{clusters.map((cluster) => <div className="discipline-group" key={cluster}><h3>{cluster}</h3>{visible.filter((discipline) => discipline.cluster === cluster).map((discipline) => { const index = visible.indexOf(discipline); return <button key={discipline.name} className={index === active ? 'active' : ''} onClick={() => setActive(index)}><span>{String(index + 1).padStart(2,'0')}</span>{discipline.name}<ArrowRight /></button>; })}</div>)}</div><div className="discipline-detail"><p className="eyebrow">{item.cluster} / {item.kicker}</p><h2>{item.name}</h2><p>Discover what you will make, the skills you will build and how a portfolio can prove your direction.</p><div className="discipline-columns"><div><h3>Focus</h3>{item.focus.map((value) => <span key={value}>{value}</span>)}</div><div><h3>Careers</h3>{item.careers.map((value) => <span key={value}>{value}</span>)}</div><div><h3>Portfolio</h3>{item.portfolio.map((value) => <span key={value}>{value}</span>)}</div></div></div></section>;
}

function RouteSection() {
  const [active, setActive] = useState(0); const route = entryRoutes[active];
  return <section className="route-section" id="routes"><div className="section-lead"><p className="eyebrow">03 / ENTRY ROUTES</p><h2>Different routes.<br />Same destination.</h2><p>A-Level and BTEC are alternatives, not a pair. Explore the route you are taking now.</p></div><div className="route-tabs">{entryRoutes.map((item,index) => <button className={index===active ? 'active':''} key={item.name} onClick={() => setActive(index)}>{item.name}</button>)}</div><div className="route-card"><p className="eyebrow">ROUTE {String(active+1).padStart(2,'0')}</p><h3>{route.name}</h3><p className="route-type">{route.type}</p><h4>Suitable for</h4><div className="tags large">{route.suitable.map((value) => <span key={value}>{value}</span>)}</div><p className="route-note">{route.note}</p></div></section>;
}

function PortfolioSection() {
  const guides = disciplines.filter((item) => ['Game Design','Game Art','Game Programming','Service Design','Product Design','Immersive Media'].includes(item.name)); const [active, setActive] = useState(0);
  return <section className="portfolio-section" id="portfolio"><p className="eyebrow">04 / PORTFOLIO GUIDE</p><div className="portfolio-head"><h2>Make your work<br />say something.</h2><p>Choose a target. We will reshape the checklist around what admissions teams need to see.</p></div><div className="portfolio-tabs">{guides.map((guide,index) => <button className={active===index ? 'active':''} onClick={() => setActive(index)} key={guide.name}>{guide.name}</button>)}</div><ol className="portfolio-steps">{guides[active].portfolio.map((step,index) => <li key={step}><span>{String(index+1).padStart(2,'0')}</span><strong>{step}</strong><p>{index === 0 ? 'Show the idea and your reason for making it.' : index === guides[active].portfolio.length-1 ? 'Finish with reflection: what changed, and why?' : 'Document process, decisions and what you learned.'}</p></li>)}</ol></section>;
}

export function App() {
  const [saved, setSaved] = useState(() => JSON.parse(localStorage.getItem('game-path-saved') || '[]'));
  const [quizOpen, setQuizOpen] = useState(false); const [selected, setSelected] = useState(null); const [compareOpen, setCompareOpen] = useState(false); const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => localStorage.setItem('game-path-saved', JSON.stringify(saved)), [saved]);
  useEffect(() => { document.body.style.overflow = quizOpen || selected || compareOpen ? 'hidden' : ''; return () => { document.body.style.overflow=''; }; }, [quizOpen,selected,compareOpen]);
  const compareItems = programmes.filter((item) => saved.includes(item.id));
  const recommend = (result) => { document.querySelector('#programmes')?.scrollIntoView({behavior:'smooth'}); setTimeout(() => window.dispatchEvent(new CustomEvent('gamepath-recommend',{detail:{ level:result.level || '', country:result.country || '', family:result.family || '', cluster:result.cluster || '', discipline:result.discipline || '' }})),300); };
  return <><Header onQuiz={() => setQuizOpen(true)} saved={saved} onCompare={() => setCompareOpen(true)} menuOpen={menuOpen} setMenuOpen={setMenuOpen} /><main><Hero onQuiz={() => setQuizOpen(true)} /><Finder saved={saved} setSaved={setSaved} onCompare={() => setCompareOpen(true)} onOpen={setSelected} /><DisciplineSection /><RouteSection /><PortfolioSection /><ApplicationGuide onExplore={recommend} /></main><footer><Brand /><p>Independent programme discovery for future game and digital media makers.</p><button className="dark-button" onClick={() => setQuizOpen(true)}>Find My Path <ArrowRight /></button></footer>{quizOpen && <Quiz onClose={() => setQuizOpen(false)} onRecommendations={recommend} />}{selected && <ProgrammeModal item={selected} onClose={() => setSelected(null)} saved={saved.includes(selected.id)} onSave={(id) => setSaved(toggleSaved(saved,id))} />}{compareOpen && <CompareModal items={compareItems} onClose={() => setCompareOpen(false)} onRemove={(id) => setSaved(toggleSaved(saved,id))} />}</>;
}
