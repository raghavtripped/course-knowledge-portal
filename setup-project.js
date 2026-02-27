const fs=require('fs'),p=require('path');
const W=(f,c)=>{fs.mkdirSync(p.dirname(f),{recursive:true});fs.writeFileSync(f,typeof c==='string'?c:JSON.stringify(c,null,2))};
const B=p.join(__dirname,'src');

// ── Faculty Data ──
const faculty=Array.from({length:15},(_,i)=>{
const names=["Dr. Ananya Sharma","Dr. Rajesh Krishnan","Prof. Meera Iyer","Dr. Siddharth Patel","Prof. Kavita Deshmukh","Dr. Arjun Nair","Prof. Priya Venkatesh","Dr. Vikram Malhotra","Prof. Sunita Agarwal","Dr. Rohan Chatterjee","Prof. Deepa Ramanathan","Dr. Amit Saxena","Prof. Lakshmi Subramanian","Dr. Nikhil Joshi","Prof. Rekha Menon"];
const depts=["Finance & Accounting","Economics","Marketing","Operations Management","Organizational Behavior","Information Systems","Strategy","Public Policy","Finance & Accounting","Economics","Marketing","Operations Management","Strategy","Information Systems","Organizational Behavior"];
const areas=[["Corporate Finance","Valuation","M&A"],["Microeconomic Theory","Game Theory","Behavioral Economics"],["Consumer Behavior","Brand Strategy","Digital Marketing"],["Supply Chain","Lean Manufacturing","Process Optimization"],["Leadership","Team Dynamics","Organizational Culture"],["Machine Learning","Data Analytics","Business Intelligence"],["Competitive Strategy","Innovation","Blue Ocean Strategy"],["Governance","Regulation","Economic Policy"],["Investment Banking","Portfolio Theory","Risk Management"],["Macroeconomics","Development Economics","Econometrics"],["Market Research","Pricing Strategy","Retail Management"],["Quality Management","Six Sigma","Operations Research"],["Strategic Innovation","Corporate Governance","Business Ethics"],["AI/ML Applications","Cloud Computing","Digital Transformation"],["Change Management","Diversity & Inclusion","Talent Management"]];
const bios=["A distinguished scholar with over 20 years of experience in academia and industry consulting. Formerly with Goldman Sachs and McKinsey.","An acclaimed economist whose research has been published in top-tier journals including American Economic Review and Econometrica.","Award-winning marketing professor who has consulted for leading FMCG and technology companies across Asia and Europe.","Expert in lean operations with extensive consulting experience for automotive and manufacturing firms globally.","Renowned for pioneering research in organizational culture transformation in emerging market enterprises.","Leading researcher in machine learning applications for business, with patents in predictive analytics systems.","Former strategy consultant at BCG with expertise in competitive dynamics in digital platform markets.","Expert in public policy and governance, having advised multiple government bodies on economic regulation.","CFA charterholder and former portfolio manager with deep expertise in emerging market investments.","Development economist whose work on financial inclusion has influenced policy in South and Southeast Asia.","Pioneer in digital marketing analytics with over 50 publications and multiple industry partnerships.","Operations research specialist with expertise applying mathematical optimization to real-world supply chains.","Award-winning author on strategic innovation, frequently featured in Harvard Business Review.","Former CTO at a Fortune 500 tech company, now researching digital transformation in traditional enterprises.","Expert in organizational psychology with focus on building inclusive and high-performing teams."];
return{id:`f${i+1}`,name:names[i],slug:names[i].toLowerCase().replace(/[^a-z ]/g,'').replace(/ /g,'-'),department:depts[i],researchAreas:areas[i],bio:bios[i],
coursesTeught:[],
teachingPhilosophy:["I believe in connecting theory with practice through real-world case studies and live projects.","My teaching approach emphasizes critical thinking and rigorous quantitative analysis.","I use experiential learning methods including simulations, role-plays, and industry collaborations.","Learning happens best when students engage with real problems — I bring the industry into the classroom.","I focus on developing both analytical skills and emotional intelligence in future leaders."][i%5],
publications:[`"${["Impact of Digital Disruption on Emerging Markets","Game Theory Applications in Modern Business","The Future of Consumer Engagement","Lean Thinking in Service Industries","Building Resilient Organizations"][i%5]}," Journal of ${depts[i]}, 2024`,`"${["Valuation in Uncertain Times","Behavioral Nudges in Policy","Sustainable Marketing Practices","Industry 4.0 and Smart Manufacturing","Cross-Cultural Leadership"][i%5]}," Academy of Management Review, 2023`],
officeHours:`${["Monday","Tuesday","Wednesday","Thursday","Friday"][i%5]} & ${["Wednesday","Thursday","Friday","Monday","Tuesday"][i%5]}, ${9+i%3}:00 AM – ${11+i%3}:00 AM`,
email:`${names[i].split(' ').pop().toLowerCase()}@institution.edu`}});

// assign courses to faculty
const coursesList=[
{id:"financial-accounting",title:"Financial Accounting",code:"FA 601",credits:3,slug:"financial-accounting",instructorId:"f1",type:"Quantitative",year:"2024-25",
description:"A comprehensive course covering the fundamentals of financial reporting, analysis of financial statements, revenue recognition, and accounting for assets, liabilities, and equity. Students learn to interpret and prepare financial statements following IFRS and GAAP standards.",
prerequisites:["None"],learningObjectives:["Understand double-entry bookkeeping and the accounting cycle","Prepare and analyze income statements, balance sheets, and cash flow statements","Apply IFRS/GAAP standards to complex transactions","Evaluate a firm's financial health using ratio analysis"],
gradingBreakdown:[{component:"Midterm Exam",weight:25},{component:"Final Exam",weight:35},{component:"Assignments",weight:20},{component:"Class Participation",weight:10},{component:"Group Project",weight:10}],
skillIds:["financial-analysis","accounting","reporting"],programIds:["pgp","ipm","epgp"]},

{id:"corporate-finance",title:"Corporate Finance",code:"CF 602",credits:3,slug:"corporate-finance",instructorId:"f1",type:"Quantitative",year:"2024-25",
description:"Explores capital budgeting decisions, cost of capital estimation, capital structure theories, dividend policy, and corporate valuation. Includes real-world case studies on M&A, LBOs, and IPOs.",
prerequisites:["Financial Accounting"],learningObjectives:["Apply NPV, IRR, and other capital budgeting techniques","Estimate WACC and understand capital structure trade-offs","Analyze dividend policy decisions","Perform company valuation using DCF and multiples"],
gradingBreakdown:[{component:"Midterm Exam",weight:25},{component:"Final Exam",weight:30},{component:"Case Studies",weight:25},{component:"Class Participation",weight:10},{component:"Individual Assignment",weight:10}],
skillIds:["financial-analysis","valuation","decision-making"],programIds:["pgp","epgp","fpm"]},

{id:"micro-econ",title:"Microeconomics",code:"EC 501",credits:3,slug:"microeconomics",instructorId:"f2",type:"Quantitative",year:"2024-25",
description:"Covers consumer theory, producer theory, market structures, game theory, and welfare economics. Emphasizes application of microeconomic principles to real-world business and policy decisions.",
prerequisites:["None"],learningObjectives:["Analyze consumer and producer behavior using utility and production functions","Understand pricing under different market structures","Apply game theory to strategic business decisions","Evaluate market failures and policy interventions"],
gradingBreakdown:[{component:"Midterm Exam",weight:30},{component:"Final Exam",weight:35},{component:"Problem Sets",weight:20},{component:"Class Participation",weight:15}],
skillIds:["economics","quantitative-analysis","critical-thinking"],programIds:["pgp","ipm","fpm"]},

{id:"macro-econ",title:"Macroeconomics",code:"EC 502",credits:3,slug:"macroeconomics",instructorId:"f10",type:"Quantitative",year:"2024-25",
description:"Study of aggregate economic phenomena including GDP, inflation, unemployment, monetary and fiscal policy. Analyzes business cycles and their impact on corporate strategy.",
prerequisites:["Microeconomics"],learningObjectives:["Understand national income accounting","Analyze monetary and fiscal policy tools","Evaluate trade policies and exchange rate dynamics","Assess macroeconomic implications for business planning"],
gradingBreakdown:[{component:"Midterm Exam",weight:25},{component:"Final Exam",weight:35},{component:"Term Paper",weight:25},{component:"Class Participation",weight:15}],
skillIds:["economics","quantitative-analysis","policy-analysis"],programIds:["ipm","fpm"]},

{id:"marketing-mgmt",title:"Marketing Management",code:"MK 601",credits:3,slug:"marketing-management",instructorId:"f3",type:"Qualitative",year:"2024-25",
description:"Comprehensive overview of marketing strategy including segmentation, targeting, positioning, the marketing mix, brand management, and customer relationship management. Features live industry projects.",
prerequisites:["None"],learningObjectives:["Develop STP strategies for diverse markets","Design integrated marketing communication plans","Analyze consumer behavior using qualitative and quantitative methods","Build and manage brand equity"],
gradingBreakdown:[{component:"Midterm Exam",weight:20},{component:"Final Exam",weight:25},{component:"Group Project",weight:30},{component:"Individual Case Analysis",weight:15},{component:"Class Participation",weight:10}],
skillIds:["marketing","strategy","communication"],programIds:["pgp","ipm","epgp"]},

{id:"ops-mgmt",title:"Operations Management",code:"OM 601",credits:3,slug:"operations-management",instructorId:"f4",type:"Quantitative",year:"2024-25",
description:"Covers process design, capacity planning, inventory management, quality control, lean manufacturing, and supply chain coordination. Uses simulations and industry case studies.",
prerequisites:["Business Statistics"],learningObjectives:["Design and analyze business processes","Apply inventory models and capacity planning techniques","Implement quality improvement methodologies","Optimize supply chain performance"],
gradingBreakdown:[{component:"Midterm Exam",weight:25},{component:"Final Exam",weight:30},{component:"Operations Simulation",weight:20},{component:"Case Studies",weight:15},{component:"Class Participation",weight:10}],
skillIds:["operations","quantitative-analysis","process-optimization"],programIds:["pgp","ipm","epgp"]},

{id:"strategy",title:"Strategic Management",code:"SM 701",credits:3,slug:"strategic-management",instructorId:"f7",type:"Qualitative",year:"2024-25",
description:"Examines frameworks for analyzing competitive advantage, industry dynamics, corporate strategy, diversification, and strategic alliances. Heavy use of case method pedagogy.",
prerequisites:["Marketing Management","Corporate Finance"],learningObjectives:["Apply Porter's Five Forces and VRIO frameworks","Analyze competitive dynamics and strategic positioning","Evaluate diversification, M&A, and alliance strategies","Develop comprehensive business strategy proposals"],
gradingBreakdown:[{component:"Midterm Exam",weight:20},{component:"Final Exam",weight:25},{component:"Strategy Simulation",weight:25},{component:"Case Write-ups",weight:20},{component:"Class Participation",weight:10}],
skillIds:["strategy","critical-thinking","leadership"],programIds:["pgp","epgp"]},

{id:"ml-business",title:"Machine Learning for Business",code:"IS 702",credits:3,slug:"machine-learning-for-business",instructorId:"f6",type:"Quantitative",year:"2024-25",
description:"Introduces supervised and unsupervised learning algorithms with a focus on business applications: demand forecasting, customer segmentation, fraud detection, and recommendation systems.",
prerequisites:["Business Statistics","Data Visualization"],learningObjectives:["Implement classification and regression models using Python","Apply clustering and dimensionality reduction techniques","Build recommendation engines and forecasting models","Evaluate model performance and communicate results to stakeholders"],
gradingBreakdown:[{component:"Midterm Exam",weight:20},{component:"Final Project",weight:35},{component:"Assignments",weight:25},{component:"Kaggle Competition",weight:10},{component:"Class Participation",weight:10}],
skillIds:["machine-learning","data-analytics","programming"],programIds:["pgp","epgp","fpm"]},

{id:"behavioral-econ",title:"Behavioral Economics",code:"EC 703",credits:3,slug:"behavioral-economics",instructorId:"f2",type:"Qualitative",year:"2024-25",
description:"Explores psychological foundations of economic decision-making. Topics include bounded rationality, prospect theory, nudge theory, and their applications in business and public policy.",
prerequisites:["Microeconomics"],learningObjectives:["Understand cognitive biases and heuristics in decision-making","Apply prospect theory to pricing and marketing","Design nudge-based interventions for policy and business","Critically evaluate rational choice models"],
gradingBreakdown:[{component:"Midterm Exam",weight:25},{component:"Final Exam",weight:30},{component:"Behavioral Experiments",weight:20},{component:"Research Paper",weight:15},{component:"Class Participation",weight:10}],
skillIds:["economics","critical-thinking","decision-making"],programIds:["pgp","fpm"]},

{id:"data-viz",title:"Data Visualization & Business Analytics",code:"IS 601",credits:3,slug:"data-visualization",instructorId:"f6",type:"Quantitative",year:"2024-25",
description:"Covers principles of effective data visualization, dashboard design, and storytelling with data. Hands-on work with Tableau, Python, and D3.js to create compelling analytical narratives.",
prerequisites:["Business Statistics"],learningObjectives:["Design effective visualizations for different data types","Build interactive dashboards using Tableau","Create custom visualizations with Python and D3.js","Communicate analytical insights through data storytelling"],
gradingBreakdown:[{component:"Midterm Project",weight:25},{component:"Final Dashboard Project",weight:35},{component:"Weekly Assignments",weight:25},{component:"Class Participation",weight:15}],
skillIds:["data-analytics","communication","programming"],programIds:["pgp","ipm","fpm"]},

{id:"corporate-gov",title:"Corporate Governance",code:"SM 704",credits:3,slug:"corporate-governance",instructorId:"f13",type:"Qualitative",year:"2024-25",
description:"Examines governance mechanisms, board structures, shareholder activism, executive compensation, and regulatory frameworks. Analyzes governance failures and best practices globally.",
prerequisites:["Corporate Finance"],learningObjectives:["Understand the principal-agent problem and governance mechanisms","Analyze board composition and effectiveness","Evaluate executive compensation structures","Assess governance practices across legal and cultural contexts"],
gradingBreakdown:[{component:"Midterm Exam",weight:25},{component:"Final Exam",weight:30},{component:"Governance Case Analysis",weight:25},{component:"Class Participation",weight:20}],
skillIds:["strategy","policy-analysis","leadership"],programIds:["pgp","epgp"]},

{id:"entrepreneurship",title:"Entrepreneurship & New Venture Creation",code:"SM 705",credits:3,slug:"entrepreneurship",instructorId:"f7",type:"Qualitative",year:"2024-25",
description:"Covers opportunity identification, business model design, venture financing, and startup scaling. Features guest lectures from successful founders and a live pitch competition.",
prerequisites:["None"],learningObjectives:["Identify and evaluate entrepreneurial opportunities","Design and test business models using lean methodology","Understand venture capital and startup financing","Develop and deliver compelling investor pitches"],
gradingBreakdown:[{component:"Business Plan",weight:35},{component:"Pitch Competition",weight:20},{component:"Case Studies",weight:20},{component:"Reflection Journal",weight:15},{component:"Class Participation",weight:10}],
skillIds:["leadership","strategy","communication"],programIds:["pgp","ipm","epgp"]},

{id:"ob-hrm",title:"Organizational Behavior & HRM",code:"OB 601",credits:3,slug:"organizational-behavior",instructorId:"f5",type:"Qualitative",year:"2024-25",
description:"Explores individual and group behavior in organizations, motivation theories, leadership styles, organizational design, and human resource management practices.",
prerequisites:["None"],learningObjectives:["Analyze individual motivation and group dynamics","Evaluate leadership theories and their practical applications","Design effective organizational structures","Understand HR processes: recruitment, performance management, and development"],
gradingBreakdown:[{component:"Midterm Exam",weight:25},{component:"Final Exam",weight:25},{component:"Group Project",weight:25},{component:"Individual Reflection",weight:15},{component:"Class Participation",weight:10}],
skillIds:["leadership","communication","critical-thinking"],programIds:["pgp","ipm"]},

{id:"business-stats",title:"Business Statistics",code:"QM 501",credits:3,slug:"business-statistics",instructorId:"f10",type:"Quantitative",year:"2024-25",
description:"Covers probability theory, descriptive and inferential statistics, hypothesis testing, regression analysis, and their applications in business decision-making.",
prerequisites:["None"],learningObjectives:["Apply probability distributions to business problems","Conduct hypothesis tests and interpret results","Build and evaluate regression models","Use statistical software for data analysis"],
gradingBreakdown:[{component:"Midterm Exam",weight:30},{component:"Final Exam",weight:35},{component:"Problem Sets",weight:20},{component:"Data Analysis Project",weight:15}],
skillIds:["quantitative-analysis","data-analytics","decision-making"],programIds:["pgp","ipm","fpm"]},

{id:"supply-chain",title:"Supply Chain Management",code:"OM 702",credits:3,slug:"supply-chain-management",instructorId:"f12",type:"Quantitative",year:"2024-25",
description:"Examines end-to-end supply chain design, procurement, logistics, distribution networks, and risk management. Includes the Beer Game simulation.",
prerequisites:["Operations Management"],learningObjectives:["Design efficient supply chain networks","Manage procurement and supplier relationships","Optimize logistics and distribution operations","Mitigate supply chain risks and disruptions"],
gradingBreakdown:[{component:"Midterm Exam",weight:25},{component:"Final Exam",weight:30},{component:"Beer Game Simulation",weight:20},{component:"Supply Chain Case Study",weight:15},{component:"Class Participation",weight:10}],
skillIds:["operations","quantitative-analysis","process-optimization"],programIds:["pgp"]},

{id:"investment-mgmt",title:"Investment Management",code:"FI 703",credits:3,slug:"investment-management",instructorId:"f9",type:"Quantitative",year:"2024-25",
description:"Covers portfolio theory, asset pricing models, equity and fixed-income valuation, derivatives, and portfolio construction. Includes a virtual trading simulation.",
prerequisites:["Corporate Finance"],learningObjectives:["Apply modern portfolio theory to asset allocation","Value equities using fundamental and technical analysis","Understand derivatives pricing and hedging strategies","Construct and manage diversified investment portfolios"],
gradingBreakdown:[{component:"Midterm Exam",weight:25},{component:"Final Exam",weight:30},{component:"Trading Simulation",weight:25},{component:"Investment Report",weight:10},{component:"Class Participation",weight:10}],
skillIds:["financial-analysis","valuation","quantitative-analysis"],programIds:["pgp"]},

{id:"digital-marketing",title:"Digital Marketing & Analytics",code:"MK 703",credits:3,slug:"digital-marketing",instructorId:"f11",type:"Qualitative",year:"2024-25",
description:"Covers SEO/SEM, social media marketing, content strategy, email marketing, and digital analytics. Students manage live campaigns for real clients.",
prerequisites:["Marketing Management"],learningObjectives:["Design comprehensive digital marketing strategies","Implement SEO, SEM, and social media campaigns","Analyze digital marketing performance using analytics tools","Optimize conversion funnels and customer journeys"],
gradingBreakdown:[{component:"Live Campaign Project",weight:35},{component:"Digital Audit Report",weight:20},{component:"Midterm Exam",weight:20},{component:"Final Exam",weight:15},{component:"Class Participation",weight:10}],
skillIds:["marketing","data-analytics","communication"],programIds:["pgp"]},

{id:"negotiation",title:"Negotiation & Conflict Resolution",code:"OB 702",credits:3,slug:"negotiation",instructorId:"f15",type:"Qualitative",year:"2024-25",
description:"Develops negotiation skills through theoretical frameworks, role-play exercises, and multi-party simulations. Covers distributive and integrative bargaining, cross-cultural negotiations, and dispute resolution.",
prerequisites:["Organizational Behavior & HRM"],learningObjectives:["Apply distributive and integrative bargaining techniques","Navigate multi-party and multi-issue negotiations","Manage cross-cultural negotiation dynamics","Design effective dispute resolution processes"],
gradingBreakdown:[{component:"Negotiation Simulations",weight:40},{component:"Reflection Papers",weight:25},{component:"Final Exam",weight:20},{component:"Class Participation",weight:15}],
skillIds:["communication","leadership","critical-thinking"],programIds:["pgp","epgp"]},

{id:"managerial-econ",title:"Managerial Economics",code:"EC 602",credits:3,slug:"managerial-economics",instructorId:"f2",type:"Quantitative",year:"2024-25",
description:"Application of economic theory and quantitative methods to business decision-making. Covers demand analysis, production and cost analysis, pricing strategies, and market structure analysis.",
prerequisites:["Microeconomics"],learningObjectives:["Analyze demand and forecast market trends","Optimize production and cost decisions","Design pricing strategies for different market structures","Make strategic decisions under uncertainty"],
gradingBreakdown:[{component:"Midterm Exam",weight:30},{component:"Final Exam",weight:30},{component:"Problem Sets",weight:20},{component:"Case Analysis",weight:10},{component:"Class Participation",weight:10}],
skillIds:["economics","quantitative-analysis","decision-making"],programIds:["pgp","fpm"]},

{id:"business-ethics",title:"Business Ethics & Sustainability",code:"SM 706",credits:3,slug:"business-ethics",instructorId:"f13",type:"Qualitative",year:"2024-25",
description:"Examines ethical dilemmas in business, corporate social responsibility, sustainability frameworks, and stakeholder management. Uses case studies of ethical crises and responsible business practices.",
prerequisites:["None"],learningObjectives:["Analyze ethical dilemmas using philosophical frameworks","Evaluate CSR and sustainability strategies","Assess stakeholder impact of business decisions","Develop ethical leadership competencies"],
gradingBreakdown:[{component:"Ethics Case Portfolio",weight:30},{component:"Final Exam",weight:25},{component:"Group Debate",weight:20},{component:"Sustainability Audit",weight:15},{component:"Class Participation",weight:10}],
skillIds:["leadership","critical-thinking","policy-analysis"],programIds:["pgp","epgp"]},

{id:"fintech",title:"FinTech & Digital Finance",code:"FI 705",credits:3,slug:"fintech",instructorId:"f14",type:"Quantitative",year:"2024-25",
description:"Explores blockchain, cryptocurrency, digital payments, peer-to-peer lending, robo-advisory, and regulatory technology. Examines how technology is transforming financial services.",
prerequisites:["Corporate Finance"],learningObjectives:["Understand blockchain architecture and applications","Analyze digital payment ecosystems","Evaluate fintech business models and valuation","Navigate regulatory challenges in digital finance"],
gradingBreakdown:[{component:"FinTech Venture Proposal",weight:30},{component:"Final Exam",weight:25},{component:"Technology Demo",weight:20},{component:"Regulatory Analysis",weight:15},{component:"Class Participation",weight:10}],
skillIds:["financial-analysis","programming","decision-making"],programIds:["pgp","epgp"]},

{id:"business-comm",title:"Business Communication",code:"OB 501",credits:2,slug:"business-communication",instructorId:"f15",type:"Qualitative",year:"2024-25",
description:"Develops written and oral communication skills for business contexts. Covers executive memos, presentations, report writing, and persuasive communication techniques.",
prerequisites:["None"],learningObjectives:["Write clear and compelling business documents","Deliver effective presentations to diverse audiences","Apply persuasion techniques in business contexts","Provide and receive constructive feedback"],
gradingBreakdown:[{component:"Presentations",weight:30},{component:"Written Assignments",weight:30},{component:"Group Communication Project",weight:20},{component:"Peer Feedback Quality",weight:10},{component:"Class Participation",weight:10}],
skillIds:["communication","leadership"],programIds:["pgp","ipm"]},

{id:"legal-aspects",title:"Legal Aspects of Business",code:"PP 601",credits:3,slug:"legal-aspects",instructorId:"f8",type:"Qualitative",year:"2024-25",
description:"Covers contract law, corporate law, intellectual property, labor law, competition law, and environmental regulations relevant to business managers.",
prerequisites:["None"],learningObjectives:["Understand contract formation and enforcement","Navigate corporate governance legal frameworks","Protect intellectual property rights","Ensure regulatory compliance in business operations"],
gradingBreakdown:[{component:"Midterm Exam",weight:25},{component:"Final Exam",weight:30},{component:"Legal Case Analysis",weight:25},{component:"Moot Court Exercise",weight:10},{component:"Class Participation",weight:10}],
skillIds:["policy-analysis","critical-thinking"],programIds:["pgp","ipm"]}
];

// Generate syllabus for each course
coursesList.forEach(c=>{
const weeks=Array.from({length:10},(_, w)=>{
const topics=[
["Introduction & Course Overview","Foundations & Key Concepts","Theoretical Frameworks","Analytical Methods","Applied Techniques","Case Analysis I","Advanced Topics I","Case Analysis II","Advanced Topics II","Review & Integration"],
["Fundamentals & Definitions","Historical Context","Core Models","Quantitative Tools","Strategic Applications","Industry Case Study","Emerging Trends","Cross-functional Integration","Contemporary Debates","Synthesis & Future Directions"]
];
return{
week:w+1,
topic:`${topics[c.type==='Quantitative'?0:1][w]}: ${c.title}`,
readings:[`Chapter ${w+1} — ${c.title} Textbook`,w<5?`Case: Harvard Business Publishing #${1000+parseInt(c.code.replace(/\D/g,''))+w}`:`Article: ${c.title} in Practice — Journal of ${c.skillIds[0]}`],
slidesLink:`/resources/${c.slug}/week-${w+1}-slides.pdf`,
assignmentLink:w%3===0?`/resources/${c.slug}/assignment-${Math.ceil((w+1)/3)}.pdf`:null,
videoLink:`/resources/${c.slug}/lecture-${w+1}.mp4`
}});
c.syllabus=weeks;

c.assignments=Array.from({length:3},(_,a)=>({
title:`${["Individual","Group","Final"][a]} Assignment ${a+1}: ${["Analytical Exercise","Case Study Analysis","Comprehensive Project"][a]}`,
dueDate:`2025-${String(2+a*2).padStart(2,'0')}-${String(15+a*5).padStart(2,'0')}`,
rubric:[{criterion:"Content Quality",weight:40},{criterion:"Analysis Depth",weight:25},{criterion:"Presentation",weight:20},{criterion:"References & Citations",weight:15}],
downloadLink:`/resources/${c.slug}/assignment-${a+1}.pdf`
}));

c.exams={
pastYears:[2020,2021,2022,2023,2024].map(y=>({
year:y,
midtermLink:`/resources/${c.slug}/midterm-${y}.pdf`,
finalLink:`/resources/${c.slug}/final-${y}.pdf`,
gradeDistribution:[
{grade:"A+",percentage:8+Math.round(Math.random()*5)},
{grade:"A",percentage:20+Math.round(Math.random()*8)},
{grade:"B+",percentage:25+Math.round(Math.random()*5)},
{grade:"B",percentage:20+Math.round(Math.random()*8)},
{grade:"C+",percentage:10+Math.round(Math.random()*5)},
{grade:"C & below",percentage:5+Math.round(Math.random()*5)}
]}))};

const insights=["This course exists because every business leader needs to understand "+c.title.toLowerCase()+" to make informed strategic decisions. The concepts taught here form the backbone of modern management practice.","The most common mistake students make is treating this as a memorization course. "+c.title+" requires deep conceptual understanding and the ability to apply frameworks to novel situations. Focus on understanding the 'why' behind each concept.","To excel, engage actively with case studies, form study groups, and relate every concept to real-world business scenarios. The best students are those who bring their own industry examples to class discussions.","Graduates with strong skills in "+c.title.toLowerCase()+" find opportunities in consulting, investment banking, product management, corporate strategy, and entrepreneurial ventures. This is one of the most versatile skill sets in management."];
c.instructorInsights={
whyExists:insights[0],commonMistakes:insights[1],howToExcel:insights[2],careerPathways:insights[3],skillsGained:c.skillIds
};
});

// Map course IDs to faculty
faculty.forEach(f=>{
f.coursesTeught=coursesList.filter(c=>c.instructorId===f.id).map(c=>({id:c.id,title:c.title,slug:c.slug}));
});

// ── Skills Data ──
const skills=[
{id:"financial-analysis",name:"Financial Analysis",category:"Finance",description:"Ability to analyze financial statements, perform valuation, and make investment decisions.",courseIds:["financial-accounting","corporate-finance","investment-mgmt","fintech"],programIds:["pgp","ipm","epgp"],relatedSkills:["valuation","accounting","quantitative-analysis"]},
{id:"valuation",name:"Valuation & Modeling",category:"Finance",description:"Expertise in company valuation using DCF, multiples, and advanced modeling techniques.",courseIds:["corporate-finance","investment-mgmt"],programIds:["pgp","epgp"],relatedSkills:["financial-analysis","quantitative-analysis"]},
{id:"accounting",name:"Accounting",category:"Finance",description:"Understanding of financial reporting standards, bookkeeping, and accounting principles.",courseIds:["financial-accounting"],programIds:["pgp","ipm"],relatedSkills:["financial-analysis","reporting"]},
{id:"reporting",name:"Financial Reporting",category:"Finance",description:"Skills in preparing and interpreting financial reports following GAAP/IFRS standards.",courseIds:["financial-accounting"],programIds:["pgp","ipm"],relatedSkills:["accounting","financial-analysis"]},
{id:"economics",name:"Economics",category:"Analytics",description:"Understanding of micro and macroeconomic principles and their business applications.",courseIds:["micro-econ","macro-econ","behavioral-econ","managerial-econ"],programIds:["pgp","ipm","fpm"],relatedSkills:["quantitative-analysis","policy-analysis","critical-thinking"]},
{id:"quantitative-analysis",name:"Quantitative Analysis",category:"Analytics",description:"Proficiency in statistical methods, mathematical modeling, and data-driven decision making.",courseIds:["business-stats","ops-mgmt","supply-chain","investment-mgmt","micro-econ","managerial-econ"],programIds:["pgp","ipm","fpm"],relatedSkills:["data-analytics","economics","decision-making"]},
{id:"data-analytics",name:"Data Analytics",category:"Technology",description:"Skills in data collection, processing, visualization, and deriving business insights.",courseIds:["data-viz","ml-business","digital-marketing","business-stats"],programIds:["pgp","ipm","fpm"],relatedSkills:["quantitative-analysis","programming","machine-learning"]},
{id:"machine-learning",name:"Machine Learning",category:"Technology",description:"Understanding of ML algorithms and their applications in business contexts.",courseIds:["ml-business"],programIds:["pgp","epgp","fpm"],relatedSkills:["data-analytics","programming","quantitative-analysis"]},
{id:"programming",name:"Programming & Tools",category:"Technology",description:"Proficiency in Python, R, SQL, and business intelligence tools.",courseIds:["data-viz","ml-business","fintech"],programIds:["pgp","fpm"],relatedSkills:["data-analytics","machine-learning"]},
{id:"marketing",name:"Marketing",category:"Business",description:"Expertise in market analysis, brand strategy, consumer behavior, and campaign management.",courseIds:["marketing-mgmt","digital-marketing"],programIds:["pgp","ipm","epgp"],relatedSkills:["communication","strategy","data-analytics"]},
{id:"strategy",name:"Strategic Thinking",category:"Business",description:"Ability to analyze competitive landscapes and formulate business strategies.",courseIds:["strategy","corporate-gov","entrepreneurship"],programIds:["pgp","epgp"],relatedSkills:["critical-thinking","leadership","decision-making"]},
{id:"operations",name:"Operations Management",category:"Business",description:"Skills in process optimization, supply chain management, and quality improvement.",courseIds:["ops-mgmt","supply-chain"],programIds:["pgp","ipm","epgp"],relatedSkills:["quantitative-analysis","process-optimization"]},
{id:"process-optimization",name:"Process Optimization",category:"Business",description:"Expertise in lean methodologies, Six Sigma, and continuous improvement.",courseIds:["ops-mgmt","supply-chain"],programIds:["pgp"],relatedSkills:["operations","quantitative-analysis"]},
{id:"leadership",name:"Leadership",category:"Management",description:"Competence in leading teams, driving change, and developing organizational vision.",courseIds:["ob-hrm","strategy","entrepreneurship","negotiation","business-ethics"],programIds:["pgp","ipm","epgp"],relatedSkills:["communication","critical-thinking","decision-making"]},
{id:"communication",name:"Communication",category:"Management",description:"Strong written and verbal communication skills for business contexts.",courseIds:["business-comm","marketing-mgmt","negotiation","data-viz","entrepreneurship"],programIds:["pgp","ipm"],relatedSkills:["leadership","marketing"]},
{id:"critical-thinking",name:"Critical Thinking",category:"Management",description:"Analytical reasoning, problem decomposition, and evidence-based decision making.",courseIds:["micro-econ","behavioral-econ","strategy","ob-hrm","legal-aspects","business-ethics","negotiation"],programIds:["pgp","ipm","fpm"],relatedSkills:["decision-making","economics","quantitative-analysis"]},
{id:"decision-making",name:"Decision Making",category:"Management",description:"Frameworks for making decisions under uncertainty and complexity.",courseIds:["corporate-finance","behavioral-econ","managerial-econ","business-stats","fintech"],programIds:["pgp","epgp","fpm"],relatedSkills:["critical-thinking","quantitative-analysis","financial-analysis"]},
{id:"policy-analysis",name:"Policy Analysis",category:"Management",description:"Understanding of regulatory frameworks, governance, and public policy implications.",courseIds:["macro-econ","corporate-gov","legal-aspects","business-ethics"],programIds:["pgp","ipm","fpm"],relatedSkills:["critical-thinking","economics"]}
];

// ── Analytics Data ──
const analytics={
mostViewedCourses:[
{courseId:"financial-accounting",title:"Financial Accounting",views:4520},
{courseId:"corporate-finance",title:"Corporate Finance",views:4180},
{courseId:"strategy",title:"Strategic Management",views:3890},
{courseId:"ml-business",title:"Machine Learning for Business",views:3650},
{courseId:"marketing-mgmt",title:"Marketing Management",views:3420},
{courseId:"data-viz",title:"Data Visualization",views:3180},
{courseId:"entrepreneurship",title:"Entrepreneurship",views:2950},
{courseId:"behavioral-econ",title:"Behavioral Economics",views:2710},
{courseId:"ops-mgmt",title:"Operations Management",views:2580},
{courseId:"fintech",title:"FinTech & Digital Finance",views:2340}
],
resourceDownloads:[
{month:"Sep 2024",downloads:1250},{month:"Oct 2024",downloads:2180},{month:"Nov 2024",downloads:3420},
{month:"Dec 2024",downloads:2890},{month:"Jan 2025",downloads:4150},{month:"Feb 2025",downloads:3780},
{month:"Mar 2025",downloads:4520},{month:"Apr 2025",downloads:3100},{month:"May 2025",downloads:1890},
{month:"Jun 2025",downloads:980},{month:"Jul 2025",downloads:750},{month:"Aug 2025",downloads:1580}
],
enrollmentHeatmap:[
{program:"PGP",skill:"Financial Analysis",count:285},{program:"PGP",skill:"Strategy",count:310},
{program:"PGP",skill:"Marketing",count:245},{program:"PGP",skill:"Data Analytics",count:265},
{program:"PGP",skill:"Leadership",count:195},{program:"PGP",skill:"Operations",count:178},
{program:"IPM",skill:"Financial Analysis",count:95},{program:"IPM",skill:"Strategy",count:68},
{program:"IPM",skill:"Marketing",count:110},{program:"IPM",skill:"Data Analytics",count:88},
{program:"IPM",skill:"Leadership",count:75},{program:"IPM",skill:"Operations",count:65},
{program:"EPGP",skill:"Financial Analysis",count:145},{program:"EPGP",skill:"Strategy",count:185},
{program:"EPGP",skill:"Marketing",count:95},{program:"EPGP",skill:"Data Analytics",count:125},
{program:"EPGP",skill:"Leadership",count:210},{program:"EPGP",skill:"Operations",count:110},
{program:"FPM",skill:"Financial Analysis",count:32},{program:"FPM",skill:"Strategy",count:28},
{program:"FPM",skill:"Marketing",count:15},{program:"FPM",skill:"Data Analytics",count:45},
{program:"FPM",skill:"Leadership",count:18},{program:"FPM",skill:"Operations",count:12}
],
stats:{totalCourses:156,totalFaculty:87,totalArchivedExams:520,totalLectureHours:12400}
};

W(p.join(B,'data/courses.json'),coursesList);
W(p.join(B,'data/faculty.json'),faculty);
W(p.join(B,'data/skills.json'),skills);
W(p.join(B,'data/analytics.json'),analytics);

console.log('All data files generated successfully!');
console.log(`Courses: ${coursesList.length}`);
console.log(`Faculty: ${faculty.length}`);
console.log(`Skills: ${skills.length}`);
