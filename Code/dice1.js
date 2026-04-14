// ─── DADO A 6 FACCE ───────────────────────────────────────────────────────────
(function () {
  const history = [];

  function rollD6() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function roll() {
    const face = document.getElementById('d6-face');
    const resultVal = document.getElementById('d6-result');
    const resultDetail = document.getElementById('d6-detail');
    const btn = document.getElementById('d6-btn');

    btn.disabled = true;
    face.classList.add('rolling');
    face.textContent = '?';
    resultVal.textContent = '–';

    setTimeout(() => {
      const result = rollD6();
      face.textContent = result;
      face.classList.remove('rolling');
      resultVal.textContent = result;

      if (result === 6) {
        resultDetail.textContent = '✦ Risultato Massimo! ✦';
        resultVal.classList.add('crit');
      } else if (result === 1) {
        resultDetail.textContent = '💀 Sfortuna nera!';
        resultVal.classList.remove('crit');
      } else {
        resultDetail.textContent = numToWords(result);
        resultVal.classList.remove('crit');
      }

      addHistory(result);
      btn.disabled = false;
    }, 650);
  }

  function numToWords(n) {
    const w = ['', 'Uno', 'Due', 'Tre', 'Quattro', 'Cinque', 'Sei'];
    return w[n] || '';
  }

  function addHistory(val) {
    history.unshift(val);
    if (history.length > 12) history.pop();
    const list = document.getElementById('d6-history');
    list.innerHTML = history.map((v, i) =>
      `<span class="history-item" style="animation-delay:${i * 0.04}s">${v}</span>`
    ).join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('d6-btn');
    if (btn) btn.addEventListener('click', roll);
  });
})();
