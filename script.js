/* =========================================================
   ADMIN SETTINGS — EDIT ONLY THIS BLOCK
   ========================================================= */
const CONFIG = {
  // Option A: YouTube video ID (the part after v= in the link). Leave "" if using MP4.
  youtubeId: "",
  // Option B: direct MP4 link. Used if youtubeId is empty.
  mp4Url: "",
  // Thumbnail image shown before play (leave "" for plain black)
  posterImage: "",
  // Text on the play button
  videoLabel: "▶ Watch this short video first",
  // Seconds after play before the CTA button appears (0 = show immediately)
  ctaRevealSeconds: 0,
  // Where the button goes (form section id or booking link)
  ctaLink: "https://rzp.io/rzp/etI6Mv5""
};

/* =========================================================
   SCRIPT — no need to edit below
   ========================================================= */
(function(){
  const poster = document.getElementById('vslPoster');
  const frame  = document.getElementById('vslFrame');
  const label  = document.getElementById('vslLabel');
  const cta    = document.getElementById('ctaWrap');
  const hint   = document.getElementById('ctaHint');
  const btn    = document.getElementById('ctaBtn');

  label.textContent = CONFIG.videoLabel;
  btn.setAttribute('href', CONFIG.ctaLink);
  if (CONFIG.posterImage) poster.style.backgroundImage = `url('${CONFIG.posterImage}')`;

  // CTA reveal logic
  function revealCTA(){
    cta.classList.remove('is-hidden');
    cta.classList.add('is-revealed');
    hint.classList.add('is-hidden');
  }
  if (CONFIG.ctaRevealSeconds > 0){
    cta.classList.add('is-hidden');
  } else {
    hint.classList.add('is-hidden');
  }

  // Play video on click
  let started = false;
  function play(){
    if (started) return; started = true;
    if (CONFIG.youtubeId){
      frame.innerHTML = `<iframe src="https://www.youtube.com/embed/${CONFIG.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    } else if (CONFIG.mp4Url){
      frame.innerHTML = `<video src="${CONFIG.mp4Url}" autoplay playsinline controlsList="nodownload" ${CONFIG.posterImage ? `poster="${CONFIG.posterImage}"` : ''}></video>`;
      const v = frame.querySelector('video');
      v.addEventListener('click', () => v.paused ? v.play() : v.pause());
    } else {
      label.textContent = 'Add your video in CONFIG';
      started = false; return;
    }
    if (CONFIG.ctaRevealSeconds > 0){
      setTimeout(revealCTA, CONFIG.ctaRevealSeconds * 1000);
    }
  }
  poster.addEventListener('click', play);
  poster.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(); } });

  // Smooth scroll for in-page links
  btn.addEventListener('click', e => {
    const href = btn.getAttribute('href');
    if (href.startsWith('#')){
      const t = document.querySelector(href);
      if (t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth'}); }
    }
  });

  // Count-up numbers
  const counters = document.querySelectorAll('[data-count]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target, end = +el.dataset.count, dur = 1600, t0 = performance.now();
      (function tick(now){
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(end * eased).toLocaleString('en-IN');
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
      io.unobserve(el);
    });
  }, {threshold:.5});
  counters.forEach(c => io.observe(c));
})();


/* reusable scroll reveal (works for all sections) */
(function(){
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      e.target.classList.add('is-in');
      e.target.querySelectorAll('.fit__list li').forEach((li,i)=>{
        li.style.transitionDelay = (0.15 + i*0.08) + 's';
      });
      io.unobserve(e.target);
    });
  },{threshold:.2});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
})();



/* SECTION 4 — scroll reveal */
(function(){
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  },{threshold:.25});
  document.querySelectorAll('#pain .reveal').forEach(el=>io.observe(el));
})();


/* SECTION 5 — scroll reveal */
(function(){
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  },{threshold:.25});
  document.querySelectorAll('#failed .reveal').forEach(el=>io.observe(el));
})();




/* SECTION 6 — timeline reveal */
(function(){
  const flow = document.querySelector('#system .system__flow');
  document.querySelectorAll('#system .system__step').forEach((s,i)=>{
    s.style.transitionDelay = (i*0.25)+'s';
    s.querySelector('.system__num').style.transitionDelay = (i*0.25+0.2)+'s';
  });
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  },{threshold:.2});
  io.observe(flow);
  document.querySelectorAll('#system .reveal').forEach(el=>io.observe(el));
})();




/* SECTION 7 — proof wall */
(function(){
  const sec = document.getElementById('proof');

  // reveal
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  },{threshold:.2});
  sec.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // count-up
  const cio = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      const el = entry.target, end = +el.dataset.proofCount, t0 = performance.now();
      (function tick(now){
        const p = Math.min((now - t0)/1600, 1);
        el.textContent = Math.round(end*(1-Math.pow(1-p,3))).toLocaleString('en-IN');
        if(p<1) requestAnimationFrame(tick);
      })(t0);
      cio.unobserve(el);
    });
  },{threshold:.5});
  sec.querySelectorAll('[data-proof-count]').forEach(el=>cio.observe(el));

  // duplicate quotes for seamless marquee
  const track = sec.querySelector('.proof__track');
  track.innerHTML += track.innerHTML;

  // video modal
  const modal = document.getElementById('proofModal');
  const frame = document.getElementById('proofFrame');
  function openVideo(id){
    frame.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    modal.classList.add('is-open'); modal.setAttribute('aria-hidden','false');
  }
  function closeVideo(){
    modal.classList.remove('is-open'); modal.setAttribute('aria-hidden','true');
    setTimeout(()=>frame.innerHTML='',350);
  }
  sec.querySelectorAll('.proof__case').forEach(card=>{
    const id = card.dataset.video, btn = card.querySelector('.proof__watch');
    if(!id){ btn.hidden = true; return; }
    btn.addEventListener('click',()=>openVideo(id));
  });
  modal.addEventListener('click',e=>{ if(e.target===modal || e.target.closest('.proof__close')) closeVideo(); });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeVideo(); });
})();




/* SECTION 8 — week tabs (auto-play, no page jump) */
(function(){
  const AUTO_SECONDS = 7;   // time per tab. 0 = no auto-play

  const sec    = document.getElementById('learn');
  const wrap   = sec.querySelector('.learn__wrap');
  const row    = sec.querySelector('.learn__tabs');
  const box    = sec.querySelector('.learn__panels');
  const tabs   = [...sec.querySelectorAll('.learn__tab')];
  const panels = [...sec.querySelectorAll('.learn__panel')];
  let current = 0, timer = null, inView = false, userClicked = false;

  wrap.style.setProperty('--learn-time', AUTO_SECONDS + 's');

  /* keep panel box at the tallest panel's height (stops page jumping) */
  function lockHeight(){
    box.style.minHeight = '';
    let max = 0;
    panels.forEach(p=>{
      const was = p.classList.contains('is-active');
      p.style.display = 'block'; p.style.visibility = 'hidden'; p.style.position = 'absolute';
      p.style.left = '0'; p.style.right = '0';
      max = Math.max(max, p.offsetHeight);
      p.style.display = p.style.visibility = p.style.position = p.style.left = p.style.right = '';
      if (was) p.classList.add('is-active');
    });
    const cs = getComputedStyle(box);
    box.style.minHeight = (max + parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom)) + 'px';
  }

  /* scroll ONLY the tab row sideways (mobile) — never the page */
  function centerTab(t){
    if (row.scrollWidth <= row.clientWidth) return;
    const rowRect = row.getBoundingClientRect(), tRect = t.getBoundingClientRect();
    const target = row.scrollLeft + (tRect.left - rowRect.left) - (row.clientWidth - tRect.width) / 2;
    row.scrollTo({ left: target, behavior: 'smooth' });
  }

  function show(i){
    current = i;
    tabs.forEach((t,n)=>{ t.classList.toggle('is-active', n===i); t.setAttribute('aria-selected', n===i); });
    panels.forEach((p,n)=>p.classList.toggle('is-active', n===i));
    centerTab(tabs[i]);
  }

  function start(){
    stop();
    if (!AUTO_SECONDS || userClicked || !inView) return;
    timer = setInterval(()=>show((current + 1) % tabs.length), AUTO_SECONDS * 1000);
  }
  function stop(){ clearInterval(timer); timer = null; }

  tabs.forEach((t,i)=>t.addEventListener('click', ()=>{
    userClicked = true;
    wrap.classList.add('is-paused');
    stop();
    show(i);
  }));

  /* auto-play only while section is on screen */
  new IntersectionObserver(([e])=>{
    inView = e.isIntersecting;
    inView ? start() : stop();
  },{threshold:.35}).observe(wrap);

  /* reveal animation */
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target); } });
  },{threshold:.2});
  sec.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  /* set height after fonts load + on resize */
  show(0);
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(lockHeight);
  let rt; window.addEventListener('resize', ()=>{ clearTimeout(rt); rt = setTimeout(lockHeight, 150); });
})();


/* SECTION 9 — reveal + Claude typing demo */
(function(){
  // EDIT the demo script lines here
  const LINES = [
    '<span class="k">› Business:</span> Dental clinic, Coimbatore',
    '<span class="k">› Buyer:</span> Parents worried about kids\' teeth',
    '<span class="g">✍ Hook:</span> "Unga kuzhandhai sweet saaptta apram idha pannunga…"',
    '<span class="s">✍ CTA:</span> "Free check-up-ku \'SMILE\'-nu DM pannunga."'
  ];

  const sec = document.getElementById('stack');
  const box = document.getElementById('stackTyping');
  let typed = false;

  function typeAll(){
    let li = 0;
    function nextLine(){
      if (li >= LINES.length){ box.insertAdjacentHTML('beforeend','<span class="stack__caret"></span>'); return; }
      const html = LINES[li], plain = html.replace(/<[^>]+>/g,'');
      let ci = 0;
      const line = document.createElement('div'); box.appendChild(line);
      (function tick(){
        ci++;
        // show plain text while typing, swap to coloured html when done
        line.textContent = plain.slice(0, ci);
        if (ci < plain.length) setTimeout(tick, 22);
        else { line.innerHTML = html; li++; setTimeout(nextLine, 280); }
      })();
    }
    nextLine();
  }

  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      e.target.classList.add('is-in');
      if (e.target.classList.contains('stack__tile--hero') && !typed){ typed = true; setTimeout(typeAll, 500); }
      io.unobserve(e.target);
    });
  },{threshold:.25});
  sec.querySelectorAll('.reveal').forEach(el=>io.observe(el));
})();




/* SECTION 10 — comparison reveal (icons pop row by row) */
(function(){
  const sec = document.getElementById('compare');
  sec.querySelectorAll('.cmp__row').forEach((row,r)=>{
    row.querySelectorAll('.y,.n').forEach((ic,c)=>{
      ic.style.transitionDelay = (0.3 + r*0.12 + c*0.05) + 's';
    });
  });
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  },{threshold:.25});
  sec.querySelectorAll('.reveal').forEach(el=>io.observe(el));
})();




/* SECTION 11 — agency vs cohort calculator */
(function(){
  const COHORT_PRICE = 10000;   // EDIT cohort price here

  const sec     = document.getElementById('math');
  const slider  = document.getElementById('mathSlider');
  const $ = id => document.getElementById(id);
  const inr = n => '₹' + n.toLocaleString('en-IN');
  let visible = false;

  $('mathPrice').textContent = inr(COHORT_PRICE);

  function update(){
    const monthly = +slider.value, yearly = monthly * 12;
    const pct = (monthly - slider.min) / (slider.max - slider.min) * 100;
    slider.style.setProperty('--fill', pct + '%');
    $('mathMonthly').textContent = inr(monthly);
    $('mathYearly').textContent  = inr(yearly);
    $('mathTimes').textContent   = Math.round(yearly / COHORT_PRICE) + 'x';
    $('mathSave').textContent    = inr(yearly - COHORT_PRICE);
    if (visible){
      $('mathBarAgency').style.width = '100%';
      $('mathBarUs').style.width     = (COHORT_PRICE / yearly * 100) + '%';
    }
  }
  slider.addEventListener('input', update);
  update();

  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      e.target.classList.add('is-in');
      if (e.target.classList.contains('math__bars')){ visible = true; setTimeout(update, 200); }
      io.unobserve(e.target);
    });
  },{threshold:.3});
  sec.querySelectorAll('.reveal').forEach(el=>io.observe(el));
})(); 




/* SECTION 12 — guarantee reveal */
(function(){
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  },{threshold:.25});
  document.querySelectorAll('#guarantee .reveal').forEach(el=>io.observe(el));
})();





/* SECTION 13 — coaches: reveal + hide empty photos */
(function(){
  const sec = document.getElementById('coaches');
  sec.querySelectorAll('.coach__photo img').forEach(img=>{
    if (!img.getAttribute('src')) img.remove();
    img.addEventListener('error', ()=>img.remove());
  });
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  },{threshold:.2});
  sec.querySelectorAll('.reveal').forEach(el=>io.observe(el));
})();



/* SECTION 14 — reveal */
(function(){
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target); } });
  },{threshold:.2});
  document.querySelectorAll('#call .reveal').forEach(el=>io.observe(el));
})();



/* SECTION 15 — FAQ accordion (one open at a time) */
(function(){
  const sec = document.getElementById('faq');
  const items = sec.querySelectorAll('.faq__item');
  items.forEach(item=>{
    item.querySelector('.faq__q').addEventListener('click',()=>{
      const open = item.classList.contains('is-open');
      items.forEach(i=>i.classList.remove('is-open'));
      if(!open) item.classList.add('is-open');
    });
  });
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target); } });
  },{threshold:.2});
  sec.querySelectorAll('.reveal').forEach(el=>io.observe(el));
})();




/* SECTION 16 — reveal */
(function(){
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target); } });
  },{threshold:.3});
  document.querySelectorAll('#final .reveal').forEach(el=>io.observe(el));
})();




/* SECTION 17 — booking form */
(function(){
  /* ============ ADMIN SETTINGS ============ */
  const FORM_CONFIG = {
    endpoint: "",                   // Google Apps Script Web App URL
    redirect: "thank-you.html",     // thank-you page (or Calendly link)
    metaPixelEvent: "Lead"          // fires if Meta Pixel is on the page. "" to disable
  };
  /* ======================================== */

  const form = document.getElementById('bookForm');
  const btn  = document.getElementById('bookSubmit');
  const phone = document.getElementById('bPhone');

  // numbers only in phone
  phone.addEventListener('input',()=>{ phone.value = phone.value.replace(/\D/g,'').slice(0,10); });

  // clear error on typing
  form.querySelectorAll('input').forEach(inp=>{
    inp.addEventListener('input',()=>inp.closest('.book__field')?.classList.remove('has-error'));
    inp.addEventListener('change',()=>inp.closest('.book__field')?.classList.remove('has-error'));
  });

  function validate(){
    let ok = true;
    const setErr = (el, bad)=>{ const f = el.closest('.book__field'); f.classList.toggle('has-error', bad); if(bad) ok = false; };
    setErr(form.name,     form.name.value.trim().length < 2);
    setErr(phone,         !/^[6-9]\d{9}$/.test(phone.value));
    setErr(form.business, !form.business.value.trim());
    setErr(form.offer,    !form.offer.value.trim());
    setErr(form.querySelector('input[name=goal]'), !form.querySelector('input[name=goal]:checked'));
    if(!ok) form.querySelector('.has-error')?.scrollIntoView({behavior:'smooth',block:'center'});
    return ok;
  }

  form.addEventListener('submit', async e=>{
    e.preventDefault();
    if(!validate()) return;
    btn.classList.add('is-loading');
    btn.querySelector('.book__btn-text').textContent = 'Booking…';

    const data = new URLSearchParams(new FormData(form));
    data.set('whatsapp', '+91' + phone.value);
    data.set('instagram', form.instagram.value.replace(/^@/,''));
    data.set('timestamp', new Date().toLocaleString('en-IN'));
    data.set('page', location.href);
    new URLSearchParams(location.search).forEach((v,k)=>{ if(k.startsWith('utm_') || k==='fbclid') data.set(k,v); });

    try{
      if (FORM_CONFIG.endpoint){
        await fetch(FORM_CONFIG.endpoint,{method:'POST',mode:'no-cors',body:data});
      } else {
        console.warn('Add your form endpoint in FORM_CONFIG');
      }
      if (FORM_CONFIG.metaPixelEvent && typeof fbq === 'function') fbq('track', FORM_CONFIG.metaPixelEvent);
    }catch(err){ console.error(err); }

    const q = new URLSearchParams({name: form.name.value.trim()});
    setTimeout(()=>{ location.href = FORM_CONFIG.redirect + (FORM_CONFIG.redirect.includes('?')?'&':'?') + q; }, 400);
  });

  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target); } });
  },{threshold:.15});
  document.querySelectorAll('#book .reveal').forEach(el=>io.observe(el));
})();






/* STICKY CTA — show after hero, hide on the form */
(function(){
  const bar  = document.getElementById('stickyCta');
  const hero = document.getElementById('hero');
  const book = document.getElementById('book');
  let pastHero = false, onForm = false;
  const set = ()=>bar.classList.toggle('is-show', pastHero && !onForm);
  new IntersectionObserver(([e])=>{ pastHero = !e.isIntersecting; set(); }).observe(hero);
  new IntersectionObserver(([e])=>{ onForm = e.isIntersecting; set(); },{threshold:.1}).observe(book);
})();
