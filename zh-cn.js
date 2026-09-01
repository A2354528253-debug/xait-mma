// 默认中文界面：保留文件格式、赛事缩写与邮箱等不可翻译内容
const chineseText={
  'MODEL · THINK · SOLVE':'建模 · 思考 · 求解',
  'READY TO JOIN?':'准备加入了吗',
  'OPEN RESOURCE ARCHIVE':'公开资源库',
  'RESOURCES / OPEN ACCESS':'资源 / 公开访问',
  'WRITING / TEMPLATE':'论文写作 / 模板',
  'CURRENTLY AVAILABLE':'当前可用资料',
  'LATEST UPDATE':'最新动态',
  'SCROLL TO EXPLORE':'向下浏览',
  'XI\'AN INSTITUTE OF TECHNOLOGY · 2026':'西安工学院 · 2026',
  '05 / FACULTY':'05 / 指导老师',
  '01 / ABOUT':'01 / 协会介绍',
  '02 / WHAT WE DO':'02 / 协会活动',
  '03 / NOW':'03 / 近期动态',
  '04 / RESOURCES':'04 / 资源中心',
  '01 — WELCOME':'01 — 欢迎来到协会',
  'DOCX':'DOCX',
  'PROBLEM SET':'真题资料',
  'SELECTED PAPERS':'优秀论文',
  'INPUT':'输入',
  'MODEL':'模型',
  'SOLUTION':'解答'
};
function applyChineseText(root=document.body){
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  nodes.forEach(node=>{const source=node.nodeValue;const normalized=source.trim();if(chineseText[normalized])node.nodeValue=source.replace(normalized,chineseText[normalized])});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>applyChineseText());else applyChineseText();
