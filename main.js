(function () {
  // ---- Sponsor & affiliate cards ----
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function card(s) {
    var c = el('article', 'sponsor');
    var tile = el('div', 'sponsor-tile' + (s.tile === 'light' ? ' light' : ''));
    if (s.logo) {
      var img = el('img', 'sponsor-logo' + (s.wide ? ' wide' : '')); img.src = s.logo; img.alt = s.name + ' logo'; img.loading = 'lazy'; img.decoding = 'async';
      tile.appendChild(img);
    } else {
      var mono = el('span', 'monogram', s.monogram || s.name.slice(0, 2).toUpperCase()); mono.setAttribute('aria-hidden', 'true');
      tile.appendChild(mono);
    }
    c.appendChild(tile);
    var body = el('div', 'sponsor-body');
    body.appendChild(el('h4', 'sponsor-name', s.name));
    body.appendChild(el('p', 'sponsor-blurb', s.blurb));
    c.appendChild(body);
    var bottom = el('div', 'sponsor-bottom');
    if (s.code) {
      var code = el('button', 'code'); code.type = 'button';
      code.setAttribute('aria-label', 'Copy promo code ' + s.code);
      code.innerHTML = '<span class="code-label">Code</span> <strong></strong> <span class="copy">Copy</span>';
      code.querySelector('strong').textContent = s.code;
      code.addEventListener('click', function () {
        var done = function () { code.querySelector('.copy').textContent = 'Copied!'; setTimeout(function () { code.querySelector('.copy').textContent = 'Copy'; }, 1600); };
        if (navigator.clipboard) navigator.clipboard.writeText(s.code).then(done, done); else done();
      });
      bottom.appendChild(code);
    } else {
      bottom.appendChild(el('span', 'link-note', 'Use this link'));
    }
    var a = el('a', 'btn btn-primary', s.cta || 'Shop now'); a.href = s.url || '#'; a.target = '_blank'; a.rel = 'noopener sponsored';
    a.setAttribute('aria-label', (s.cta || 'Shop now') + ': ' + s.name);
    bottom.appendChild(a); c.appendChild(bottom);
    return c;
  }
  [['sponsor-grid', window.SPONSORS], ['affiliate-grid', window.AFFILIATES]].forEach(function (g) {
    var grid = document.getElementById(g[0]); if (!grid) return;
    (g[1] || []).forEach(function (s) { grid.appendChild(card(s)); });
    if (!(g[1] || []).length && grid.parentNode) grid.parentNode.hidden = true;
  });
  var upd = document.getElementById('sponsors-updated');
  if (upd && window.SPONSORS_UPDATED) upd.textContent = 'Updated ' + window.SPONSORS_UPDATED;

  // ---- Footer year ----
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

  // ---- Contact form (Web3Forms) ----
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { status.textContent = 'Please fill in your name, a valid email, and a message.'; status.className = 'form-status err'; form.reportValidity && form.reportValidity(); return; }
    if (form.botcheck.checked) return; // honeypot tripped
    var btn = form.querySelector('button[type=submit]');
    btn.disabled = true; status.textContent = 'Sending…'; status.className = 'form-status';
    fetch(form.action, { method: 'POST', headers: { 'Accept': 'application/json' }, body: new FormData(form) })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d.success) { form.reset(); status.textContent = 'Thanks! Your message is on its way.'; status.className = 'form-status ok'; }
        else { throw new Error(d.message || 'error'); }
      })
      .catch(function () { status.textContent = 'Something went wrong. Please email info@KyleSeraphin.com directly.'; status.className = 'form-status err'; })
      .finally(function () { btn.disabled = false; });
  });
})();

/* Latest Spotify episode: today's thumbnail and title via Spotify oEmbed (CORS-enabled, no key). */
(function(){
  var box=document.getElementById('spotify-latest'); if(!box) return;
  var show=box.getAttribute('data-show');
  var showUrl='https://open.spotify.com/show/'+show;
  var player='https://open.spotify.com/embed/show/'+show+'/video?utm_source=generator&theme=0&autoplay=1';
  var img=box.querySelector('.sp-thumb'), title=document.getElementById('spotify-title');
  fetch('https://open.spotify.com/oembed?url='+encodeURIComponent(showUrl))
    .then(function(r){return r.ok?r.json():Promise.reject();})
    .then(function(d){
      if(d.thumbnail_url){img.src=d.thumbnail_url;img.hidden=false;}
      if(d.title&&title){title.textContent=d.title;}
      if(d.iframe_url){player=d.iframe_url+(d.iframe_url.indexOf('?')>-1?'&':'?')+'theme=0&autoplay=1';}
    }).catch(function(){});
  box.querySelector('.sp-poster').addEventListener('click',function(){
    var f=document.createElement('iframe');
    f.src=player; f.title='The Kyle Seraphin Show on Spotify';
    f.setAttribute('allow','autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture');
    f.setAttribute('allowfullscreen','');
    box.innerHTML=''; box.appendChild(f);
  });
})();

/* Latest daily YouTube episode: latest-video.json is refreshed every 20 min by a GitHub Action. */
(function(){
  var f=document.getElementById('yt-latest'); if(!f) return;
  fetch('latest-video.json?t='+Math.floor(Date.now()/600000),{cache:'no-store'})
    .then(function(r){return r.ok?r.json():Promise.reject();})
    .then(function(d){
      if(d&&/^[A-Za-z0-9_-]{11}$/.test(d.id)){
        f.src='https://www.youtube-nocookie.com/embed/'+d.id+'?rel=0';
        if(d.title) f.title=d.title;
      }
    }).catch(function(){});
})();

/* Combined follower count from followers.js */
(function(){
  var F=window.FOLLOWERS; if(!F||!F.platforms) return;
  var total=F.platforms.reduce(function(a,p){return a+(+p.count||0);},0);
  var fmt=function(k){return k>=1000?(Math.round(k/100)/10)+'M':(Math.round(k*10)/10)+'K';};
  var n=document.getElementById('reach-num'); if(n) n.textContent=fmt(total);
  var ul=document.getElementById('reach-list'); if(!ul) return;
  ul.innerHTML='';
  F.platforms.forEach(function(p){
    var li=document.createElement('li'); li.textContent=p.name;
    var b=document.createElement('b'); b.textContent=fmt(+p.count); li.appendChild(b); ul.appendChild(li);
  });
})();
