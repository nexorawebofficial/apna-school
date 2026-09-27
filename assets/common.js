/* Shared behaviour for every page: reads config.js, fills [data-bind] fields,
   hides anything whose data is missing, and renders the header and footer. */
(function () {
  'use strict';
  var C = window.SCHOOL_CONFIG || {};

  /* ---------- Config helpers ---------- */
  function get(path) {
    return path.split('.').reduce(function (o, k) { return o == null ? undefined : o[k]; }, C);
  }
  function has(v) {
    if (v == null || v === false) return false;
    if (typeof v === 'string') return v.trim() !== '';
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === 'object') return Object.keys(v).some(function (k) { return has(v[k]); });
    return true;
  }
  // "a|b" = any of, "a&b" = all of, "!a" = not
  function test(expr) {
    return expr.split('&').every(function (part) {
      return part.split('|').some(function (p) {
        p = p.trim();
        var neg = p.charAt(0) === '!';
        var r = has(get(neg ? p.slice(1) : p));
        return neg ? !r : r;
      });
    });
  }
  function formatDate(iso) {
    if (!has(iso)) return '';
    var d = new Date(iso + 'T00:00:00');
    if (isNaN(d)) return String(iso);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  }
  function safeUrl(v) {
    v = String(v || '').trim();
    if (/^(https:|mailto:|tel:)/i.test(v)) return v;
    if (/^[\w\-./#]+$/.test(v) && !/^\/\//.test(v)) return v; // relative file in this site
    return '';
  }
  function telHref(v) { return 'tel:' + String(v).replace(/[^\d+]/g, ''); }
  function addressComplete() {
    var a = C.school && C.school.address || {};
    return has(a.line1) && has(a.city) && has(a.state) && has(a.pin);
  }
  function addressLines() {
    var a = C.school && C.school.address || {};
    var lines = [];
    if (has(a.line1)) lines.push(a.line1);
    if (has(a.line2)) lines.push(a.line2);
    var cityLine = [a.city, a.state].filter(has).join(', ');
    if (has(a.pin)) cityLine = cityLine ? cityLine + ' – ' + a.pin : a.pin;
    if (cityLine) lines.push(cityLine);
    if (lines.length) lines.push('India');
    return lines;
  }

  /* ---------- Binding ---------- */
  function apply(root) {
    root = root || document;
    root.querySelectorAll('[data-bind]').forEach(function (el) {
      var v = get(el.dataset.bind);
      el.textContent = has(v) ? String(v) : '';
    });
    root.querySelectorAll('[data-bind-date]').forEach(function (el) {
      el.textContent = formatDate(get(el.dataset.bindDate));
    });
    root.querySelectorAll('[data-bind-href]').forEach(function (el) {
      var v = get(el.dataset.bindHref);
      if (!has(v)) return;
      var kind = el.dataset.hrefKind;
      var href = kind === 'tel' ? telHref(v) : kind === 'mailto' ? 'mailto:' + String(v).trim() : safeUrl(v);
      if (href) el.setAttribute('href', href); else el.hidden = true;
    });
    root.querySelectorAll('[data-bind-address]').forEach(function (el) {
      el.textContent = '';
      addressLines().forEach(function (line, i) {
        if (i) el.appendChild(document.createElement('br'));
        el.appendChild(document.createTextNode(line));
      });
    });
    root.querySelectorAll('[data-show-if]').forEach(function (el) {
      el.hidden = !test(el.dataset.showIf);
    });
  }

  /* ---------- Header ---------- */
  var CREST = '<svg viewBox="0 0 40 48" width="34" height="41" aria-hidden="true" focusable="false">' +
    '<path d="M3 46V19a17 17 0 0 1 34 0v27z" fill="#0B1F3A" stroke="#D89B25" stroke-width="1.5"/>' +
    '<path d="M8 46V20a12 12 0 0 1 24 0v26" fill="none" stroke="#D89B25" stroke-width=".75" opacity=".55"/>' +
    '<text x="20" y="37" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-size="15" font-weight="700" fill="#F8F4EC">AS</text></svg>';

  function renderHeader(el) {
    var home = el.dataset.home || '';
    var h = function (id) { return home + '#' + id; };
    el.innerHTML =
      '<div class="wrap flex h-[76px] items-center justify-between gap-4">' +
        '<a href="' + (home || '#top') + '" class="brand-link flex items-center gap-3">' + CREST +
          '<span class="flex flex-col gap-1"><span class="brand-name" data-bind="school.name"></span>' +
          '<span class="brand-sub">Nursery to Class XII</span></span></a>' +
        '<nav aria-label="Primary" class="hidden lg:block"><ul class="flex items-center gap-8">' +
          '<li><a class="nav-link" href="' + h('about') + '">About</a></li>' +
          '<li><a class="nav-link" href="' + h('academics') + '">Academics</a></li>' +
          '<li><a class="nav-link" href="' + h('campus') + '">Campus Life</a></li>' +
          '<li><a class="nav-link" href="' + h('admissions') + '">Admissions</a></li>' +
          '<li><a class="nav-link" href="' + h('contact') + '">Contact</a></li>' +
        '</ul></nav>' +
        '<div class="flex items-center gap-3">' +
          '<a href="' + h('enquiry') + '" class="btn btn-gold btn-sm" data-cta>Apply Now</a>' +
          '<button class="menu-btn lg:hidden" type="button" aria-expanded="false" aria-controls="mobileMenu" aria-label="Open menu">' +
            '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path class="menu-icon" d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" fill="none"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>' +
      '<div id="mobileMenu" class="mobile-menu lg:hidden" hidden>' +
        '<nav aria-label="Mobile" class="wrap pb-6">' +
          '<a class="m-link" href="' + h('about') + '">About</a>' +
          '<a class="m-link" href="' + h('academics') + '">Academics</a>' +
          '<a class="m-link" href="' + h('campus') + '">Campus Life</a>' +
          '<a class="m-link" href="' + h('admissions') + '">Admissions</a>' +
          '<a class="m-link" href="' + h('contact') + '">Contact</a>' +
          '<a class="btn btn-navy mt-6 w-full" href="' + h('enquiry') + '" data-cta>Book a Campus Visit</a>' +
        '</nav>' +
      '</div>';
    el.querySelector('.brand-link').setAttribute('aria-label', (C.school && C.school.name || 'School') + ', home');

    var solid = el.hasAttribute('data-solid');
    function onScroll() { el.classList.toggle('is-scrolled', solid || window.scrollY > 40); }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    var btn = el.querySelector('.menu-btn'), menu = el.querySelector('#mobileMenu'), icon = el.querySelector('.menu-icon');
    function setMenu(open) {
      menu.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      el.classList.toggle('menu-open', open);
      icon.setAttribute('d', open ? 'M4 4l12 12M16 4L4 16' : 'M2 5h16M2 10h16M2 15h16');
      if (open) menu.querySelector('a').focus();
    }
    btn.addEventListener('click', function () { setMenu(menu.hidden); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) { setMenu(false); btn.focus(); }
    });
    // Close when focus leaves the header (keyboard users tabbing past the menu)
    el.addEventListener('focusout', function (e) {
      if (!menu.hidden && e.relatedTarget && !el.contains(e.relatedTarget)) setMenu(false);
    });
    window.addEventListener('resize', function () { if (window.innerWidth >= 1024 && !menu.hidden) setMenu(false); });
  }

  /* ---------- Footer ---------- */
  var ICONS = {
    instagram: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true" focusable="false"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    youtube: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/></svg>',
    facebook: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H7.9v3h2.6V21z"/></svg>',
    linkedin: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M6.9 8.8H3.8V20h3.1zM5.3 4a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6zM20.2 13.6c0-3-1.6-5-4.3-5-1.4 0-2.4.8-2.8 1.5V8.8H10V20h3.1v-5.8c0-1.4.5-2.6 2-2.6s1.9 1.3 1.9 2.7V20h3.2z"/></svg>'
  };
  var SOCIAL_NAMES = { instagram: 'Instagram', youtube: 'YouTube', facebook: 'Facebook', linkedin: 'LinkedIn' };

  function renderFooter(el) {
    var home = el.dataset.home || '';
    var h = function (id) { return home + '#' + id; };
    var social = Object.keys(ICONS).map(function (k) {
      return '<li data-show-if="social.' + k + '"><a class="social" data-bind-href="social.' + k + '" href="#" target="_blank" rel="noopener noreferrer" aria-label="' + SOCIAL_NAMES[k] + ' (opens in a new tab)">' + ICONS[k] + '</a></li>';
    }).join('');

    el.innerHTML =
      '<h2 class="sr-only">Contact and quick links</h2>' +
      '<div class="wrap grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">' +
        '<div>' +
          '<div class="flex items-center gap-3">' + CREST + '<span class="brand-name text-ivory" data-bind="school.name"></span></div>' +
          '<p class="deva mt-5 text-gold-soft" lang="sa" data-show-if="school.motto" data-bind="school.motto"></p>' +
          '<address class="mt-4 not-italic leading-relaxed text-sm" data-show-if="school.address.line1|school.address.city" data-bind-address></address>' +
        '</div>' +
        '<div data-show-if="school.officeHours|school.phone|school.email">' +
          '<h3>Visit &amp; contact</h3>' +
          '<dl class="mt-5 space-y-4 text-sm">' +
            '<div data-show-if="school.officeHours"><dt class="text-ivory/65">Office hours</dt><dd class="text-ivory" data-bind="school.officeHours"></dd></div>' +
            '<div data-show-if="school.phone"><dt class="text-ivory/65">Phone</dt><dd><a class="f-link text-ivory" data-bind-href="school.phone" data-href-kind="tel" href="#"><span data-bind="school.phone"></span></a></dd></div>' +
            '<div data-show-if="school.email"><dt class="text-ivory/65">Email</dt><dd><a class="f-link break-all text-ivory" data-bind-href="school.email" data-href-kind="mailto" href="#"><span data-bind="school.email"></span></a></dd></div>' +
          '</dl>' +
        '</div>' +
        '<nav aria-label="Footer">' +
          '<h3>Quick links</h3>' +
          '<ul class="mt-4 text-sm">' +
            '<li><a class="f-link" href="' + h('about') + '">About the school</a></li>' +
            '<li><a class="f-link" href="' + h('academics') + '">Academics</a></li>' +
            '<li><a class="f-link" href="' + h('campus') + '">Campus life</a></li>' +
            '<li><a class="f-link" href="' + h('admissions') + '">Admissions</a></li>' +
            '<li><a class="f-link" href="disclosure.html">Mandatory public disclosure</a></li>' +
          '</ul>' +
        '</nav>' +
        '<div>' +
          '<div data-show-if="social.instagram|social.youtube|social.facebook|social.linkedin">' +
            '<h3>Follow us</h3>' +
            '<ul class="mt-5 flex flex-wrap gap-3">' + social + '</ul>' +
          '</div>' +
          '<a href="' + h('enquiry') + '" class="btn btn-gold btn-sm mt-8" data-cta>Apply Now</a>' +
        '</div>' +
      '</div>' +
      '<div class="wrap pb-12" id="mapWrap" hidden></div>' +
      '<div class="border-t border-white/10">' +
        '<div class="wrap flex flex-col gap-2 py-5 text-xs text-ivory/65 md:flex-row md:items-center md:justify-between">' +
          '<p class="py-2">© <span class="js-year"></span> <span data-bind="school.name"></span>. All rights reserved.' +
            '<span data-show-if="school.affiliationNumber"> · Affiliation No. <span data-bind="school.affiliationNumber"></span></span>' +
            '<span data-show-if="school.schoolCode"> · School Code <span data-bind="school.schoolCode"></span></span></p>' +
          '<ul class="flex flex-wrap gap-x-5">' +
            '<li><a class="f-link" href="privacy.html">Privacy policy</a></li>' +
            '<li><a class="f-link" href="terms.html">Terms of use</a></li>' +
            '<li><a class="f-link" href="grievance.html">Grievance redressal</a></li>' +
          '</ul>' +
        '</div>' +
      '</div>';
    el.querySelectorAll('.js-year').forEach(function (y) { y.textContent = new Date().getFullYear(); });

    if (C.school && C.school.showMap === true && addressComplete()) {
      var wrap = el.querySelector('#mapWrap');
      var q = encodeURIComponent([C.school.name].concat(addressLines().slice(0, -1)).join(', ') + ', India');
      var frame = document.createElement('iframe');
      frame.src = 'https://www.google.com/maps?q=' + q + '&output=embed';
      frame.title = 'Map showing the location of ' + C.school.name;
      frame.loading = 'lazy';
      frame.referrerPolicy = 'no-referrer-when-downgrade';
      frame.className = 'map-frame';
      wrap.appendChild(frame);
      wrap.hidden = false;
    }
  }

  document.querySelectorAll('[data-site-header]').forEach(renderHeader);
  document.querySelectorAll('[data-site-footer]').forEach(renderFooter);
  apply(document);

  window.School = {
    config: C, get: get, has: has, test: test, apply: apply,
    formatDate: formatDate, safeUrl: safeUrl, telHref: telHref,
    addressLines: addressLines, addressComplete: addressComplete
  };
})();
