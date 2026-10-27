(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const inr = n => '₹' + n.toLocaleString('en-IN');
  const SIZES = { S: ['Small', -20], R: ['Regular', 0], L: ['Large', 40] };
  const MILKS = { whole: ['Whole milk', 0], oat: ['Oat', 40], almond: ['Almond', 40], soy: ['Soy', 30] };
  const KEY = 'brewhouse-cart-v1';
  const GST = 0.05;
  const byId = id => MENU.find(m => m.id === id);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- illustrations (swap for photos with a "photo" field in menu.js) ---------- */
  const steam = '<path d="M84 46c-9-10 9-14 0-26M104 46c-9-10 9-14 0-26M124 46c-9-10 9-14 0-26" fill="none" stroke="#fff9" stroke-width="4" stroke-linecap="round"/>';
  const cup = c => `<ellipse cx="104" cy="142" rx="64" ry="8" fill="#0003"/><path d="M48 70h112v30a56 40 0 0 1-112 0z" fill="#fbf6ec"/><path d="M158 80h12a13 13 0 0 1 0 26h-16" fill="none" stroke="#fbf6ec" stroke-width="8"/><ellipse cx="104" cy="70" rx="56" ry="10" fill="${c}"/><path d="M104 64c-12 1-14 6 0 9 14-3 12-8 0-9z" fill="#f3e2c4"/>${steam}`;
  const ART = {
    cup,
    esp: c => `<g transform="translate(104 150) scale(.72) translate(-104 -150)">${cup(c)}</g>`,
    tea: c => `<ellipse cx="104" cy="138" rx="62" ry="9" fill="#fbf6ec"/><path d="M62 64h84l-7 60a35 12 0 0 1-70 0z" fill="${c}"/><path d="M62 64h84l-1 10H63z" fill="#fff6"/><ellipse cx="104" cy="64" rx="42" ry="7" fill="#fff8"/>${steam}`,
    glass: c => `<ellipse cx="104" cy="146" rx="46" ry="6" fill="#0003"/><path d="M70 40h68l-7 100H77z" fill="#fff6"/><path d="M73 76h62l-4 64H77z" fill="${c}"/><rect x="80" y="62" width="24" height="24" rx="5" fill="#fffa" transform="rotate(-12 92 74)"/><rect x="108" y="56" width="22" height="22" rx="5" fill="#fff9" transform="rotate(10 119 67)"/><path d="M116 18l12 118" stroke="#8a5a1f" stroke-width="5" stroke-linecap="round"/>`,
    croissant: c => `<ellipse cx="104" cy="140" rx="68" ry="7" fill="#0003"/><g fill="${c}" stroke="#0003" stroke-width="2"><ellipse cx="44" cy="114" rx="26" ry="14" transform="rotate(40 44 114)"/><ellipse cx="164" cy="114" rx="26" ry="14" transform="rotate(-40 164 114)"/><ellipse cx="70" cy="98" rx="32" ry="22" transform="rotate(22 70 98)"/><ellipse cx="138" cy="98" rx="32" ry="22" transform="rotate(-22 138 98)"/><ellipse cx="104" cy="90" rx="30" ry="29"/></g>`,
    muffin: c => `<ellipse cx="104" cy="144" rx="52" ry="6" fill="#0003"/><path d="M62 98h84l-10 44H72z" fill="#d9c2a0"/><path d="M52 102c-10-38 24-60 52-60s62 22 52 60z" fill="#c98f4d"/><g fill="${c}"><circle cx="84" cy="72" r="6"/><circle cx="120" cy="64" r="6"/><circle cx="104" cy="86" r="6"/><circle cx="138" cy="86" r="5"/></g>`,
    brownie: c => `<polygon points="46,92 104,66 162,92 104,118" fill="#7a4a30"/><polygon points="46,92 104,118 104,148 46,122" fill="${c}"/><polygon points="162,92 104,118 104,148 162,122" fill="#35200f"/><g fill="#d9b27a"><circle cx="84" cy="94" r="5"/><circle cx="118" cy="88" r="5"/><circle cx="104" cy="102" r="5"/></g>`,
    roll: c => `<ellipse cx="104" cy="140" rx="62" ry="7" fill="#0003"/><circle cx="104" cy="94" r="54" fill="#e3b57a"/><path d="M104 94a6 6 0 0 1 12 0a14 14 0 0 1-28 0a22 22 0 0 1 44 0a30 30 0 0 1-60 0a38 38 0 0 1 76 0" fill="none" stroke="${c}" stroke-width="6"/><circle cx="104" cy="94" r="54" fill="#fff4" />`,
    toast: c => `<rect x="46" y="44" width="116" height="96" rx="30" fill="#c98f4d"/><rect x="56" y="54" width="96" height="76" rx="22" fill="#f1d9a8"/><ellipse cx="104" cy="94" rx="40" ry="28" fill="${c}"/><circle cx="104" cy="90" r="16" fill="#fff"/><circle cx="104" cy="90" r="7" fill="#f0b429"/>`,
    sandwich: c => `<ellipse cx="104" cy="142" rx="68" ry="6" fill="#0003"/><rect x="40" y="112" width="128" height="26" rx="11" fill="#d9a25e"/><path d="M40 112c10-8 20 6 32 0s22 6 32 0 22 6 32 0 20 6 32 0v8H40z" fill="#7ea04d"/><rect x="44" y="98" width="120" height="16" rx="6" fill="${c}"/><path d="M38 100c0-36 32-48 66-48s66 12 66 48z" fill="#e2b06a"/>`
  };
  const art = m => m.photo ? `<img src="${esc(m.photo)}" alt="${esc(m.name)}" loading="lazy">`
    : `<svg viewBox="0 0 208 160" role="img" aria-label="${esc(m.name)}">${ART[m.art](m.tint)}</svg>`;

  /* ---------- cart state ---------- */
  let cart = [];
  try {
    cart = (JSON.parse(localStorage.getItem(KEY)) || []).filter(l => byId(l.id) && l.qty > 0 && l.qty < 100);
  } catch (e) { cart = []; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} };
  const unit = l => {
    const m = byId(l.id);
    return m.price + (m.opt ? SIZES[l.size][1] : 0) + (m.opt === 'sm' ? MILKS[l.milk][1] : 0);
  };
  const label = l => {
    const m = byId(l.id);
    return [m.opt && SIZES[l.size][0], m.opt === 'sm' && MILKS[l.milk][0]].filter(Boolean).join(', ');
  };
  const totals = () => {
    const sub = cart.reduce((s, l) => s + unit(l) * l.qty, 0);
    const tax = Math.round(sub * GST);
    return { sub, tax, total: sub + tax };
  };
  const totalsHtml = t => `<div class="tot"><span>Subtotal</span><span>${inr(t.sub)}</span></div><div class="tot"><span>GST (5%)</span><span>${inr(t.tax)}</span></div><div class="tot big"><span>Total</span><span>${inr(t.total)}</span></div>`;
  const linesHtml = ls => ls.map(l => `<div class="tot"><span>${l.qty} × ${esc(l.name)}${l.opts ? ' (' + esc(l.opts) + ')' : ''}</span><span>${inr(l.price * l.qty)}</span></div>`).join('');
  const snapshot = () => cart.map(l => ({ name: byId(l.id).name, opts: label(l), qty: l.qty, price: unit(l) }));

  let toastT;
  const toast = msg => {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2200);
  };
  const openDlg = d => d.showModal ? d.showModal() : d.setAttribute('open', '');
  const closeDlg = d => d.close ? d.close() : d.removeAttribute('open');

  function addToCart(id, size, milk) {
    const m = byId(id);
    size = m.opt ? size : ''; milk = m.opt === 'sm' ? milk : '';
    const ex = cart.find(l => l.id === id && l.size === size && l.milk === milk);
    if (ex) ex.qty = Math.min(ex.qty + 1, 20); else cart.push({ id, size, milk, qty: 1 });
    save(); renderCart(); toast(m.name + ' added to your order');
  }

  /* ---------- rendering ---------- */
  function cardHtml(m) {
    return `<article class="card" style="--t:${m.tint}"><figure>${art(m)}</figure><div class="body"><h3>${esc(m.name)}</h3><p>${esc(m.desc)}</p><div class="foot"><span class="price">${inr(m.price)}</span><button class="btn" data-add="${m.id}" aria-label="${m.opt ? 'Customise and add ' : 'Add '}${esc(m.name)}">${m.opt ? 'Customise' : 'Add'}</button></div></div></article>`;
  }
  let cat = 'all', q = '';
  function renderMenu() {
    const term = q.trim().toLowerCase();
    const list = MENU.filter(m => (cat === 'all' || m.cat === cat) && (!term || (m.name + ' ' + m.desc + ' ' + m.cat).toLowerCase().includes(term)));
    $('#menuGrid').innerHTML = list.length ? list.map(cardHtml).join('')
      : `<div class="empty"><p>Nothing matches “${esc(q)}”${cat !== 'all' ? ' in this category' : ''}. Try another word or clear the filters.</p><button class="btn ghost" data-clear>Clear filters</button></div>`;
    $('#count').textContent = list.length + (list.length === 1 ? ' item' : ' items');
    $$('#chips button').forEach(b => b.setAttribute('aria-pressed', b.dataset.cat === cat));
  }
  function renderCart() {
    const n = cart.reduce((s, l) => s + l.qty, 0);
    $('#cartCount').textContent = n;
    $('#cartBtn').setAttribute('aria-label', 'Open cart, ' + n + (n === 1 ? ' item' : ' items'));
    $('#cartBody').innerHTML = cart.length ? cart.map((l, i) => `<div class="line"><div><b>${esc(byId(l.id).name)}</b><small>${esc(label(l))}</small><div class="qty"><button data-dec="${i}" aria-label="Decrease quantity">−</button><span aria-live="polite">${l.qty}</span><button data-inc="${i}" aria-label="Increase quantity">+</button><button class="rm" data-rm="${i}">Remove</button></div></div><strong>${inr(unit(l) * l.qty)}</strong></div>`).join('')
      : '<p>Your cart is empty. Add a drink or a pastry from the menu.</p>';
    $('#cartFoot').innerHTML = cart.length ? totalsHtml(totals()) + '<button class="btn" data-checkout>Continue to pickup details</button>' : '<button class="btn ghost" data-closecart>Browse the menu</button>';
  }

  /* ---------- cart drawer ---------- */
  const setCart = open => {
    $('#cart').classList.toggle('open', open);
    $('#cart').setAttribute('aria-hidden', !open);
    $('#scrim').hidden = !open;
    if (open) $('#cart .x').focus(); else $('#cartBtn').focus();
  };

  /* ---------- customise ---------- */
  let cur = null;
  function openCustom(id) {
    const m = byId(id); cur = m;
    $('#cTitle').textContent = m.name; $('#cDesc').textContent = m.desc;
    const radios = (name, obj, def, showD) => Object.entries(obj).map(([k, [l, d]]) => `<label><input type="radio" name="${name}" value="${k}" ${k === def ? 'checked' : ''}> ${l}${showD && d ? ' (' + (d > 0 ? '+' : '−') + inr(Math.abs(d)) + ')' : ''}</label>`).join('');
    $('#fsSize').innerHTML = '<legend>Size</legend>' + radios('size', SIZES, 'R', true);
    $('#fsMilk').innerHTML = '<legend>Milk</legend>' + radios('milk', MILKS, 'whole', true);
    $('#fsMilk').hidden = m.opt !== 'sm';
    updateCustomPrice(); openDlg($('#dlgCustom'));
  }
  function updateCustomPrice() {
    const f = $('#customForm');
    const s = f.size.value, k = cur.opt === 'sm' ? f.milk.value : 'whole';
    $('#cAdd').textContent = 'Add to order · ' + inr(cur.price + SIZES[s][1] + (cur.opt === 'sm' ? MILKS[k][1] : 0));
  }

  /* ---------- hours ---------- */
  const HOURS = { wk: [450, 1260], we: [510, 1320] };
  const hoursFor = d => (d === 0 || d === 6) ? HOURS.we : HOURS.wk;
  const fmt = m => { const h = Math.floor(m / 60), mm = m % 60; return ((h + 11) % 12 + 1) + ':' + String(mm).padStart(2, '0') + ' ' + (h < 12 ? 'am' : 'pm'); };
  function renderHours() {
    const now = new Date(), [o, c] = hoursFor(now.getDay()), mins = now.getHours() * 60 + now.getMinutes();
    const open = mins >= o && mins < c;
    const b = $('#openBadge'); b.classList.toggle('on', open);
    b.textContent = open ? 'Open now until ' + fmt(c) : 'Closed now. Opens at ' + fmt(mins < o ? o : hoursFor((now.getDay() + 1) % 7)[0]) + (mins < o ? ' today' : ' tomorrow');
    $$('#hours tr').forEach(r => r.classList.toggle('today', r.dataset.d.split(',').includes(String(now.getDay()))));
  }
  function pickupOptions() {
    const now = new Date(), [o, c] = hoursFor(now.getDay()), mins = now.getHours() * 60 + now.getMinutes();
    const opts = [];
    if (mins >= o && mins + 15 < c) opts.push('As soon as possible (about 15 minutes)');
    let t = Math.ceil((Math.max(mins + 30, o)) / 15) * 15;
    for (; t <= c - 15 && opts.length < 10; t += 15) opts.push('Today at ' + fmt(t));
    if (!opts.length) opts.push('Tomorrow, when we open at ' + fmt(hoursFor((now.getDay() + 1) % 7)[0]));
    $('#coTime').innerHTML = opts.map(o => `<option>${o}</option>`).join('');
  }

  /* ---------- events ---------- */
  document.addEventListener('click', e => {
    const t = e.target.closest('button,[data-close]'); if (!t) return;
    const d = t.dataset;
    if (d.add) { const m = byId(d.add); m.opt ? openCustom(d.add) : addToCart(d.add); }
    else if (d.cat) { cat = d.cat; renderMenu(); }
    else if ('clear' in d) { cat = 'all'; q = ''; $('#search').value = ''; renderMenu(); }
    else if (d.inc) { const l = cart[+d.inc]; l.qty = Math.min(l.qty + 1, 20); save(); renderCart(); }
    else if (d.dec) { const l = cart[+d.dec]; if (--l.qty < 1) cart.splice(+d.dec, 1); save(); renderCart(); }
    else if (d.rm) { cart.splice(+d.rm, 1); save(); renderCart(); }
    else if ('closecart' in d) setCart(false);
    else if ('checkout' in d) {
      if (!cart.length) return;
      $('#coSummary').innerHTML = linesHtml(snapshot()) + totalsHtml(totals());
      $('#coErr').textContent = ''; pickupOptions(); setCart(false); openDlg($('#dlgCheckout'));
    }
    else if ('close' in d) closeDlg(t.closest('dialog'));
    else if (t.id === 'cartBtn') setCart(true);
  });
  $('#scrim').addEventListener('click', () => setCart(false));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && $('#cart').classList.contains('open')) setCart(false); });
  $('#search').addEventListener('input', e => { q = e.target.value; renderMenu(); });
  $('#customForm').addEventListener('change', updateCustomPrice);
  $('#customForm').addEventListener('submit', e => {
    e.preventDefault(); const f = e.target;
    addToCart(cur.id, f.size.value, cur.opt === 'sm' ? f.milk.value : '');
    closeDlg($('#dlgCustom'));
  });
  $('#coForm').addEventListener('submit', e => {
    e.preventDefault(); const f = e.target, err = $('#coErr');
    const name = f.name.value.trim(), phone = f.phone.value.replace(/[\s-]/g, '').replace(/^(\+91|0)/, '');
    if (!name) { err.textContent = 'Please enter the name for the pickup.'; f.name.focus(); return; }
    if (!/^[6-9]\d{9}$/.test(phone)) { err.textContent = 'Enter a valid 10-digit mobile number.'; f.phone.focus(); return; }
    if (!cart.length) { err.textContent = 'Your cart is empty.'; return; }
    const lines = snapshot(), t = totals();
    const no = 'BH-' + String(Math.floor(1000 + Math.random() * 9000));
    $('#dnMeta').innerHTML = `Order <strong>${no}</strong> for <strong>${esc(name)}</strong><br>Pickup: ${esc(f.time.value)}${f.notes.value.trim() ? '<br>Notes: ' + esc(f.notes.value.trim()) : ''}`;
    $('#dnSummary').innerHTML = linesHtml(lines) + totalsHtml(t);
    cart = []; save(); renderCart(); f.reset(); closeDlg($('#dlgCheckout')); openDlg($('#dlgDone'));
  });
  $('#contact').addEventListener('submit', e => {
    e.preventDefault(); const f = e.target;
    $('#contactNote').textContent = f.checkValidity() ? 'Thanks, ' + f.n.value.trim() + '. This is a demo, so your message was not sent.' : 'Please fill in your name, a valid email and a message.';
    if (f.checkValidity()) f.reset();
  });

  /* ---------- init ---------- */
  $('#chips').innerHTML = CATS.map(([k, l]) => `<button data-cat="${k}" aria-pressed="false">${l}</button>`).join('');
  $('#featGrid').innerHTML = MENU.filter(m => m.feat).map(cardHtml).join('');
  $('#heroArt').innerHTML = `<svg viewBox="0 0 208 160">${ART.cup('#2a1a12')}</svg>`;
  window.addEventListener('storage', e => { if (e.key === KEY) { try { cart = JSON.parse(e.newValue) || []; } catch (x) { cart = []; } renderCart(); } });
  renderMenu(); renderCart(); renderHours();
})();
