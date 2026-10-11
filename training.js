(() => {
  const years = [2025, 2024, 2023, 2022, 2021, 2020];
  const release = 'https://github.com/A2354528253-debug/xait-mma/releases/download/cumcm-problems';
  const files = {
    ncmc: { problems: Object.fromEntries(years.map(year => [year, `${release}/CUMCM${year}.zip`])) }
  };

  function yearCards(competition, kind) {
    return years.map(year => {
      const href = files[competition]?.[kind]?.[year];
      const label = kind === 'problems' ? '历年真题' : '优秀论文';
      const action = href
        ? `<a class="download-button" href="${href}" target="_blank" rel="noopener">下载 ${year} 年资料 <b>↓</b></a>`
        : '<span class="pending">待上传</span>';
      const description = href ? '公开资料，可直接下载' : '资料尚未上传，后续将按年份补充';
      return `<article class="year-card"><div class="resource-type">${year}<br><span>${kind === 'problems' ? '题目' : '论文'}</span></div><div class="resource-detail"><p class="eyebrow">${label} / ${year}</p><h3>${year} 年${label}</h3><p>${description}</p></div>${action}</article>`;
    }).join('');
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


