document.addEventListener("DOMContentLoaded", function () {
  // Mobile navigation
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }

  // Category filter
  const tabs = document.querySelectorAll(".cat-tab");
  const cards = document.querySelectorAll(".product-card");
  if (tabs.length && cards.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) {
          t.classList.remove("active");
        });
        tab.classList.add("active");

        const filter = tab.getAttribute("data-filter");
        const newUrl = filter === "all" ? "products.html" : "products.html?cat=" + filter;
        history.replaceState(null, "", newUrl);
        cards.forEach(function (card) {
          const match =
            filter === "all" || card.getAttribute("data-cat") === filter;
          card.classList.toggle("hidden", !match);
          if (match) {
            card.style.animation = "none";
            void card.offsetWidth;
            card.style.animation = "";
          }
        });
      });
    });

    // Auto-filter from URL (?cat=pvc / woven / neoprene ...)
    const qs = new URLSearchParams(window.location.search);
    const qCat = qs.get("cat");
    if (qCat) {
      tabs.forEach(function (tab) {
        if (tab.getAttribute("data-filter") === qCat) {
          tab.click();
        }
      });
    }
  }

  // Quote form — sends enquiry to info@bestrims.com.hk
  const form = document.querySelector(".quote-form form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const company = document.getElementById("company").value;
      const email = document.getElementById("email").value;
      const country = document.getElementById("country").value;
      const category = document.getElementById("category").value;
      const qty = document.getElementById("qty").value;
      const message = document.getElementById("message").value;
      const artwork = document.getElementById("artwork");
      const note = document.querySelector(".form-note");
      let fileLine = "";
      if (artwork && artwork.files && artwork.files.length > 0) {
        const file = artwork.files[0];
        const ext = file.name.split(".").pop().toLowerCase();
        const okTypes = ["ai", "pdf", "png"];
        if (file.size > 5 * 1024 * 1024) {
          if (note) { note.textContent = "File too large — maximum 5MB. Please choose a smaller file."; note.style.color = "#e82635"; }
          return;
        }
        if (okTypes.indexOf(ext) === -1) {
          if (note) { note.textContent = "Please upload an AI, PDF or PNG file."; note.style.color = "#e82635"; }
          return;
        }
        fileLine = "\\nArtwork file: " + file.name + " (please attach this file in your email)";
      }
      const subject = "Website enquiry — " + (name || "New lead");
      const body = "Name: " + name + "\\nCompany: " + company + "\\nEmail: " + email + "\\nCountry: " + country + "\\nProduct category: " + category + "\\nEstimated quantity: " + qty + fileLine + "\\n\\nProject details:\\n" + message;
      const mailto = "mailto:info@bestrims.com.hk?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      window.location.href = mailto;
      if (note) {
        note.textContent = fileLine ? "Your email app will open — please attach the artwork file, then press send to info@bestrims.com.hk." : "Your email app will open — press send to complete your enquiry to info@bestrims.com.hk.";
        note.style.color = "#e82635";
      }
    });
  }


  // Quote form - remove uploaded file
  const artworkInput = document.getElementById("artwork");
  const removeBtn = document.getElementById("removeArtwork");
  if (artworkInput && removeBtn) {
    artworkInput.addEventListener("change", function () {
      removeBtn.style.display = artworkInput.files.length > 0 ? "inline-block" : "none";
    });
    removeBtn.addEventListener("click", function () {
      artworkInput.value = "";
      removeBtn.style.display = "none";
      const note = document.querySelector(".form-note");
      if (note) {
        note.textContent = "Your enquiry will be sent to info@bestrims.com.hk — we reply within 24 hours.";
        note.style.color = "";
      }
    });
  }
  // Company film player
  const film = document.getElementById("companyFilm");
  const playBtn = document.getElementById("filmPlay");
  if (film && playBtn) {
    playBtn.addEventListener("click", function () {
      film.play();
    });

    film.addEventListener("play", function () {
      playBtn.classList.add("hidden");
    });
    film.addEventListener("pause", function () {
      playBtn.classList.remove("hidden");
    });
    film.addEventListener("ended", function () {
      playBtn.classList.remove("hidden");
    });
  }

  // Product detail page gallery
  const qs = new URLSearchParams(window.location.search);
  const pCat = qs.get("cat");
  const pName = qs.get("name");
  if (pCat && pName) {
    const labels = {
      pvc: "PVC", silicone: "Silicone", injection: "Injection", neoprene: "Neoprene Bags",
      transfer: "Transfer", hf: "High Frequency", woven: "Woven"
    };
    const info = window.BESTRIMS_PRODUCTS || {
      "pvc|3d-pvc-motif": {
        title: "3D PVC Motif",
        desc: "A raised 3D PVC motif with full-colour detail, made to your artwork. Durable, washable and available with sew-on, iron-on or hook-and-loop backing.",
        specs: { Material: "PVC / TPU", Size: "Custom (sample 70mm shown)", Backing: "Sew-on / Iron-on / Velcro", MOQ: "Low MOQ (placeholder)", Sampling: "5-7 working days", "Lead time": "Confirm on order (placeholder)" }
      },
      "silicone|matte-logo-patch": {
        title: "Matte Logo Patch",
        desc: "Soft-touch matte silicone badge with crisp embossed logo. Ideal for sportswear and fashion branding, available in any Pantone colour.",
        specs: { Material: "Silicone", Size: "Custom", Backing: "Sew-on / Heat transfer", MOQ: "Low MOQ (placeholder)", Sampling: "5-7 working days", "Lead time": "Confirm on order (placeholder)" }
      },
      "injection|injection-puller": {
        title: "Injection Puller",
        desc: "Injection-moulded zipper puller and pendant with a clean, precise finish. Mould design and colour matching handled in-house.",
        specs: { Material: "Injection plastic", Size: "Custom (15mm shown)", Finish: "Gloss / Matte", MOQ: "Low MOQ (placeholder)", Sampling: "7-10 working days", "Lead time": "Confirm on order (placeholder)" }
      },
      "transfer|silicone-heat-transfer": {
        title: "Silicone Heat Transfer",
        desc: "Silicone heat transfer badge with strong adhesion and soft hand-feel. Perfect for sportswear, activewear and workwear.",
        specs: { Material: "Silicone film", Size: "Custom (60mm shown)", Adhesion: "Heat press application", MOQ: "Low MOQ (placeholder)", Sampling: "5-7 working days", "Lead time": "Confirm on order (placeholder)" }
      },
      "hf|hf-emblem": {
        title: "HF Emblem",
        desc: "High-frequency embossed emblem with defined relief and a premium edge finish. Available with stitching or clean-cut edges.",
        specs: { Material: "PU / TPU / PVC film", Size: "Custom", Finish: "Embossed / Foam / Stitched", MOQ: "Low MOQ (placeholder)", Sampling: "7-10 working days", "Lead time": "Confirm on order (placeholder)" }
      },
      "woven|twill-tape": {
        title: "Twill Tape",
        desc: "Woven twill tape and webbing in custom widths, colours and printed or woven branding. Strong, wash-resistant and made to spec.",
        specs: { Material: "Polyester / Nylon", Width: "Custom (8mm shown)", Finish: "Printed / Woven logo", MOQ: "Low MOQ (placeholder)", Sampling: "5-7 working days", "Lead time": "Confirm on order (placeholder)" }
      }
    };
    const key = pCat + "|" + pName;
    const d = info[key] || {
      title: pName.replace(/-/g, " "),
      desc: "Custom product made to your artwork. Contact us for specifications, MOQ and lead time.",
      specs: { Material: "To be confirmed", Size: "Custom", MOQ: "Low MOQ (placeholder)", Sampling: "On request", "Lead time": "Confirm on order (placeholder)" }
    };
    const label = labels[pCat] || pCat;
    const titleEl = document.getElementById("prodTitle");
    const kickerEl = document.getElementById("prodKicker");
    const descEl = document.getElementById("prodDesc");
    const crumbEl = document.getElementById("crumbCat");
    const mainImg = document.getElementById("mainImg");
    const thumbsEl = document.getElementById("thumbs");
    if (titleEl) titleEl.textContent = d.title;
    if (kickerEl) kickerEl.textContent = label;
    if (crumbEl) crumbEl.textContent = label;
    if (descEl) descEl.textContent = d.desc;

    const longEl = document.getElementById("longDesc");
    if (longEl) {
      const paras = d.longDesc || [d.desc];
      longEl.innerHTML = "";
      paras.forEach(function (p) {
        const el = document.createElement("p");
        el.textContent = p;
        longEl.appendChild(el);
      });
    }
    document.title = d.title + " - Bestrims Limited";
    const specBody = document.getElementById("specBody");
    if (specBody) {
      specBody.innerHTML = "";
      Object.keys(d.specs).forEach(function (k) {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        td1.textContent = k;
        const td2 = document.createElement("td");
        td2.textContent = d.specs[k];
        tr.appendChild(td1);
        tr.appendChild(td2);
        specBody.appendChild(tr);
      });
    }
    const folder = "assets/products/" + pCat + "/" + pName + "/";
    mainImg.src = folder + "1.webp";
    mainImg.alt = d.title;
    const totalImgs = d.imgs || 1;
    const thumbList = (d.thumbs && d.thumbs.length) ? d.thumbs : Array.from({ length: totalImgs }, function (_, n) { return n + 1; });
    thumbList.forEach(function (i) {
      const b = document.createElement("button");
      b.className = "thumb" + (i === 1 ? " active" : "");
      const im = document.createElement("img");
      im.src = folder + i + ".webp";
      im.alt = d.title + " photo " + i;
      b.appendChild(im);
      b.addEventListener("click", function () {
        mainImg.src = folder + i + ".webp";
        mainImg.alt = d.title + " photo " + i;
        document.querySelectorAll(".thumb").forEach(function (t) { t.classList.remove("active"); });
        b.classList.add("active");
      });
      thumbsEl.appendChild(b);
    });
  }




  // Promo video controls
  const promoVideo = document.getElementById("heroVideo");
  const videoPlayBtn = document.getElementById("videoPlayBtn");

  function playWithSound() {
    if (!promoVideo) return;
    // iPhone 要求：撳掣嗰一刻即刻 call play()，唔可以等載入先叫，否則會被拒
    promoVideo.muted = false;
    promoVideo.volume = 1;
    var pr = promoVideo.play();
    if (pr) { pr.catch(function () {}); }
  }

  var isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent || "");
  if (promoVideo) {
    if (isMobile) {
      // 手機：唔自動播，靠封面＋紅色掣，撳先播（最穩定，避免 iOS 自動播同開聲衝突）
      promoVideo.pause();
      promoVideo.muted = true;
    } else {
      // 桌面：靜音自動播放
      promoVideo.muted = true;
      var tryAuto = promoVideo.play();
      if (tryAuto) { tryAuto.catch(function () {}); }
    }
    // 要等影片「真正開始播」先收掣（play 事件只代表開始請求，唔代表已播放）
    promoVideo.addEventListener("playing", function () {
      if (videoPlayBtn) videoPlayBtn.classList.add("hidden");
    });
    promoVideo.addEventListener("pause", function () {
      if (!promoVideo.ended && videoPlayBtn) videoPlayBtn.classList.remove("hidden");
    });
    promoVideo.addEventListener("stalled", function () {
      if (videoPlayBtn) videoPlayBtn.classList.remove("hidden");
    });
    promoVideo.addEventListener("ended", function () {
      if (videoPlayBtn) videoPlayBtn.classList.remove("hidden");
    });
    promoVideo.addEventListener("error", function () {
      if (videoPlayBtn) videoPlayBtn.classList.remove("hidden");
    });
    promoVideo.addEventListener("click", function () {
      if (promoVideo.paused) playWithSound();
    });
  }
  if (videoPlayBtn) {
    videoPlayBtn.addEventListener("click", playWithSound);
  }
});
