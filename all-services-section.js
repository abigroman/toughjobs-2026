/* all-services-section.js — injects a shared "everything we do" services grid
   at the very bottom of every service page (just above the footer).
   Single source of truth: edit the SERVICES array below to update every page. */
(function () {
  "use strict";

  if (document.getElementById("all-services-section")) return;

  var SERVICES = [
    { n: "01", t: "Websites",            href: "websites.html",             d: "Fast, mobile-first sites you own — built to convert visitors into booked jobs." },
    { n: "02", t: "SEO",                 href: "seo.html",                  d: "Rank for the high-intent searches that fill your calendar, not vanity keywords." },
    { n: "03", t: "Local SEO",           href: "local-seo.html",            d: "Own the map pack in your zip code and beat the franchises in your backyard." },
    { n: "04", t: "Paid Ads",            href: "paid-ads.html",             d: "Google, Bing & Meta campaigns tuned weekly to respect your cost per lead." },
    { n: "05", t: "Social Media",        href: "social-media.html",         d: "Consistent, authentic content that builds community and keeps you top of mind." },
    { n: "06", t: "Branding",            href: "branding.html",             d: "Logo, palette, wraps, print — one look across every touchpoint you own." },
    { n: "07", t: "AI Automations",      href: "ai-automations.html",       d: "Let automations answer, book, and follow up while you're on the tools." },
    { n: "08", t: "Software",            href: "software.html",             d: "Get set up on the field-service platform that fits how your shop runs." },
    { n: "09", t: "Re-Marketing",        href: "database-reactivation.html", d: "Turn your old customer list into booked jobs with email & SMS campaigns." },
    { n: "10", t: "Reviews & Reputation", href: "reviews.html",              d: "Automated Google review requests that keep 5-star reviews coming in." },
    { n: "11", t: "Print & Collateral",   href: "print-collateral.html",       d: "Brochures, mailers, door hangers & signs — branded print that gets kept." },
    { n: "12", t: "Coaching",            href: "coaching.html",             d: "Hands-on guidance to run marketing like an owner, not a guessing game." },
    { n: "13", t: "LLC Filing",          href: "llc-filing.html",           d: "Business formation help — we file your LLC in Illinois or Iowa. Not a law firm." }
  ];

  // current page filename, e.g. "seo.html"
  var here = (location.pathname.split("/").pop() || "").toLowerCase();

  var css = ''
    + '#all-services-section{background:#F4F5F7;color:#0A0F1C;padding:clamp(72px,9vw,120px) 0;position:relative;overflow:hidden;'
    +   'background-image:radial-gradient(circle at 1px 1px,rgba(10,15,28,.22) 1.6px,transparent 1.8px);background-size:22px 22px}'
    + '#all-services-section .as-wrap{max-width:1240px;margin:0 auto;padding:0 22px;position:relative;z-index:2}'
    + '#all-services-section .as-head{max-width:760px;margin:0 0 clamp(36px,5vw,56px)}'
    + '#all-services-section .as-eyebrow{font-family:"Archivo",sans-serif;font-weight:800;text-transform:uppercase;letter-spacing:.16em;font-size:13px;color:#C8262A;margin:0 0 14px}'
    + '#all-services-section .as-h2{font-family:"Archivo Black","Archivo",sans-serif;font-weight:900;text-transform:uppercase;letter-spacing:-.01em;line-height:.94;font-size:clamp(34px,4.4vw,60px);margin:0 0 16px}'
    + '#all-services-section .as-h2 .r{color:#C8262A}'
    + '#all-services-section .as-sub{font-size:clamp(16px,1.4vw,18px);line-height:1.6;color:#3a4254;margin:0}'
    + '#all-services-section .as-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}'
    + '#all-services-section .as-card{position:relative;display:flex;flex-direction:column;gap:10px;background:#fff;border:1px solid #e3e5ea;'
    +   'padding:26px 26px 24px;text-decoration:none;color:#0A0F1C;overflow:hidden;transition:transform .16s ease,box-shadow .16s ease,border-color .16s ease}'
    + '#all-services-section .as-card:before{content:"";position:absolute;top:0;left:0;width:100%;height:4px;background:#C8262A;transform:scaleX(0);transform-origin:left;transition:transform .18s ease}'
    + '#all-services-section .as-card:hover{transform:translateY(-3px);box-shadow:0 18px 40px rgba(10,15,28,.14);border-color:#C8262A}'
    + '#all-services-section .as-card:hover:before{transform:scaleX(1)}'
    + '#all-services-section .as-card .as-n{font-family:"Archivo Black",sans-serif;font-size:26px;color:#C8262A;line-height:1}'
    + '#all-services-section .as-card .as-t{font-family:"Archivo",sans-serif;font-weight:800;text-transform:uppercase;letter-spacing:.03em;font-size:18px;margin:0}'
    + '#all-services-section .as-card .as-d{font-size:14px;line-height:1.55;color:#4a5262;margin:0}'
    + '#all-services-section .as-card .as-go{margin-top:auto;font-family:"Archivo",sans-serif;font-weight:800;text-transform:uppercase;letter-spacing:.06em;font-size:12px;color:#C8262A;opacity:0;transform:translateX(-6px);transition:opacity .16s ease,transform .16s ease}'
    + '#all-services-section .as-card:hover .as-go{opacity:1;transform:none}'
    + '#all-services-section .as-card.as-current{background:#0A0F1C;color:#fff;border-color:#0A0F1C;pointer-events:none}'
    + '#all-services-section .as-card.as-current:before{transform:scaleX(1)}'
    + '#all-services-section .as-card.as-current .as-t{color:#fff}'
    + '#all-services-section .as-card.as-current .as-d{color:rgba(255,255,255,.75)}'
    + '#all-services-section .as-card.as-current .as-here{margin-top:auto;font-family:"Archivo",sans-serif;font-weight:800;text-transform:uppercase;letter-spacing:.06em;font-size:12px;color:#C8262A}'
    + '@media(max-width:900px){#all-services-section .as-grid{grid-template-columns:repeat(2,1fr)}}'
    + '@media(max-width:560px){#all-services-section .as-grid{grid-template-columns:1fr}}';

  var style = document.createElement("style");
  style.id = "all-services-section-style";
  style.textContent = css;
  document.head.appendChild(style);

  var cards = SERVICES.map(function (s) {
    var current = s.href.toLowerCase() === here;
    if (current) {
      return '<div class="as-card as-current">'
        + '<div class="as-n">' + s.n + '</div>'
        + '<h3 class="as-t">' + s.t + '</h3>'
        + '<p class="as-d">' + s.d + '</p>'
        + '<div class="as-here">You are here</div>'
        + '</div>';
    }
    return '<a class="as-card" href="' + s.href + '">'
      + '<div class="as-n">' + s.n + '</div>'
      + '<h3 class="as-t">' + s.t + '</h3>'
      + '<p class="as-d">' + s.d + '</p>'
      + '<div class="as-go">Explore &rarr;</div>'
      + '</a>';
  }).join("");

  var section = document.createElement("section");
  section.id = "all-services-section";
  section.setAttribute("data-screen-label", "All Services");
  section.innerHTML = ''
    + '<div class="as-wrap">'
    + '  <div class="as-head">'
    + '    <p class="as-eyebrow">Everything we run</p>'
    + '    <h2 class="as-h2">Every cylinder we pull <span class="r">for the trades.</span></h2>'
    + '    <p class="as-sub">Most agencies sell one service and call it a day. Toughjobs runs the whole system — pick the lever you need next, or stack them all.</p>'
    + '  </div>'
    + '  <div class="as-grid">' + cards + '</div>'
    + '</div>';

  function inject() {
    var footer = document.querySelector("body > footer") || document.querySelector("footer");
    if (footer && footer.parentNode) {
      footer.parentNode.insertBefore(section, footer);
    } else {
      document.body.appendChild(section);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
