/* ============================================================
   米魂 KOMEDAMA - JavaScript
   script.js

   目次
   1. スマホメニュー開閉
   2. ページトップへ戻るボタン
   3. スクロールフェードインアニメーション
   ============================================================ */


/* ============================================================
   1. スマホメニュー開閉
   ハンバーガーボタンをクリックするとメニューが開く
   ============================================================ */

const hamburger  = document.getElementById('hamburger');
const mobileNav  = document.getElementById('mobileNav');
const mobileClose = document.getElementById('mobileClose');
let previousOverflow = '';
const backgroundElements = document.querySelectorAll('header, main, footer, #scrollTop');
const previousInert = new Map();

/* ハンバーガーボタンを押したらメニューを開く */
hamburger.addEventListener('click', function () {
  previousOverflow = document.body.style.overflow;
  mobileNav.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden'; /* 背景スクロールを止める */
  backgroundElements.forEach(function (element) {
    previousInert.set(element, element.inert);
    element.inert = true;
  });
  mobileClose.focus();
});

/* ✕ボタンを押したら閉じる */
mobileClose.addEventListener('click', function () { closeMobileNav(); });

/* メニューリンクをクリックしたら閉じる */
mobileNav.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    closeMobileNav();
    if (link.hash && link.pathname === window.location.pathname) {
      const target = document.getElementById(link.hash.slice(1));
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    }
  });
});

/* Escキーでも閉じられるように */
document.addEventListener('keydown', function (e) {
  if (!mobileNav.classList.contains('open')) return;
  if (e.key === 'Escape') {
    e.preventDefault();
    closeMobileNav();
  }
  if (e.key === 'Tab') {
    const controls = mobileNav.querySelectorAll('button, a[href]');
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

function closeMobileNav() {
  if (!mobileNav.classList.contains('open')) return;
  mobileNav.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = previousOverflow;
  backgroundElements.forEach(function (element) {
    element.inert = previousInert.get(element);
  });
  const focusTarget = hamburger.offsetParent ? hamburger : document.querySelector('header .logo');
  focusTarget.focus();
}

window.matchMedia('(min-width: 641px)').addEventListener('change', function (e) {
  if (e.matches) closeMobileNav();
});


/* ============================================================
   2. ページトップへ戻るボタン
   400px以上スクロールしたら右下に表示される
   ============================================================ */

const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', function () {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' });
});


/* ============================================================
   3. スクロールフェードインアニメーション
   画面内に入った要素に .visible を付与してCSSアニメーションを発火
   ============================================================ */

const fadeElements = document.querySelectorAll('.fade-in');

/* IntersectionObserver: 要素が画面の10%以上見えたらアニメーション開始 */
if ('IntersectionObserver' in window) {
const fadeObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target); /* 一度発火したら監視を止める（パフォーマンス向上）*/
    }
  });
}, {
  threshold: 0.1 /* 要素の10%が見えたらトリガー */
});

fadeElements.forEach(function (el) {
  el.classList.add('reveal-ready');
  fadeObserver.observe(el);
});
}
