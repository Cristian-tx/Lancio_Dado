// ─── N DADI CON S FACCE ───────────────────────────────────────────────────────
(function () {
  const history = [];

  function rollDice(n, s) {
    return Array.from({ length: n }, () => Math.floor(Math.random() * s) + 1);
  }

  function render(results, s) {
    const grid  = document.getElementById('multi-grid');
    const total = document.getElementById('multi-total');
    const breakdown = document.getElementById('multi-breakdown');
    const sum = results.reduce((a, b) => a + b, 0);
    const max = results.length * s;
    const min = results.length;

    grid.innerHTML = '';
    results.forEach((val, i) => {
      const div = document.createElement('div');
      div.className = 'mini-die rolling';
      div.textContent = val;
      div.style.animationDelay = `${i * 0.07}s`;
      // Highlight max/min
      if (val === s)   div.style.color = 'var(--gold-bright)';
      if (val === 1)   div.style.color = '#e74c3c';
      grid.appendChild(div);
    });

    total.textContent = sum;

    const pct = ((sum - min) / (max - min) * 100).toFixed(0);
    breakdown.textContent = `${results.join(' + ')} = ${sum}  ·  ${pct}% del massimo possibile (${max})`;

    addHistory(results, sum);
  }

  function roll() {
    const nInput = document.getElementById('multi-n');
    const sInput = document.getElementById('multi-s');
    const btn    = document.getElementById('multi-btn');

    let n = parseInt(nInput.value) || 2;
    let s = parseInt(sInput.value) || 6;
    n = Math.max(1, Math.min(20, n));
    s = Math.max(2, Math.min(100, s));
    nInput.value = n;
    sInput.value = s;

    btn.disabled = true;

    // Show ? placeholders
    const grid = document.getElementById('multi-grid');
    const total = document.getElementById('multi-total');
    grid.innerHTML = Array.from({ length: n }, () =>
      `<div class="mini-die rolling">?</div>`
    ).join('');
    total.textContent = '–';

    setTimeout(() => {
      const results = rollDice(n, s);
      render(results, s);
      btn.disabled = false;
    }, 700);
  }

  function addHistory(results, sum) {
    history.unshift({ results, sum });
    if (history.length > 6) history.pop();
    const list = document.getElementById('multi-history');
    list.innerHTML = history.map((e, i) =>
      `<span class="history-item">${e.sum} <em style="opacity:.6;font-size:.85em">[${e.results.join(',')}]</em></span>`
    ).join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('multi-btn');
    if (btn) btn.addEventListener('click', roll);

    // Allow enter key in inputs
    ['multi-n', 'multi-s'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('keydown', e => { if (e.key === 'Enter') roll(); });
    });
  });
})();
