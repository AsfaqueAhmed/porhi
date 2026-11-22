/* Chemistry Chapter 11 — shared interactive helpers (flashcards, cloze, quiz). No external deps. */
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
    var dataEl = $('.deck-data', root);
    if (!dataEl) return;
    var data = JSON.parse(dataEl.textContent);
    var key = 'chem11-deck-' + (root.id || 'x');
    var queue = shuffle(data.map(function (_, i) { return i; }));
    var known = 0, total = data.length, cur = null;
    var card = $('.card3d', root), front = $('.front', root), back = $('.back', root);
    var bar = $('.deck-bar > i', root), count = $('.deck-count', root);
    function next() {
      if (!card) return;
      card.classList.remove('flipped');
      if (!queue.length) {
        front.textContent = '🎉 সব কার্ড শেষ! আবার শুরু করতে "রিসেট" চাপো।';
        back.textContent = '';
        cur = null;
        if (bar) bar.style.width = '100%';
        if (count) count.textContent = 'মনে আছে: ' + bn(known) + '/' + bn(total);
        return;
      }
      cur = queue.shift();
      front.innerHTML = data[cur][0];
      back.innerHTML = data[cur][1];
      if (bar) bar.style.width = (known / total * 100) + '%';
      if (count) count.textContent = 'মনে আছে: ' + bn(known) + '/' + bn(total) + ' · বাকি: ' + bn(queue.length + 1);
    }
    if (card) {
      card.addEventListener('click', function () { if (cur !== null) card.classList.toggle('flipped'); });
      card.addEventListener('keydown', function (e) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); card.click(); } });
    }
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
    $$('.blank', root).forEach(function (b) {
      b.addEventListener('click', function () { b.classList.toggle('show'); });
    });
    var all = $('.cloze-all', root), shown = false;
    if (all) {
      all.addEventListener('click', function () {
        shown = !shown;
        $$('.blank', root).forEach(function (b) { b.classList.toggle('show', shown); });
        all.textContent = shown ? 'সব লুকাও' : 'সব উত্তর দেখাও';
      });
    }
  }

  /* ---------- MCQ quiz ---------- */
  function initQuiz(root) {
    var dataEl = $('.quiz-data', root);
    if (!dataEl) return;
    var data = JSON.parse(dataEl.textContent);
    var box = $('.quiz-body', root), score = $('.score', root);
    if (!box) return;
    var done = 0, right = 0, letters = ['ক', 'খ', 'গ', 'ঘ'];
    box.innerHTML = '';
    data.forEach(function (d, qi) {
      var q = document.createElement('div');
      q.className = 'q';
      q.innerHTML = '<p class="q-stem">' + bn(qi + 1) + '. ' + d.q + '</p><div class="opts"></div><div class="q-exp">✅ <b>' + esc(d.o[d.a]) + '</b> — ' + d.e + '</div>';
      var opts = $('.opts', q);
      d.o.forEach(function (t, oi) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'opt';
        b.innerHTML = letters[oi] + '. ' + t;
        b.addEventListener('click', function () {
          if (q.classList.contains('answered')) return;
          q.classList.add('answered');
          done++;
          if (oi === d.a) {
            b.classList.add('correct');
            right++;
          } else {
            b.classList.add('wrong');
            opts.children[d.a].classList.add('correct');
          }
          if (score) score.textContent = 'স্কোর: ' + bn(right) + '/' + bn(data.length);
        });
        opts.appendChild(b);
      });
      box.appendChild(q);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    $$('.deck').forEach(initDeck);
    $$('.cloze').forEach(initCloze);
    $$('.quiz').forEach(initQuiz);
  });
})();
