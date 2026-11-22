/* Chemistry Chapter 3 — shared interactive helpers (flashcards, cloze, quiz). No external deps. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var bn = function (n) { return String(n).replace(/\d/g, function (d) { return '০১২৩৪৫৬৭৮৯'[d]; }); };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  window.CHEM = { $: $, $$: $$, bn: bn, esc: esc, shuffle: shuffle };

  /* ---------- Flashcards (with "know / review again" loop) ---------- */
  function initDeck(root) {
    var data = JSON.parse($('.deck-data', root).textContent);
    var queue = shuffle(data.map(function (_, i) { return i; }));
    var known = 0, total = data.length, cur = null;
    var card = $('.card3d', root), front = $('.front', root), back = $('.back', root);
    var bar = $('.deck-bar > i', root), count = $('.deck-count', root);
    function next() {
      card.classList.remove('flipped');
      if (!queue.length) {
        front.textContent = '🎉 সব কার্ড শেষ! আবার শুরু করতে "রিসেট" চাপো।';
        back.textContent = '';
        cur = null; bar.style.width = '100%';
        count.textContent = 'মনে আছে: ' + bn(known) + '/' + bn(total);
        return;
      }
      cur = queue.shift();
      front.textContent = data[cur][0];
      back.textContent = data[cur][1];
      bar.style.width = (known / total * 100) + '%';
      count.textContent = 'মনে আছে: ' + bn(known) + '/' + bn(total) + ' · বাকি: ' + bn(queue.length + 1);
    }
    card.addEventListener('click', function () { if (cur !== null) card.classList.toggle('flipped'); });
    card.addEventListener('keydown', function (e) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); card.click(); } });
    var okBtn = $('.ok', root);
    if (okBtn) okBtn.addEventListener('click', function () { if (cur === null) return; known++; next(); });
    var noBtn = $('.no', root);
    if (noBtn) noBtn.addEventListener('click', function () { if (cur === null) return; queue.splice(Math.min(3, queue.length), 0, cur); next(); });
    var resetBtn = $('.reset', root);
    if (resetBtn) resetBtn.addEventListener('click', function () { queue = shuffle(data.map(function (_, i) { return i; })); known = 0; next(); });
    next();
  }

  /* ---------- Cloze (tap to reveal) ---------- */
  function initCloze(root) {
    $$('.blank', root).forEach(function (b) { b.addEventListener('click', function () { b.classList.toggle('show'); }); });
    var all = $('.cloze-all', root), shown = false;
    if (all) all.addEventListener('click', function () { shown = !shown; $$('.blank', root).forEach(function (b) { b.classList.toggle('show', shown); }); all.textContent = shown ? 'সব লুকাও' : 'সব উত্তর দেখাও'; });
  }

  /* ---------- MCQ quiz ---------- */
  function initQuiz(root) {
    var data = JSON.parse($('.quiz-data', root).textContent);
    var box = $('.quiz-body', root), score = $('.score', root);
    var done = 0, right = 0, letters = ['ক', 'খ', 'গ', 'ঘ'];
    box.innerHTML = '';
    data.forEach(function (d, qi) {
      var q = document.createElement('div'); q.className = 'q';
      q.innerHTML = '<p class="q-stem">' + bn(qi + 1) + '. ' + d.q + '</p><div class="opts"></div><div class="q-exp">✅ <b>' + esc(d.o[d.a]) + '</b> — ' + d.e + '</div>';
      var opts = $('.opts', q);
      d.o.forEach(function (t, oi) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'opt'; b.innerHTML = letters[oi] + '. ' + t;
        b.addEventListener('click', function () {
          if (q.classList.contains('done')) return;
          q.classList.add('done'); done++;
          if (oi === d.a) { b.classList.add('right'); right++; } else { b.classList.add('wrong'); $$('.opt', q)[d.a].classList.add('right'); }
          score.textContent = 'স্কোর: ' + bn(right) + '/' + bn(done) + ' (মোট ' + bn(data.length) + 'টি)';
        });
        opts.appendChild(b);
      });
      box.appendChild(q);
    });
    score.textContent = 'স্কোর: ০/০ (মোট ' + bn(data.length) + 'টি)';
    var rs = $('.quiz-reset', root);
    if (rs) rs.addEventListener('click', function () { initQuiz(root); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    $$('.deck').forEach(initDeck);
    $$('.cloze').forEach(initCloze);
    $$('.quiz').forEach(initQuiz);
  });
})();
