export const guideReviewedAt = '17 October 2026';
export const studyLevelLabels = { Undergraduate:'本科', Postgraduate:'研究生' };

// Difficulty describes preparation demands, not acceptance rates or a personal offer prediction.
export const countryGuides = {
  'United Kingdom': {
    name:'英国', short:'UK', focus:'作品集过程 · 研究表达 · 课程匹配',
    routes:{
      Undergraduate:{
        difficulty:'中等—较高', emphasis:'创作潜力与发展过程',
        summary:'先满足课程的学历和成绩条件，再看创作过程是否能说明你的观察、实验与发展潜力。不同院校和课程的门槛差异很大。',
        academic:'核对课程认可的高中、A-Level、IB、BTEC 或衔接资格；不要把某一院校的入学条件用于整个英国。',
        portfolio:'艺术与设计课程常按要求提交数字作品集；过程、草图、实验和反思应与成品一起呈现。具体内容和格式按课程要求调整。',
        language:'按具体课程核对英语总分、单项及认可的证明方式，并确认条件录取中的语言条件。',
        selection:'以 UAL 为例，课程可能要求数字作品集、书面任务或面试；先读课程页面，再安排各项材料。',
        steps:['确认直接本科还是预科／衔接路径。','围绕个人观察完成项目，并保留发展过程。','按每门课程分别整理作品集、陈述和可能的面试准备。'],
        sources:[
          {label:'UAL 本科申请流程',url:'https://www.arts.ac.uk/study-at-ual/apply/undergraduate'},
          {label:'UAL 作品集建议',url:'https://www.arts.ac.uk/study-at-ual/apply/portfolio-advice'},
        ],
      },
      Postgraduate:{
        difficulty:'较高：独立项目与匹配度', emphasis:'研究立场与专业成熟度',
        summary:'准备重心从“我会哪些工具”转向“我想研究什么，以及为什么适合这门课程”。达到最低学历要求后，仍要用作品与申请材料证明方向匹配。',
        academic:'核对学位、专业背景及可接受的职业经验；跨专业申请要具体说明可迁移能力。',
        portfolio:'选择能呈现问题意识、方法和个人贡献的项目。研究型艺术实践、服务设计与技术型课程不能共用同一套叙事。',
        language:'除满足正式英语要求外，还要能口头解释研究、设计选择和迭代依据。',
        selection:'UAL 明确要求按不同课程的入学与评估要求调整申请；RCA 等课程也会在作品中评估创意和学习潜力。',
        steps:['阅读课程内容，确定问题与方法是否匹配。','把项目整理成研究—实验—结果—反思的证据链。','用个人陈述说明既有经验与下一步研究目标。'],
        sources:[
          {label:'UAL 研究生申请流程',url:'https://www.arts.ac.uk/study-at-ual/apply/postgraduate'},
          {label:'RCA Information Experience Design',url:'https://www.rca.ac.uk/study/programme-finder/information-experience-design-ma/'},
        ],
      },
    },
  },
  Australia:{
    name:'澳洲', short:'AUSTRALIA', focus:'学术条件 · 额外选拔任务 · 项目实践',
    routes:{
      Undergraduate:{
        difficulty:'中等—较高：按选拔方式区分', emphasis:'先确认是否有 Selection Task',
        summary:'把学术入学条件与额外选拔分开核对。不能因为选择澳洲，就假设游戏或数字艺术专业都免作品集。',
        academic:'按申请资格和身份查看成绩、先修科目及学校认可的衔接路径；不同资格不能直接套用同一分数。',
        portfolio:'以 RMIT Bachelor of Games 为例，申请涉及 Selection Task 和创意作品；豁免只适用于指定条件或路径。',
        language:'查看当前课程接受的英语证明与语言衔接方式；语言路径不等于免除其他录取条件。',
        selection:'额外任务、作品集和申请是不同环节。提前按课程清单准备，不把最低学术条件理解为自动录取。',
        steps:['打开适合自身学历与身份的入学要求页面。','确认是否要提交 Selection Task 或作品集。','准备原型、创意发展过程，并明确团队项目中的个人贡献。'],
        sources:[
          {label:'RMIT Bachelor of Games 入学与选拔',url:'https://www.rmit.edu.au/study-with-us/levels-of-study/undergraduate-study/bachelor-degrees/bp214'},
          {label:'QUT Game Design 课程与入学要求',url:'https://www.qut.edu.au/courses/bachelor-of-games-and-interactive-environments-game-design'},
        ],
      },
      Postgraduate:{
        difficulty:'中等—较高：背景与作品并看', emphasis:'学位背景、实践证据与课程类型',
        summary:'先辨别课程是培养转专业能力，还是在既有专业基础上深化。以 RMIT 动画、游戏与交互硕士为例，官网明确说明存在竞争性选拔。',
        academic:'核对学位、相关背景、成绩和职业经验的适用条件；相似名称的课程未必接受相同背景。',
        portfolio:'实践型项目可用作品、原型、演示与职责说明证明准备程度；指定学历的作品任务豁免不能外推。',
        language:'按课程要求准备英语证明，同时训练讲解设计、制作流程与协作经验。',
        selection:'核对是否要求作品选拔任务、个人陈述或其他材料。不同课程的截止日期与审理方式应单独查看。',
        steps:['区分转专业型、进阶型与研究型课程。','用完成项目证明制作能力和个人角色。','把背景、作品与该课程的具体学习目标对应。'],
        sources:[
          {label:'RMIT Animation, Games and Interactivity 硕士',url:'https://www.rmit.edu.au/study-with-us/levels-of-study/postgraduate-study/masters-by-coursework/mc232'},
        ],
      },
    },
  },
  'Hong Kong': {
    name:'香港', short:'HONG KONG', focus:'申请身份 · 学业表现 · 创意材料',
    routes:{
      Undergraduate:{
        difficulty:'中高：学术与创意双线', emphasis:'申请通道与材料规则',
        summary:'先分清高考、国际课程等申请通道，再准备相应材料。作品集能说明创作潜力，但不能替代学术与语言条件。',
        academic:'按本人学历、申请身份和对应通道核对要求；高考、国际课程及本地通道的规定不能混用。',
        portfolio:'以 CityUHK 创意媒体学院为例，国际及内地非高考申请者有相应作品集提交要求；其他通道应另查。',
        language:'按学校与通道核对英语资格；作品中使用的语言和正式入学语言要求是两个问题。',
        selection:'关注作品上传、补件和可能的面试通知。主申请与学院材料可能有不同操作步骤。',
        steps:['确认申请资格与通道，而不只看专业名称。','用少量有辨识度的项目展示创意与跨媒介能力。','单独核对学校系统和学院作品集系统的要求。'],
        sources:[
          {label:'CityUHK 国际及非高考申请',url:'https://www.scm.cityu.edu.hk/admissions/undergraduate/international'},
          {label:'CityUHK 内地申请路径',url:'https://www.scm.cityu.edu.hk/en/admissions/undergraduate/mainland'},
        ],
      },
      Postgraduate:{
        difficulty:'中高：综合材料与专业匹配', emphasis:'成绩、作品、动机与经历协同',
        summary:'以 CityUHK MA Creative Media 为例，评审会综合看学业表现、课程背景、相关经历与创意材料；不能用作品集替代所有背景条件。',
        academic:'核对认可学位、成绩与相关经历；设计、媒体艺术和技术型课程的背景偏好并不相同。',
        portfolio:'MA、MFA、MDes 的材料要求应分别准备。CityUHK MFA 的 Main 与 Games Stream 要求创意作品及艺术家陈述。',
        language:'检查具体课程英语要求及豁免规则，同时准备清晰介绍作品、研究动机与个人贡献。',
        selection:'PolyU MDes 的作品提交另有系统和要求；技术型娱乐课程也可能看重 STEM 背景，逐项比对而非一套材料通投。',
        steps:['区分媒体艺术、设计方法与技术开发课程。','把成绩、经历、作品与目标课程放在同一条申请叙事中。','按专业要求分别准备作品集、陈述与可能的面试。'],
        sources:[
          {label:'CityUHK MA Creative Media 评审说明',url:'https://www.scm.cityu.edu.hk/en/admissions/postgraduate/macm'},
          {label:'CityUHK MFA Creative Media',url:'https://www.scm.cityu.edu.hk/en/admissions/postgraduate/mfacm'},
          {label:'PolyU MDes 课程与申请材料',url:'https://www.polyu.edu.hk/study/pg/tpg/2027/73035-ibd-ibp-isd-isp-ssd-ssp-ted-tep'},
          {label:'PolyU Innovative Multimedia Entertainment 申请',url:'https://www.polyu.edu.hk/sd/study/tpg/innovative-multimedia-entertainment/application/?sc_lang=en'},
        ],
      },
    },
  },
  Italy:{
    name:'意大利', short:'ITALY', focus:'学历类型 · 授课语言 · 入学评估',
    routes:{
      Undergraduate:{
        difficulty:'中高：语言与入学环节并行', emphasis:'公立美院、理工与私立路径分别核对',
        summary:'准备难点往往来自多环节叠加：学历适用性、课程授课语言和具体入学评估。公立美院、理工大学和私立设计学院不能套用同一流程。',
        academic:'确认是三年制 Laurea 还是 Diploma Accademico di I livello，并按学校要求核对境外学历材料。',
        portfolio:'美院项目可能安排作品与创作评估；米兰理工 Interaction Design 本科走 TOLD 设计入学考试，不能把作品集当作其必交材料。',
        language:'Brera 的入学与课程使用意大利语；米兰理工 Interaction Design 有英语授课路径。按具体课程选择语言准备。',
        selection:'核对当年考试、面试与申请手续。Brera 的国际申请安排与米兰理工 TOLD 的形式不能相互套用。',
        steps:['先确定公立美院、大学或私立学院路径。','按实际授课语言与考试科目安排准备。','把学校申请、学历文件与适用的国际学生手续逐项核对。'],
        sources:[
          {label:'Brera 国际学生申请',url:'https://www.accademiadibrera.milano.it/index.php/it/studenti-internazionali'},
          {label:'Brera 本科入学评估',url:'https://www.accademiadibrera.milano.it/index.php/it/svolgimento-degli-esami-dammissione-triennio'},
          {label:'米兰理工设计本科与 TOLD',url:'https://www.polimi.it/en/prospective-students/how-to-apply/admission-to-laurea-programmes/design'},
        ],
      },
      Postgraduate:{
        difficulty:'中高：按学历与语言路径拆分', emphasis:'第二周期学位与专业进修型 Master 有别',
        summary:'先确定目标学历类型，再评估准备量。两年制 Laurea Magistrale / Diploma Accademico di II livello 与一年左右的专业进修型 Master，在学制、资格与后续用途上需分别核对。',
        academic:'核对第一周期学位、课程背景及目标项目接受条件；不能只凭英文标题中的 Master 判断学历性质。',
        portfolio:'Brera Digital Arts 要求作品与面谈；米兰理工数字交互硕士会评估作品、背景等材料。以具体课程要求为准。',
        language:'意授项目要准备相应意大利语能力；英授和双语项目查看实际教学班及正式语言证明。',
        selection:'公立美院可能安排入学考试或面谈；大学和私立学院依各自规则评估。先确认学历与授课路径，再谈难易。',
        steps:['区分第二周期学位与专业进修型 Master。','围绕媒介、技术或设计研究建立连贯的项目线索。','按授课语言准备作品讲解，并核对当年的评估与学历要求。'],
        sources:[
          {label:'Brera Digital Arts 入学要求',url:'https://www.accademiadibrera.milano.it/it/arti-digitali-2-livello'},
          {label:'米兰理工 Digital and Interaction Design',url:'https://dynamicpoli.polimi.it/en/education/laurea-magistrale-programmes/programme-detail/digital-and-interaction-design'},
          {label:'Domus Interaction Design 学历与路线',url:'https://www.domusacademy.com/courses/design/master-in-interaction-design/'},
        ],
      },
    },
  },
};

export const directionGuides = [
  {
    cluster:'Design & Story', name:'游戏设计与叙事', tag:'GAME DESIGN / NARRATIVE',
    study:'研究规则、关卡、玩家行为与交互叙事，把一个创意发展为可以游玩和验证的体验。游戏策划、叙事设计与游戏编程的训练重点不同。',
    fit:'适合愿意反复拆解游戏、做原型、观察玩家反馈的人；喜欢玩游戏只是兴趣起点。',
    challenge:'较高的原型与迭代投入。难点是证明玩法和叙事为什么成立，而不只是展示世界观。',
    evidence:['一个能体验核心机制的原型或可交互叙事。','规则／关卡设计、测试记录与修改理由。','个人设计决策，以及团队项目中的明确职责。'],
    pitfall:'只交游戏设定书、概念图或成品视频，缺少玩家体验与测试证据。',
    careers:'Game Designer、Level Designer、Narrative Designer；就业还取决于岗位技能、项目与招聘要求。',
    countryNotes:{
      'United Kingdom':'对照课程是偏实验性游戏、叙事研究还是制作实践，按其方法选择项目。',
      Australia:'对照项目工作室和游戏制作要求，突出可玩原型、协作与迭代。额外 Selection Task 应单独准备。',
      'Hong Kong':'先看课程是独立的游戏方向，还是创意媒体下的 Games Stream；不要把两种申请材料混用。',
      Italy:'目录中的 NABA Game 是 Creative Technologies 学位内的专业方向；IED 则结合 CG 动画与游戏。先确认课程结构。',
    },
  },
  {
    cluster:'Visual Art & Animation', name:'游戏美术与角色动画', tag:'GAME ART / GAMES ANIMATION',
    study:'围绕角色、场景、视觉叙事和角色运动建立制作能力。概念设计、美术资产与动画表演对应不同作品集。',
    fit:'适合愿意持续训练观察、造型、构图或动作节奏，并能接受多轮修改的人。',
    challenge:'较高的视觉基本功与制作投入。要同时说明审美选择、技术流程与最终表现。',
    evidence:['角色／场景项目或有重点的动画片段。','从草图到模型、材质、灯光或动作的制作拆解。','参考分析、修改前后对比和个人贡献。'],
    pitfall:'把未经加工的素材、模板或 AI 图像当作完整制作能力，或只展示渲染结果。',
    careers:'Character Artist、Environment Artist、Games Animator；方向应与具体岗位作品要求相匹配。',
    countryNotes:{
      'United Kingdom':'核对 Games Art、Animation 与 Technical Art 的课程区别，避免用一套泛视觉作品申请所有方向。',
      Australia:'区分游戏美术、游戏动画与通用动画项目，准备对应制作与协作证据。',
      'Hong Kong':'若申请创意媒体课程，除技法外也要清楚表达作品主题及媒介选择。',
      Italy:'CG 动画、VFX 与游戏美术可能分属不同课程或专业方向；按课程官方名称与教学语言查找。',
    },
  },
  {
    cluster:'Technology & Real-time', name:'游戏技术与实时开发', tag:'PROGRAMMING / TECH ART / REAL-TIME',
    study:'覆盖程序系统、游戏引擎、技术美术与实时交互。编程、技术美术和 XR 虽然共享工具，但项目证据应各有重点。',
    fit:'适合愿意编程、调试、读技术资料、测试系统，并能解释技术选择的人。',
    challenge:'较高的技术准备；跨专业者尤其要补足实际开发证据。是否要求数学或计算机先修，须看具体课程。',
    evidence:['可运行的程序、游戏机制、着色器或交互演示。','本人编写的代码、系统结构与实现说明。','测试、性能或稳定性问题及解决过程。'],
    pitfall:'照教程复现后直接提交，缺少原创改动和对技术原理的解释。',
    careers:'Gameplay Programmer、Technical Artist、Interactive Developer；技术岗位要求差异很大。',
    countryNotes:{
      'United Kingdom':'先区分计算机／工程背景课程与艺术技术课程，分别核对先修科目和作品要求。',
      Australia:'游戏设计与 Software Technologies 等技术专业方向不可互换，检查编程内容与背景条件。',
      'Hong Kong':'对技术娱乐或创意媒体项目，具体查看 STEM 背景、作品和经历的适用要求。',
      Italy:'美院 Nuove Tecnologie dell’Arte 并不等于计算机科学。想走开发岗位，应仔细核对编程与引擎课程。',
    },
  },
  {
    cluster:'Experience Design', name:'交互、服务与产品设计', tag:'INTERACTION / SERVICE / PRODUCT / UX',
    study:'交互与 UX 关注人如何使用系统；服务设计连接人、流程和组织；产品设计还可能包含实体产品、材料与制造。',
    fit:'适合对人和情境有好奇心，愿意做研究、原型和测试，并能用证据解释设计的人。',
    challenge:'研究与方法投入较高。跨专业背景可以形成优势，但需要把既有经验转成可靠的研究与设计过程。',
    evidence:['真实问题、研究方法与有依据的需求判断。','交互原型／服务蓝图／产品模型及测试过程。','洞察如何影响设计，以及方案的限制与下一步。'],
    pitfall:'只做漂亮界面、缺少用户研究；或把 Service Design、Product Design 和 UX 当作同一个专业。',
    careers:'Interaction Designer、Service Designer、Product Designer、UX Researcher；课程名称不能直接对应唯一职业。',
    countryNotes:{
      'United Kingdom':'比较课程是否更偏社会议题、批判研究、实体产品或数字交互，再调整研究深度和项目形式。',
      Australia:'分清可接受转专业的设计课程和要求相关背景的进阶课程，用具体项目说明能力迁移。',
      'Hong Kong':'PolyU MDes 有不同 specialisms；按目标方向组织研究、系统设计与实践经验。',
      Italy:'同时比较米兰理工、IED、NABA、Domus 的课程和正式学历：两年制硕士层级与专业进修型 Master 应分别评估。',
    },
  },
  {
    cluster:'Media Arts & Production', name:'数字媒体艺术与视听制作', tag:'MEDIA ART / MOVING IMAGE / ANIMATION / VFX',
    study:'从影像、声音和数字文化到动画、三维与视觉效果。媒体艺术更关注表达与观念，制作型方向更强调具体流程和完成质量。',
    fit:'适合愿意观察与表达，并持续探索影像、声音、动画或空间媒介的人。',
    challenge:'需要兼顾个人表达与媒介完成度。实验艺术、动画和 VFX 的作品标准应分开准备。',
    evidence:['有明确主题的影像、声音、动画或媒体作品。','脚本／分镜／技术拆解与制作过程。','媒介选择的理由、个人职责和批判反思。'],
    pitfall:'把剪辑合集当作研究方向，或把视觉效果的复杂程度当作作品思想。',
    careers:'Media Artist、Motion Designer、Animator、VFX Artist、Creative Producer；对应岗位的技术训练不同。',
    countryNotes:{
      'United Kingdom':'检查课程是媒体艺术研究、电影实践、动画还是 VFX，按实际学习目标呈现作品。',
      Australia:'对制作型课程突出从概念到成片的流程、制作分工与可验证结果。',
      'Hong Kong':'MA/MFA 创意媒体与娱乐技术 MSc 的目标不同，应分别组织创作立场或技术证据。',
      Italy:'Brera、Roma、Venezia 等美院的新媒体路径可作比较；研究重点、意语能力和入学评估需逐校核对。',
    },
  },
  {
    cluster:'Creative Technology & Immersion', name:'创意技术、AI 与沉浸媒体', tag:'CREATIVE CODING / AI / XR / INSTALLATION',
    study:'用编程、传感器、生成系统、实时引擎与 XR 构建体验。AI 可以是工具或研究对象，作品仍需体现问题、系统和作者决策。',
    fit:'适合愿意在艺术、设计与技术之间反复试验，同时记录失败、调试和体验反馈的人。',
    challenge:'技术与观念双线投入较高。跨学科项目要证明体验实际运行，而不只展示视觉概念。',
    evidence:['可运行的交互装置、生成系统、实时或 XR 原型。','系统结构、数据／输入输出、代码或制作记录。','体验测试、失败迭代，以及 AI／素材来源与个人贡献说明。'],
    pitfall:'只交 AI 效果图或装置渲染，没有交互逻辑、实际原型与体验证据。',
    careers:'Creative Technologist、Immersive Designer、XR Designer、Interactive Developer；职业路径由实际技术与作品决定。',
    countryNotes:{
      'United Kingdom':'根据课程更偏艺术研究、创意计算还是体验设计，平衡研究立场与技术实现。',
      Australia:'对照课程的动画、游戏与交互内容，检查是否真正包含你希望发展的 XR、装置或计算方向。',
      'Hong Kong':'对媒体艺术与多媒体娱乐课程，分别强调作者立场或技术实现；跨学科背景要落到具体项目。',
      Italy:'可对照 NABA Creative Media Production、RUFA Multimedia Design & Creative AI 和美院数字艺术路径，重点辨别语言与学历类型。',
    },
  },
];

export function getProgrammeApplicationAdvice(item) {
  const country = countryGuides[item.country];
  const route = country?.routes[item.level];
  if (!country || !route) return null;
  const direction = directionGuides.find((guide) => guide.cluster === item.cluster);
  let language = route.language;
  if (item.country === 'Italy' && item.language) {
    if (/English/i.test(item.language) && !/Italian/i.test(item.language)) {
      language = item.language === 'English'
        ? '该课程标注英语授课；按本课程的英语证明和入学评估准备，不将意授美院的语言要求直接套用。'
        : route.language;
    } else if (/English/i.test(item.language) && /Italian/i.test(item.language)) {
      language = '该课程列有意大利语／英语路径；先确认所申请的教学班，再按该班次要求准备语言证明。';
    }
  }
  const specialisingAward = item.country === 'Italy' && /academic master|master universitario|specialising postgraduate/i.test(item.qualification || '');
  return {
    country, route, direction, language,
    qualificationNote:specialisingAward
      ? '本课程为专业进修型 Master。不要将其自动等同于两年制 Laurea Magistrale 或 Diploma Accademico di II livello；后续升学与学历用途需按正式资格核对。'
      : '',
    portfolioNote:item.portfolio === 'No Portfolio'
      ? '目录将此课程标为 No Portfolio。下方方向建议用于能力准备，不代表本课程要求提交作品集；具体考试与材料以课程官网为准。'
      : '下方作品建议用于准备方向，不是本课程的官方提交清单；以课程官网的数量、格式和评审要求为准。',
  };
}
