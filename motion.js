(() => {
  const canvas = document.querySelector('.motion-field');
  if (!canvas) return;
  const context = canvas.getContext('2d', { alpha: true });
  const motionToggle = document.querySelector('.motion-toggle');
  let motionEnabled = localStorage.getItem('site-motion') !== 'off';
  function updateMotionToggle() {
    if (!motionToggle) return;
    motionToggle.setAttribute('aria-pressed', String(motionEnabled));
    motionToggle.setAttribute('aria-label', motionEnabled ? '关闭背景动效' : '开启背景动效');
    motionToggle.querySelector('.motion-toggle-state').textContent = motionEnabled ? 'ON' : 'OFF';
  }
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(pointer: fine)');
  const pointer = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false };
  const formulas = [
    { text: 'sin x', fn: x => Math.sin(x), scale: 1 },
    { text: 'cos x', fn: x => Math.cos(x), scale: 1 },
    { text: 'x² − 1', fn: x => x * x - 1, scale: 8 },
    { text: 'x³ − 3x', fn: x => x * x * x - 3 * x, scale: 18 },
    { text: 'e⁻ˣ²', fn: x => Math.exp(-x * x), scale: 1 },
    { text: '1 / (1 + e⁻ˣ)', fn: x => 1 / (1 + Math.exp(-x)), scale: 1 },
    { text: 'ln(1 + x²)', fn: x => Math.log1p(x * x), scale: 2.4 },
    { text: 'sin x / x', fn: x => Math.abs(x) < .001 ? 1 : Math.sin(x) / x, scale: 1 },
    { text: 'e⁻⁰·³ˣ cos 2x', fn: x => Math.exp(-.3 * x) * Math.cos(2 * x), scale: 2.5 },
    { text: '|sin x|', fn: x => Math.abs(Math.sin(x)), scale: 1 },
    { text: 'tanh x', fn: x => Math.tanh(x), scale: 1 },
    { text: 'x / (1 + x²)', fn: x => x / (1 + x * x), scale: .5 },
    { text: 'sin(x²)', fn: x => Math.sin(x * x), scale: 1 },
    { text: 'x sin x', fn: x => x * Math.sin(x), scale: 3 },
    { text: 'cos(x²)', fn: x => Math.cos(x * x), scale: 1 },
    { text: 'y = 0.6x + ε', fn: x => .6 * x, scale: 2 },
    { text: '1 / (1 + x²)', fn: x => 1 / (1 + x * x), scale: 1 },
    { text: 'x e⁻ˣ', fn: x => x * Math.exp(-x), scale: 2 },
    { text: 'sin 2x + cos x', fn: x => Math.sin(2 * x) + Math.cos(x), scale: 2 },
    { text: 'ln(1 + x)', fn: x => x <= -1 ? null : Math.log1p(x), scale: 2 },
    { text: '2 sin x + cos 2x', fn: x => 2 * Math.sin(x) + Math.cos(2 * x), scale: 3 },
    { text: '1 − cos x', fn: x => 1 - Math.cos(x), scale: 2 },
    { text: 'sin x · cos x', fn: x => Math.sin(x) * Math.cos(x), scale: 1 },
    { text: 'x² / (1 + x²)', fn: x => x * x / (1 + x * x), scale: 1 }
  ];
  const colors = ['rgba(58,81,78,', 'rgba(150,83,51,', 'rgba(78,75,66,'];
  let width = 0, height = 0, scale = 1, frame = 0, points = [], time = 0, formulaFontSize = 26;

  function layout() {
    const columns = Math.max(2, Math.min(6, Math.round(width / 460)));
    const rows = Math.ceil(points.length / columns);
    const maxLength = Math.max(...formulas.map(formula => formula.text.length));
    formulaFontSize = Math.max(10, Math.min(26, width / columns / (maxLength * 1.24)));
    points.forEach((point, index) => {
      const column = index % columns;
      const row = Math.floor(index / columns);
      point.x = (column + .16 + Math.random() * .68) * width / columns;
      point.y = (row + .16 + Math.random() * .68) * height / rows;
    });
  }

  function resize() {
    scale = Math.min(window.devicePixelRatio || 1, 1.5);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    context.setTransform(scale, 0, 0, scale, 0, 0);
    points = formulas.map((formula, index) => ({
      ...formula, index, x: 0, y: 0, phase: Math.random() * Math.PI * 2,
      speed: .12 + Math.random() * .12, growthDelay: Math.random() * 2, growthDuration: 10 + Math.random() * 4, tint: colors[index % colors.length]
    }));
    layout();
    if (!motionEnabled || reducedMotion.matches || !finePointer.matches) drawStill();
  }

  function pointerMove(event) {
    if (event.pointerType === 'touch' || reducedMotion.matches) return;
    pointer.targetX = event.clientX;
    pointer.targetY = event.clientY;
    pointer.active = true;
  }

  function drawGraph(point, x, y, strength, size) {
    if (strength <= .015) return;
    const plotWidth = 118, plotHeight = 76;
    context.save();
    context.translate(x, y);
    const graphScale = size * (1 + strength * .85);
    context.scale(graphScale, graphScale);
    context.fillStyle = `rgba(251,249,243,${.58 * strength})`;
    context.fillRect(-plotWidth / 2 - 8, -plotHeight / 2 - 15, plotWidth + 16, plotHeight + 38);
    context.strokeStyle = `rgba(98,126,129,${.16 * strength})`;
    context.lineWidth = 1;
    context.beginPath();
    for (let i = -2; i <= 2; i++) {
      const gx = i * plotWidth / 4;
      const gy = i * plotHeight / 4;
      context.moveTo(gx, -plotHeight / 2); context.lineTo(gx, plotHeight / 2);
      context.moveTo(-plotWidth / 2, gy); context.lineTo(plotWidth / 2, gy);
    }
    context.stroke();
    context.strokeStyle = `rgba(75,72,63,${.5 * strength})`;
    context.beginPath();
    context.moveTo(-plotWidth / 2, 0); context.lineTo(plotWidth / 2, 0);
    context.moveTo(0, -plotHeight / 2); context.lineTo(0, plotHeight / 2);
    context.stroke();
    context.strokeStyle = `rgba(182,94,54,${.88 * strength})`;
    context.lineWidth = 1.8;
    context.beginPath();
    let drawing = false, previous = null;
    for (let i = 0; i <= 72; i++) {
      const t = i / 72;
      const input = -3 + t * 6;
      const raw = point.fn(input);
      if (raw === null || !Number.isFinite(raw)) { drawing = false; previous = null; continue; }
      const normalized = Math.max(-1.15, Math.min(1.15, raw / point.scale));
      const px = -plotWidth / 2 + t * plotWidth;
      const py = -normalized * plotHeight * .38;
      if (!drawing || (previous && Math.abs(py - previous) > plotHeight * .35)) context.moveTo(px, py);
      else context.lineTo(px, py);
      drawing = true;
      previous = py;
    }
    context.stroke();
    context.fillStyle = `rgba(157,91,58,${.78 * strength})`;
    context.font = '9px "SFMono-Regular", Consolas, monospace';
    context.fillText(`f(x) = ${point.text}`, -plotWidth / 2, plotHeight / 2 + 15);
    context.restore();
  }

  function inflation(point, t) {
    const progress = Math.max(0, Math.min(1, (t - point.growthDelay) / point.growthDuration));
    return 1 + progress * progress * (3 - 2 * progress);
  }

  function paint(still = false) {
    context.clearRect(0, 0, width, height);
    if (!still && finePointer.matches) {
      pointer.x += (pointer.targetX - pointer.x) * .12;
      pointer.y += (pointer.targetY - pointer.y) * .12;
    }
    const hasPointer = pointer.active && pointer.x > -500;
    const t = still ? Math.max(time, 30) : time;
    const candidates = hasPointer
      ? points.map(point => ({ point, x: point.x + Math.sin(t * point.speed + point.phase) * 11,
        y: point.y + Math.cos(t * point.speed * .8 + point.phase) * 9,
        distance: Math.hypot(point.x - pointer.x, point.y - pointer.y) }))
        .map(item => ({ ...item, size: inflation(item.point, t), radius: 245 + (inflation(item.point, t) - 1) * 140 }))
        .filter(item => item.distance < item.radius).sort((a, b) => a.distance - b.distance).slice(0, 1)
      : [];
    const focusById = new Map(candidates.map(item => [item.point.index, item]));

    for (const point of points) {
      const active = focusById.get(point.index);
      const floatX = point.x + (still ? 0 : Math.sin(t * point.speed + point.phase) * 11);
      const floatY = point.y + (still ? 0 : Math.cos(t * point.speed * .8 + point.phase) * 9);
      const focus = active ? Math.max(0, Math.min(1, 1 - active.distance / active.radius)) : 0;
      const size = inflation(point, t);
      const drawX = active ? floatX + (pointer.x - floatX) * focus * .28 : floatX;
      const drawY = active ? floatY + (pointer.y - floatY) * focus * .28 : floatY;
      const expressionAlpha = .34 + focus * .54;
      context.save();
      context.translate(drawX, drawY);
      context.rotate(still ? 0 : Math.sin(t * point.speed + point.phase) * .025);
      context.scale(size, size);
      context.font = `500 ${formulaFontSize}px "SFMono-Regular", Consolas, monospace`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillStyle = `${point.tint}${expressionAlpha * (1 - focus * .9)})`;
      context.filter = `blur(${((1 - focus) * .22).toFixed(2)}px)`;
      if (point.index % 3 === 0) {
        const chars = Array.from(point.text);
        const widths = chars.map(char => context.measureText(char).width);
        const total = widths.reduce((sum, value) => sum + value, 0);
        let cursor = -total / 2;
        const bend = (4 + Math.sin(t * .7 + point.phase) * 2) * (size - 1);
        chars.forEach((char, index) => {
          const progress = total ? (cursor + widths[index] / 2 + total / 2) / total : 0;
          context.save();
          context.translate(cursor + widths[index] / 2, Math.sin(progress * Math.PI) * bend);
          context.rotate(Math.cos(progress * Math.PI) * bend * .003);
          context.fillText(char, 0, 0);
          context.restore();
          cursor += widths[index];
        });
      } else context.fillText(point.text, 0, 0);
      context.restore();
      if (active) drawGraph(point, drawX, drawY, focus, size);
    }

    if (hasPointer) {
      const pulse = still ? 0 : (Math.sin(t * 2.5) + 1) * .8;
      context.beginPath();
      context.arc(pointer.x, pointer.y, 8 + pulse, 0, Math.PI * 2);
      context.strokeStyle = 'rgba(182,94,54,.48)';
      context.lineWidth = 1;
      context.stroke();
      context.beginPath();
      context.arc(pointer.x, pointer.y, 2, 0, Math.PI * 2);
      context.fillStyle = 'rgba(182,94,54,.72)';
      context.fill();
    }
  }

  function drawStill() { paint(true); }
  function animate(timestamp) {
    time = timestamp * .001;
    paint(false);
    frame = requestAnimationFrame(animate);
  }
  function refreshMotion() {
    cancelAnimationFrame(frame);
    if (!motionEnabled || reducedMotion.matches || !finePointer.matches || document.hidden) {
      drawStill();
      return;
    }
    frame = requestAnimationFrame(animate);
  }

  motionToggle?.addEventListener('click', () => {
    motionEnabled = !motionEnabled;
    localStorage.setItem('site-motion', motionEnabled ? 'on' : 'off');
    if (!motionEnabled) pointer.active = false;
    updateMotionToggle();
    refreshMotion();
  });
  updateMotionToggle();
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('pointermove', pointerMove, { passive: true });
  document.addEventListener('visibilitychange', refreshMotion);
  reducedMotion.addEventListener?.('change', refreshMotion);
  finePointer.addEventListener?.('change', refreshMotion);
  resize();
  refreshMotion();
})();
