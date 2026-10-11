(() => {
  const sections = document.querySelectorAll('.section, .practice-section, .join-section, .template-feature, .archive-group');
  if (!('IntersectionObserver' in window)) return;
  sections.forEach(section => section.classList.add('reveal'));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  sections.forEach(section => observer.observe(section));
})();
