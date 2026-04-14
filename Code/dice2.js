// ─── DUE DADI A 6 FACCE + SOMMA ──────────────────────────────────────────────
(function () {
  const history = [];

  function rollD6() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function roll() {
    const face1 = document.getElementById('d6x2-face1');
    const face2 = document.getElementById('d6x2-face2');
    const sumVal = document.getElementById('d6x2-sum');
    const detail = document.getElementById('d6x2-detail');
    const btn    = document.getElementById('d6x2-btn');

    btn.disabled = true;
    [face1, face2].forEach(f => { f.classList.add('rolling'); f.textContent = '?'; });
    sumVal.textContent = '–';
    detail.textContent = '';

    // Stagger reveal
    setTimeout(() => {
      const r1 = rollD6();
      const r2 = rollD6();
      const sum = r1 + r2;

      face1.textContent = r1;
      face1.classList.remove('rolling');

      setTimeout(() => {
        face2.textContent = r2;
        face2.classList.remove('rolling');
        sumVal.textContent = sum;

        if (sum === 12) {
          detail.textContent = '✦ Doppio Sei — Fortuna Leggendaria! ✦';
          sumVal.classList.add('crit');
        } else if (sum === 2) {
          detail.textContent = '💀 Doppio Uno — Doppia Sfortuna!';
          sumVal.classList.remove('crit');
        } else {
          detail.textContent = `${r1} + ${r2} = ${sum}`;
          sumVal.classList.remove('crit');
        }

        addHistory(r1, r2, sum);
        btn.disabled = false;
      }, 200);
    }, 650);
  }

  function addHistory(r1, r2, sum) {
    history.unshift({ r1, r2, sum });
    if (history.length > 8) history.pop();
    const list = document.getElementById('d6x2-history');
    list.innerHTML = history.map((e, i) =>
      `<span class="history-item" style="animation-delay:${i * 0.04}s">${e.r1}+${e.r2}=${e.sum}</span>`
    ).join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('d6x2-btn');
    if (btn) btn.addEventListener('click', roll);
  });
})();
