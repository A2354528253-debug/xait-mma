const heroReset=document.createElement('link');heroReset.rel='stylesheet';heroReset.href='hero-reset.css';document.head.appendChild(heroReset);
document.querySelectorAll('img.association-logo').forEach(image=>{image.src='assets/images/association-logo.png'});
const joinCreditStyle=document.createElement('link');joinCreditStyle.rel='stylesheet';joinCreditStyle.href='join-credit.css';document.head.appendChild(joinCreditStyle);
const footerCreditStyle=document.createElement('link');footerCreditStyle.rel='stylesheet';footerCreditStyle.href='footer-credit.css';document.head.appendChild(footerCreditStyle);
const modelingMotionStyle=document.createElement('link');modelingMotionStyle.rel='stylesheet';modelingMotionStyle.href='codex-motion.css';document.head.appendChild(modelingMotionStyle);
// 页面基础交互：仅处理锚点平滑滚动与内容区块淡入
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{const target=document.querySelector(link.getAttribute('href'));if(target){event.preventDefault();target.scrollIntoView({behavior:'smooth'})}}));
const revealItems=document.querySelectorAll('.reveal');
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.14});
revealItems.forEach(item=>observer.observe(item));
const footer=document.querySelector('footer');
if(footer&&!footer.querySelector('.footer-credit'))footer.insertAdjacentHTML('beforeend','<p class="footer-credit">槐安 编</p>');

const logoStage=document.querySelector('.logo-stage');
if(logoStage && !logoStage.querySelector('.modeling-motion')){
  const motion=document.createElement('div');
  motion.className='modeling-motion';
  motion.setAttribute('aria-hidden','true');
  motion.innerHTML='<svg viewBox="0 0 1200 700" preserveAspectRatio="none"><path class="modeling-path" d="M-80 390 C120 70 265 620 455 325 C615 78 770 105 845 325 C930 575 1050 495 1280 165"/><path class="modeling-path" d="M-60 345 C155 210 235 510 410 395 C605 265 715 95 875 245 C1020 380 1115 350 1270 270"/><path class="modeling-path" d="M-40 470 C175 370 300 560 470 475 C665 377 720 205 930 340 C1065 428 1150 420 1260 385"/><circle class="glow" cx="210" cy="310" r="6"/><circle class="glow" cx="640" cy="235" r="5"/><circle class="glow" cx="990" cy="350" r="7"/></svg>';
  logoStage.appendChild(motion);
}

// 指导老师单独插入到“下一步，和我们一起”之前，不参与首屏布局
const joinSection=document.querySelector('.join');if(joinSection){joinSection.querySelectorAll(':scope > .join-credit').forEach(item=>item.remove());const side=joinSection.querySelector('.join-side');if(side&&!side.querySelector('.join-credit'))side.insertAdjacentHTML('beforeend','<p class="join-credit">槐安 编</p>')}
if(joinSection){const email=joinSection.querySelector('.join-side a[href^="mailto:"]');if(email)email.innerHTML=email.textContent.replace(/[↗→↓]/g,'').trim()}
if(joinSection){
  const joinCreditStyle=document.createElement('link');joinCreditStyle.rel='stylesheet';joinCreditStyle.href='join-credit.css';document.head.appendChild(joinCreditStyle);
  joinSection.insertAdjacentHTML('beforeend','<p class="join-credit">槐安 编</p>');
  const facultyStyle=document.createElement('link');facultyStyle.rel='stylesheet';facultyStyle.href='faculty.css';document.head.appendChild(facultyStyle);
  const faculty=document.createElement('section');faculty.className='faculty section';faculty.id='faculty';
  faculty.innerHTML='<p class="mono">05 / FACULTY</p><div class="faculty-content"><h2>指导<br><em>老师</em></h2><div class="faculty-list"><article><div><h3>闫海霞</h3><p>副教授</p></div><div class="faculty-contact"><a href="tel:19991437640">19991437640</a><a href="mailto:93054774@qq.com">93054774@qq.com</a></div></article><article><div><h3>王小改</h3><p>讲师</p></div><div class="faculty-contact"><a href="tel:15353718070">15353718070</a><a href="mailto:617884262@qq.com">617884262@qq.com</a></div></article><article><div><h3>徐晴</h3><p>助教</p></div><div class="faculty-contact"><a href="tel:15091180981">15091180981</a><a href="mailto:953475997@qq.com">953475997@qq.com</a></div></article><article><div><h3>于瑶</h3><p>讲师</p></div><div class="faculty-contact"><a href="tel:15109276565">15109276565</a><a href="mailto:951813204@qq.com">951813204@qq.com</a></div></article><article><div><h3>秦梓璇</h3><p>助教</p></div><div class="faculty-contact"><a href="tel:15929357750">15929357750</a><a href="mailto:1098556882@qq.com">1098556882@qq.com</a></div></article><article><div><h3>樊璐</h3><p>助教</p></div><div class="faculty-contact"><a href="tel:17691126715">17691126715</a><a href="mailto:1526910857@qq.com">1526910857@qq.com</a></div></article></div></div>';
  joinSection.before(faculty);
}
