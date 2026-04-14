// ─── DADO A 20 FACCE ─────────────────────────────────────────────────────────
(function () {
  const history = [];

  function rollD20() {
    return Math.floor(Math.random() * 20) + 1;
  }

  function getOutcomeLabel(n) {
    if (n === 20) return '⚡ COLPO CRITICO! ⚡';
    if (n === 1)  return '💀 FALLIMENTO CRITICO!';
    if (n >= 17)  return '✦ Successo Eccellente';
    if (n >= 11)  return 'Successo';
    if (n >= 6)   return 'Fallimento';
    return '☠ Fallimento Grave';
  }

  function roll() {
    const face   = document.getElementById('d20-face');
    const result = document.getElementById('d20-result');
    const detail = document.getElementById('d20-detail');
    const btn    = document.getElementById('d20-btn');

    btn.disabled = true;
    face.classList.add('rolling');
    face.textContent = '?';
    result.textContent = '–';
    detail.textContent = '';

    // Flickering numbers during animation
    let flicker = 0;
    const interval = setInterval(() => {
      face.textContent = Math.floor(Math.random() * 20) + 1;
      flicker++;
      if (flicker > 8) clearInterval(interval);
    }, 60);

    setTimeout(() => {
      clearInterval(interval);
      const r = rollD20();
      face.textContent = r;
      face.classList.remove('rolling');
      result.textContent = r;
      detail.textContent = getOutcomeLabel(r);

      if (r === 20 || r === 1) {
        result.classList.add('crit');
      } else {
        result.classList.remove('crit');
      }

      addHistory(r);
      btn.disabled = false;
    }, 700);
  }

  function addHistory(val) {
    history.unshift(val);
    if (history.length > 12) history.pop();
    const list = document.getElementById('d20-history');
    list.innerHTML = history.map((v, i) => {
      const cls = v === 20 ? ' style="color:var(--gold-bright);border-color:var(--border-gold-light)"'
                : v === 1  ? ' style="color:#e74c3c"' : '';
      return `<span class="history-item"${cls}>${v}</span>`;
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('d20-btn');
    if (btn) btn.addEventListener('click', roll);
  });
})();
