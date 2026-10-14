/* =========================================================
   CONFIGURATION
   ========================================================= */

const CONFIG = {
  videoUrl: "https://assets.cdn.filesafe.space/p1h346tRdZ34wGNbuELv/media/6acdf42904c496731f4af66c.mp4",

  // Replace this dummy URL with your actual thumbnail image URL.
  thumbnailUrl: "jairai tumbline.png",

  ctaRevealSeconds: 0,
  ctaLink: "https://rzp.io/rzp/etI6Mv5"
};


/* =========================================================
   SECTION 1 — VSL, CTA, AND COUNTERS
   ========================================================= */

(function () {
  const frame = document.getElementById("vslFrame");
  const cta = document.getElementById("ctaWrap");
  const hint = document.getElementById("ctaHint");
  const btn = document.getElementById("ctaBtn");

  if (btn) btn.setAttribute("href", CONFIG.ctaLink);

  function revealCTA() {
    if (cta) {
      cta.classList.remove("is-hidden");
      cta.classList.add("is-revealed");
    }
    if (hint) hint.classList.add("is-hidden");
  }

  if (CONFIG.ctaRevealSeconds > 0) {
    if (cta) cta.classList.add("is-hidden");
  } else {
    if (hint) hint.classList.add("is-hidden");
  }

  /* VSL VIDEO — THUMBNAIL + AUTOPLAY */
  const url = CONFIG.videoUrl;
  const thumbnail = CONFIG.thumbnailUrl;

  const ytMatch = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/
  );

  if (frame && ytMatch) {
    frame.innerHTML = `
      <iframe
        src="https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1"
        title="VSL Video"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowfullscreen>
      </iframe>
    `;
  } else if (frame && url) {
    const video = document.createElement("video");

    video.src = url;
    video.poster = thumbnail;
    video.autoplay = true;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.controls = true;
    video.preload = "auto";

    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("controlsList", "nodownload");
    video.setAttribute("aria-label", "VSL video");

    frame.replaceChildren(video);

    // Attempt autoplay. If the browser blocks it, video controls remain available.
    const playAttempt = video.play();

    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.catch(() => {});
    }
  }

  if (CONFIG.ctaRevealSeconds > 0) {
    setTimeout(revealCTA, CONFIG.ctaRevealSeconds * 1000);
  }

  if (btn) {
    btn.addEventListener("click", function (e) {
      const href = btn.getAttribute("href");

      if (href && href.startsWith("#")) {
        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  }

  /* NUMBER COUNTERS */
  const counters = document.querySelectorAll("[data-count]");

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          const end = Number(el.dataset.count);
          const duration = 1600;
          const startTime = performance.now();

          (function tick(now) {
            const progress = Math.min(
              (now - startTime) / duration,
              1
            );

            const eased = 1 - Math.pow(1 - progress, 3);

            el.textContent = Math.round(end * eased).toLocaleString("en-IN");

            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          })(startTime);

          counterObserver.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(counter => counterObserver.observe(counter));
  }
})();


/* =========================================================
   REUSABLE SCROLL REVEAL
   ========================================================= */

(function () {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach(el => {
      el.classList.add("is-in");
    });
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-in");

        entry.target.querySelectorAll(".fit__list li").forEach((li, i) => {
          li.style.transitionDelay = (0.15 + i * 0.08) + "s";
        });

        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
})();


/* =========================================================
   SECTION 4 — PAIN SECTION REVEAL
   ========================================================= */

(function () {
  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.25 }
  );

  document.querySelectorAll("#pain .reveal").forEach(el => {
    observer.observe(el);
  });
})();


/* =========================================================
   SECTION 5 — FAILED SECTION REVEAL
   ========================================================= */

(function () {
  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.25 }
  );

  document.querySelectorAll("#failed .reveal").forEach(el => {
    observer.observe(el);
  });
})();


/* =========================================================
   SECTION 6 — SYSTEM TIMELINE REVEAL
   ========================================================= */

(function () {
  const flow = document.querySelector("#system .system__flow");

  document.querySelectorAll("#system .system__step").forEach((step, i) => {
    step.style.transitionDelay = (i * 0.25) + "s";

    const number = step.querySelector(".system__num");

    if (number) {
      number.style.transitionDelay = (i * 0.25 + 0.2) + "s";
    }
  });

  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  if (flow) observer.observe(flow);

  document.querySelectorAll("#system .reveal").forEach(el => {
    observer.observe(el);
  });
})();


/* =========================================================
   SECTION 7 — PROOF WALL
   ========================================================= */

(function () {
  const sec = document.getElementById("proof");
  if (!sec) return;

  if ("IntersectionObserver" in window) {
    /* Reveal */
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    sec.querySelectorAll(".reveal").forEach(el => {
      revealObserver.observe(el);
    });

    /* Count-up */
    const countObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          const end = Number(el.dataset.proofCount);
          const startTime = performance.now();

          (function tick(now) {
            const progress = Math.min((now - startTime) / 1600, 1);

            el.textContent = Math.round(
              end * (1 - Math.pow(1 - progress, 3))
            ).toLocaleString("en-IN");

            if (progress < 1) requestAnimationFrame(tick);
          })(startTime);

          countObserver.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    sec.querySelectorAll("[data-proof-count]").forEach(el => {
      countObserver.observe(el);
    });
  }

  /* Duplicate quotes for seamless marquee */
  const track = sec.querySelector(".proof__track");

  if (track && !track.dataset.duplicated) {
    track.innerHTML += track.innerHTML;
    track.dataset.duplicated = "true";
  }

  /* Video modal */
  const modal = document.getElementById("proofModal");
  const frame = document.getElementById("proofFrame");

  function openVideo(id) {
    if (!modal || !frame || !id) return;

    frame.innerHTML = `
      <iframe
        src="https://www.youtube.com/embed/${encodeURIComponent(id)}?autoplay=1&mute=1&rel=0&playsinline=1"
        title="Proof video"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowfullscreen>
      </iframe>
    `;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeVideo() {
    if (!modal || !frame) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");

    setTimeout(() => {
      frame.innerHTML = "";
    }, 350);
  }

  sec.querySelectorAll(".proof__case").forEach(card => {
    const id = card.dataset.video;
    const watchButton = card.querySelector(".proof__watch");

    if (!watchButton) return;

    if (!id) {
      watchButton.hidden = true;
      return;
    }

    watchButton.addEventListener("click", () => openVideo(id));
  });

  if (modal) {
    modal.addEventListener("click", e => {
      if (
        e.target === modal ||
        (e.target.closest && e.target.closest(".proof__close"))
      ) {
        closeVideo();
      }
    });

    document.addEventListener("keydown", e => {
      if (e.key === "Escape") closeVideo();
    });
  }
})();


/* =========================================================
   SECTION 8 — WEEK TABS
   ========================================================= */

(function () {
  const AUTO_SECONDS = 7;

  const sec = document.getElementById("learn");
  if (!sec) return;

  const wrap = sec.querySelector(".learn__wrap");
  const row = sec.querySelector(".learn__tabs");
  const box = sec.querySelector(".learn__panels");
  const tabs = [...sec.querySelectorAll(".learn__tab")];
  const panels = [...sec.querySelectorAll(".learn__panel")];

  if (!wrap || !row || !box || !tabs.length || !panels.length) return;

  let current = 0;
  let timer = null;
  let inView = false;
  let userClicked = false;

  wrap.style.setProperty("--learn-time", AUTO_SECONDS + "s");

  function lockHeight() {
    box.style.minHeight = "";

    let max = 0;

    panels.forEach(panel => {
      const wasActive = panel.classList.contains("is-active");

      panel.style.display = "block";
      panel.style.visibility = "hidden";
      panel.style.position = "absolute";
      panel.style.left = "0";
      panel.style.right = "0";

      max = Math.max(max, panel.offsetHeight);

      panel.style.display = "";
      panel.style.visibility = "";
      panel.style.position = "";
      panel.style.left = "";
      panel.style.right = "";

      if (wasActive) panel.classList.add("is-active");
    });

    const styles = getComputedStyle(box);

    box.style.minHeight =
      max +
      parseFloat(styles.paddingTop || 0) +
      parseFloat(styles.paddingBottom || 0) +
      "px";
  }

  function centerTab(tab) {
    if (row.scrollWidth <= row.clientWidth) return;

    const rowRect = row.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();

    const target =
      row.scrollLeft +
      (tabRect.left - rowRect.left) -
      (row.clientWidth - tabRect.width) / 2;

    row.scrollTo({ left: target, behavior: "smooth" });
  }

  function show(index) {
    if (!tabs[index] || !panels[index]) return;

    current = index;

    tabs.forEach((tab, i) => {
      tab.classList.toggle("is-active", i === index);
      tab.setAttribute("aria-selected", String(i === index));
    });

    panels.forEach((panel, i) => {
      panel.classList.toggle("is-active", i === index);
    });

    centerTab(tabs[index]);
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function start() {
    stop();

    if (!AUTO_SECONDS || userClicked || !inView) return;

    timer = setInterval(() => {
      show((current + 1) % tabs.length);
    }, AUTO_SECONDS * 1000);
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      userClicked = true;
      wrap.classList.add("is-paused");
      stop();
      show(index);
    });
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      inView ? start() : stop();
    }, { threshold: 0.35 }).observe(wrap);

    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    sec.querySelectorAll(".reveal").forEach(el => {
      revealObserver.observe(el);
    });
  }

  show(0);

  (document.fonts ? document.fonts.ready : Promise.resolve())
    .then(lockHeight);

  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(lockHeight, 150);
  });
})();


/* =========================================================
   SECTION 9 — REVEAL + TYPING DEMO
   ========================================================= */

(function () {
  const LINES = [
    '<span class="k">› Business:</span> Dental clinic, Coimbatore',
    '<span class="k">› Buyer:</span> Parents worried about kids\' teeth',
    '<span class="g">✍ Hook:</span> "Unga kuzhandhai sweet saaptta apram idha pannunga…"',
    '<span class="s">✍ CTA:</span> "Free check-up-ku \'SMILE\'-nu DM pannunga."'
  ];

  const sec = document.getElementById("stack");
  if (!sec) return;

  const box = document.getElementById("stackTyping");
  let typed = false;

  function typeAll() {
    if (!box) return;

    let lineIndex = 0;

    function nextLine() {
      if (lineIndex >= LINES.length) {
        box.insertAdjacentHTML(
          "beforeend",
          '<span class="stack__caret"></span>'
        );
        return;
      }

      const html = LINES[lineIndex];
      const plain = html.replace(/<[^>]+>/g, "");
      let charIndex = 0;

      const line = document.createElement("div");
      box.appendChild(line);

      (function tick() {
        charIndex++;
        line.textContent = plain.slice(0, charIndex);

        if (charIndex < plain.length) {
          setTimeout(tick, 22);
        } else {
          line.innerHTML = html;
          lineIndex++;
          setTimeout(nextLine, 280);
        }
      })();
    }

    nextLine();
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-in");

          if (
            entry.target.classList.contains("stack__tile--hero") &&
            !typed
          ) {
            typed = true;
            setTimeout(typeAll, 500);
          }

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.25 }
    );

    sec.querySelectorAll(".reveal").forEach(el => observer.observe(el));
  }
})();


/* =========================================================
   SECTION 10 — COMPARISON REVEAL
   ========================================================= */

(function () {
  const sec = document.getElementById("compare");
  if (!sec) return;

  sec.querySelectorAll(".cmp__row").forEach((row, rowIndex) => {
    row.querySelectorAll(".y, .n").forEach((icon, colIndex) => {
      icon.style.transitionDelay =
        (0.3 + rowIndex * 0.12 + colIndex * 0.05) + "s";
    });
  });

  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.25 }
  );

  sec.querySelectorAll(".reveal").forEach(el => observer.observe(el));
})();


/* =========================================================
   SECTION 11 — AGENCY VS COHORT CALCULATOR
   ========================================================= */

(function () {
  const COHORT_PRICE = 10000;

  const sec = document.getElementById("math");
  if (!sec) return;

  const slider = document.getElementById("mathSlider");
  if (!slider) return;

  const $ = id => document.getElementById(id);
  const inr = number => "₹" + number.toLocaleString("en-IN");

  let visible = false;

  if ($("mathPrice")) {
    $("mathPrice").textContent = inr(COHORT_PRICE);
  }

  function update() {
    const monthly = Number(slider.value);
    const yearly = monthly * 12;
    const range = Number(slider.max) - Number(slider.min);

    const pct = range
      ? ((monthly - Number(slider.min)) / range) * 100
      : 0;

    slider.style.setProperty("--fill", pct + "%");

    if ($("mathMonthly")) $("mathMonthly").textContent = inr(monthly);
    if ($("mathYearly")) $("mathYearly").textContent = inr(yearly);

    if ($("mathTimes")) {
      $("mathTimes").textContent =
        Math.round(yearly / COHORT_PRICE) + "x";
    }

    if ($("mathSave")) {
      $("mathSave").textContent = inr(yearly - COHORT_PRICE);
    }

    if (visible && yearly > 0) {
      if ($("mathBarAgency")) {
        $("mathBarAgency").style.width = "100%";
      }

      if ($("mathBarUs")) {
        $("mathBarUs").style.width =
          Math.min((COHORT_PRICE / yearly) * 100, 100) + "%";
      }
    }
  }

  slider.addEventListener("input", update);
  update();

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-in");

          if (entry.target.classList.contains("math__bars")) {
            visible = true;
            setTimeout(update, 200);
          }

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.3 }
    );

    sec.querySelectorAll(".reveal").forEach(el => {
      observer.observe(el);
    });
  }
})();


/* =========================================================
   SECTION 12 — GUARANTEE REVEAL
   ========================================================= */

(function () {
  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.25 }
  );

  document.querySelectorAll("#guarantee .reveal").forEach(el => {
    observer.observe(el);
  });
})();


/* =========================================================
   SECTION 13 — COACHES: REVEAL + HIDE EMPTY PHOTOS
   ========================================================= */

(function () {
  const sec = document.getElementById("coaches");
  if (!sec) return;

  sec.querySelectorAll(".coach__photo img").forEach(img => {
    if (!img.getAttribute("src")) {
      img.remove();
      return;
    }

    img.addEventListener("error", () => img.remove());
  });

  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  sec.querySelectorAll(".reveal").forEach(el => observer.observe(el));
})();


/* =========================================================
   SECTION 14 — CALL SECTION REVEAL
   ========================================================= */

(function () {
  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll("#call .reveal").forEach(el => {
    observer.observe(el);
  });
})();


/* =========================================================
   SECTION 15 — FAQ ACCORDION
   ========================================================= */

(function () {
  const sec = document.getElementById("faq");
  if (!sec) return;

  const items = sec.querySelectorAll(".faq__item");

  items.forEach(item => {
    const question = item.querySelector(".faq__q");
    if (!question) return;

    question.addEventListener("click", () => {
      const wasOpen = item.classList.contains("is-open");

      items.forEach(other => other.classList.remove("is-open"));

      if (!wasOpen) item.classList.add("is-open");
    });
  });

  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  sec.querySelectorAll(".reveal").forEach(el => observer.observe(el));
})();


/* =========================================================
   SECTION 16 — FINAL SECTION REVEAL
   ========================================================= */

(function () {
  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll("#final .reveal").forEach(el => {
    observer.observe(el);
  });
})();


/* =========================================================
   SECTION 17 — BOOKING FORM
   ========================================================= */

(function () {
  const FORM_CONFIG = {
    endpoint: "",                   // Add your Google Apps Script Web App URL
    redirect: "thank-you.html",     // Thank-you page or booking URL
    metaPixelEvent: "Lead"          // Set to "" to disable the Meta Pixel event
  };

  const form = document.getElementById("bookForm");
  const btn = document.getElementById("bookSubmit");
  const phone = document.getElementById("bPhone");

  if (!form || !btn || !phone) return;

  /* Numbers only in phone field */
  phone.addEventListener("input", () => {
    phone.value = phone.value.replace(/\D/g, "").slice(0, 10);
  });

  /* Clear validation errors when typing */
  form.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => {
      input.closest(".book__field")?.classList.remove("has-error");
    });

    input.addEventListener("change", () => {
      input.closest(".book__field")?.classList.remove("has-error");
    });
  });

  function validate() {
    let valid = true;

    const setError = (element, invalid) => {
      if (!element) {
        valid = false;
        return;
      }

      const field = element.closest(".book__field");

      if (field) field.classList.toggle("has-error", invalid);

      if (invalid) valid = false;
    };

    setError(form.elements.namedItem("name"),
      !form.elements.namedItem("name") ||
      form.elements.namedItem("name").value.trim().length < 2
    );

    setError(phone, !/^[6-9]\d{9}$/.test(phone.value));

    const business = form.elements.namedItem("business");
    setError(business, !business || !business.value.trim());

    const offer = form.elements.namedItem("offer");
    setError(offer, !offer || !offer.value.trim());

    const goal = form.querySelector('input[name="goal"]');
    const checkedGoal = form.querySelector('input[name="goal"]:checked');

    if (goal) {
      setError(goal, !checkedGoal);
    }

    if (!valid) {
      form.querySelector(".has-error")?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }

    return valid;
  }

  form.addEventListener("submit", async event => {
    event.preventDefault();

    if (!validate()) return;

    btn.classList.add("is-loading");

    const buttonText = btn.querySelector(".book__btn-text");

    if (buttonText) buttonText.textContent = "Booking…";

    const data = new URLSearchParams(new FormData(form));

    data.set("whatsapp", "+91" + phone.value);

    const instagram = form.elements.namedItem("instagram");

    if (instagram) {
      data.set("instagram", instagram.value.replace(/^@/, ""));
    }

    data.set("timestamp", new Date().toLocaleString("en-IN"));
    data.set("page", location.href);

    new URLSearchParams(location.search).forEach((value, key) => {
      if (key.startsWith("utm_") || key === "fbclid") {
        data.set(key, value);
      }
    });

    try {
      if (FORM_CONFIG.endpoint) {
        await fetch(FORM_CONFIG.endpoint, {
          method: "POST",
          mode: "no-cors",
          body: data
        });
      }

      if (
        FORM_CONFIG.metaPixelEvent &&
        typeof window.fbq === "function"
      ) {
        window.fbq("track", FORM_CONFIG.metaPixelEvent);
      }
    } catch (error) {
      // Keep the form usable even if the endpoint request fails.
    }

    const nameField = form.elements.namedItem("name");
    const name = nameField ? nameField.value.trim() : "";

    const query = new URLSearchParams({ name });

    setTimeout(() => {
      const separator = FORM_CONFIG.redirect.includes("?") ? "&" : "?";
      location.href = FORM_CONFIG.redirect + separator + query.toString();
    }, 400);
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll("#book .reveal").forEach(el => {
      observer.observe(el);
    });
  }
})();


/* =========================================================
   STICKY CTA — SHOW AFTER HERO, HIDE ON BOOKING FORM
   ========================================================= */

(function () {
  const bar = document.getElementById("stickyCta");
  const hero = document.getElementById("hero");
  const book = document.getElementById("book");

  if (!bar || !hero || !book) return;

  let pastHero = false;
  let onForm = false;

  const updateStickyCTA = () => {
    bar.classList.toggle("is-show", pastHero && !onForm);
  };

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      pastHero = !entry.isIntersecting;
      updateStickyCTA();
    }).observe(hero);

    new IntersectionObserver(([entry]) => {
      onForm = entry.isIntersecting;
      updateStickyCTA();
    }, { threshold: 0.1 }).observe(book);
  }
})();
