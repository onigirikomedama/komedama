/* ============================================================
   米魂 KOMEDAMA - JavaScript
   script.js

   目次
   1. スマホメニュー開閉
   2. ページトップへ戻るボタン
   3. スクロールフェードインアニメーション
   4. お問い合わせフォーム（デモ送信）
   ============================================================ */


/* ============================================================
   1. スマホメニュー開閉
   ハンバーガーボタンをクリックするとメニューが開く
   ============================================================ */

const hamburger  = document.getElementById('hamburger');
const mobileNav  = document.getElementById('mobileNav');
const mobileClose = document.getElementById('mobileClose');

/* ハンバーガーボタンを押したらメニューを開く */
hamburger.addEventListener('click', function () {
  mobileNav.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden'; /* 背景スクロールを止める */
});

/* ✕ボタンを押したら閉じる */
mobileClose.addEventListener('click', closeMobileNav);

/* メニューリンクをクリックしたら閉じる */
mobileNav.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', closeMobileNav);
});

/* Escキーでも閉じられるように */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
    closeMobileNav();
  }
});

function closeMobileNav() {
  mobileNav.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = ''; /* スクロールを戻す */
}


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
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ============================================================
   3. スクロールフェードインアニメーション
   画面内に入った要素に .visible を付与してCSSアニメーションを発火
   ============================================================ */

const fadeElements = document.querySelectorAll('.fade-in');

/* IntersectionObserver: 要素が画面の10%以上見えたらアニメーション開始 */
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
  fadeObserver.observe(el);
});


/* ============================================================
   4. お問い合わせフォーム
   Googleフォームを埋め込み済みのため、JavaScript処理は不要です。
   ============================================================ */
