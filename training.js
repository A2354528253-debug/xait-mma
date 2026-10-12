(() => {
  const releaseBase = 'https://github.com/A2354528253-debug/xait-mma/releases/download';
  // 每个比赛、每个资料分类：年份 -> 压缩包地址
  const files = {
    ncmc: {
      problems: Object.fromEntries([2020, 2021, 2022, 2023, 2024, 2025].map(year => [year, `${releaseBase}/cumcm-problems/CUMCM${year}.zip`])),
      papers: Object.fromEntries([2020, 2021, 2022, 2023, 2024].map(year => [year, `${releaseBase}/cumcm-problems/${year}.zip`]))
    },
    mathcup: {
      problems: Object.fromEntries([2023, 2024, 2026].map(year => [year, `${releaseBase}/huashubei/HSB${year}.zip`])),
      papers: Object.fromEntries([2020, 2021, 2022, 2023].map(year => [year, `${releaseBase}/huashubei/HSB${year}papers.zip`]))
    }
  };

  function yearCards(competition, kind) {
    const label = kind === 'problems' ? '真题' : '优秀论文';
    const type = kind === 'problems' ? '题目' : '论文';
    const entries = Object.entries(files[competition]?.[kind] ?? {}).sort((a, b) => Number(b[0]) - Number(a[0]));
    if (!entries.length) {
      return `<article class="year-card"><div class="resource-type">——<br><span>${type}</span></div><div class="resource-detail"><p class="eyebrow">${label}</p><h3>资料整理中</h3><p>资料尚未上传，后续将按年份补充</p></div><span class="pending">待上传</span></article>`;
    }
    return entries.map(([year, href]) => `<article class="year-card"><div class="resource-type">${year}<br><span>${type}</span></div><div class="resource-detail"><p class="eyebrow">${label} / ${year}</p><h3>${year} 年${label}</h3><p>公开资料，可直接下载</p></div><a class="download-button" href="${href}" target="_blank" rel="noopener">下载 ${year} 年资料 <b>↓</b></a></article>`).join('');
  }

  document.querySelectorAll('.archive-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const group = button.closest('.archive-group');
      const content = group.querySelector('.archive-content');
      const open = group.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
      content.setAttribute('aria-hidden', String(!open));
      content.toggleAttribute('inert', !open);
      content.querySelectorAll('.sub-content').forEach(panel => panel.toggleAttribute('inert', !open || !panel.closest('.sub-group').classList.contains('open')));
    });
  });

  document.querySelectorAll('.sub-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const group = button.closest('.sub-group');
      const parent = group.closest('.archive-group');
      const content = group.querySelector('.sub-content');
      if (!content.dataset.loaded) {
        content.innerHTML = yearCards(parent.dataset.competition, group.dataset.kind);
        content.dataset.loaded = 'true';
      }
      const open = group.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
      content.setAttribute('aria-hidden', String(!open));
      content.toggleAttribute('inert', !open);
    });
  });
})();
