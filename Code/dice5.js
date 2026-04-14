// ─── SCELTA DADO STANDARD (D4/D6/D8/D12/D20) ─────────────────────────────────
(function () {
  const DICE = [4, 6, 8, 12, 20];
  const history = [];
  let selected = 6; // default

  function rollDie(s) {
    return Math.floor(Math.random() * s) + 1;
  }

  function selectDie(s) {
    selected = s;
    document.querySelectorAll('.dice-choice').forEach(el => {
      el.classList.toggle('selected', parseInt(el.dataset.sides) === s);
    });
    // Update label
    const lbl = document.getElementById('choice-die-label');
    if (lbl) lbl.textContent = `D${s}`;

    // Reset display
    const face = document.getElementById('choice-face');
    if (face) face.textContent = `D${s}`;
    const result = document.getElementById('choice-result');
    if (result) { result.textContent = '–'; result.classList.remove('crit'); }
    const detail = document.getElementById('choice-detail');
    if (detail) detail.textContent = `Dado a ${s} facce selezionato`;
  }

  function roll() {
    const face   = document.getElementById('choice-face');
    const result = document.getElementById('choice-result');
    const detail = document.getElementById('choice-detail');
    const btn    = document.getElementById('choice-btn');

    btn.disabled = true;
    face.classList.add('rolling');
    face.textContent = '?';
    result.textContent = '–';

    let flicker = 0;
    const interval = setInterval(() => {
      face.textContent = Math.floor(Math.random() * selected) + 1;
      flicker++;
      if (flicker > 10) clearInterval(interval);
    }, 55);

    setTimeout(() => {
      clearInterval(interval);
      const r = rollDie(selected);
      face.textContent = r;
      face.classList.remove('rolling');
      result.textContent = r;

      if (r === selected) {
        detail.textContent = `✦ Massimo su D${selected}! ✦`;
        result.classList.add('crit');
      } else if (r === 1) {
        detail.textContent = `💀 Minimo su D${selected}!`;
        result.classList.remove('crit');
      } else {
        detail.textContent = `Hai tirato ${r} su un D${selected}`;
        result.classList.remove('crit');
      }

      addHistory(r, selected);
      btn.disabled = false;
    }, 700);
  }

  function addHistory(val, sides) {
    history.unshift({ val, sides });
    if (history.length > 12) history.pop();
    const list = document.getElementById('choice-history');
    list.innerHTML = history.map((e, i) =>
      `<span class="history-item">D${e.sides}→${e.val}</span>`
    ).join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Build choice buttons
    const container = document.getElementById('choice-buttons');
    if (container) {
      DICE.forEach(s => {
        const btn = document.createElement('button');
        btn.className = 'dice-choice' + (s === selected ? ' selected' : '');
        btn.dataset.sides = s;
        btn.textContent = `D${s}`;
        btn.addEventListener('click', () => selectDie(s));
        container.appendChild(btn);
      });
    }

    const rollBtn = document.getElementById('choice-btn');
    if (rollBtn) rollBtn.addEventListener('click', roll);

    // Init display
    const face = document.getElementById('choice-face');
    if (face) face.textContent = `D${selected}`;
    const detail = document.getElementById('choice-detail');
    if (detail) detail.textContent = `Dado a ${selected} facce selezionato`;
  });
})();
