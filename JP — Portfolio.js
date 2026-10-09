var root = document.documentElement;
document.getElementById("theme").onclick = function () {
  root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
};
document.querySelectorAll(".proj>button").forEach(function (b) {
  b.onclick = function () {
    var p = b.parentNode,
      o = p.classList.toggle("open");
    b.setAttribute("aria-expanded", o);
  };
});
document.querySelectorAll(".chip").forEach(function (c) {
  c.onclick = function () {
    document.querySelectorAll(".chip").forEach(function (x) {
      x.setAttribute("aria-pressed", x === c);
    });
    var f = c.dataset.f;
    document.querySelectorAll(".proj").forEach(function (p) {
      p.hidden = !(f === "all" || p.dataset.c.split(" ").indexOf(f) > -1);
    });
  };
});
var links = document.querySelectorAll("nav a.link");
var io = new IntersectionObserver(
  function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) {
        links.forEach(function (l) {
          l.classList.toggle(
            "on",
            l.getAttribute("href") === "#" + e.target.id,
          );
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" },
);
document.querySelectorAll("section").forEach(function (s) {
  io.observe(s);
});
document.getElementById("copy").onclick = function () {
  var b = this;
  function done() {
    b.textContent = "Copied";
    setTimeout(function () {
      b.textContent = "Copy email address";
    }, 1800);
  }
  try {
    navigator.clipboard.writeText("hello@example.com").then(done, function () {
      b.textContent = "hello@example.com";
    });
  } catch (e) {
    b.textContent = "hello@example.com";
  }
};

var rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
var bar = document.getElementById("bar"),
  glow = document.getElementById("glow");
addEventListener(
  "scroll",
  function () {
    var h = document.body.scrollHeight - innerHeight;
    bar.style.transform = "scaleX(" + (h > 0 ? scrollY / h : 0) + ")";
  },
  { passive: true },
);
var blobs = document.querySelectorAll(".blob");
addEventListener("pointermove", function (e) {
  glow.style.transform = "translate(" + e.clientX + "px," + e.clientY + "px)";
  var x = e.clientX / innerWidth - 0.5,
    y = e.clientY / innerHeight - 0.5;
  blobs.forEach(function (b, i) {
    var k = (i + 1) * 40;
    b.style.setProperty("--px", x * k + "px");
    b.style.setProperty("--py", y * k + "px");
  });
});
glow.style.left = glow.style.top = "0";
var words = [
    "websites.",
    "JavaScript apps.",
    "full-stack projects.",
    "software that lasts.",
  ],
  wi = 0,
  ci = 0,
  del = false,
  t = document.getElementById("type");
function tick() {
  var w = words[wi];
  if (rm) {
    t.textContent = w;
    return;
  }
  t.textContent = w.slice(0, ci);
  if (!del && ci === w.length) {
    del = true;
    return setTimeout(tick, 1600);
  }
  if (del && ci === 0) {
    del = false;
    wi = (wi + 1) % words.length;
  }
  ci += del ? -1 : 1;
  setTimeout(tick, del ? 40 : 90);
}
tick();
var rio = new IntersectionObserver(
  function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      rio.unobserve(e.target);
      e.target.classList.add("in");
      if (e.target.classList.contains("stat"))
        count(e.target.querySelector("b"));
    });
  },
  { threshold: 0.15 },
);
document
  .querySelectorAll("h2,.lead,.row,.stat,.proj,.bar,.chips")
  .forEach(function (el, i) {
    el.style.setProperty("--d", (i % 4) * 0.09 + "s");
    el.classList.add("rv");
    rio.observe(el);
  });
function count(el) {
  var n = +el.dataset.n,
    s = performance.now();
  (function f(now) {
    var p = Math.min((now - s) / 1400, 1);
    el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(f);
  })(s);
}
document.querySelectorAll(".proj").forEach(function (p) {
  p.addEventListener("pointermove", function (e) {
    if (rm) return;
    var r = p.getBoundingClientRect();
    p.style.setProperty(
      "--ry",
      ((e.clientX - r.left) / r.width - 0.5) * 6 + "deg",
    );
    p.style.setProperty(
      "--rx",
      -((e.clientY - r.top) / r.height - 0.5) * 6 + "deg",
    );
  });
  p.addEventListener("pointerleave", function () {
    p.style.setProperty("--rx", "0deg");
    p.style.setProperty("--ry", "0deg");
  });
});
document.querySelectorAll(".chip").forEach(function (c) {
  c.addEventListener("click", function () {
    document.querySelectorAll(".proj").forEach(function (p, i) {
      p.classList.remove("pop");
      if (!p.hidden) {
        void p.offsetWidth;
        p.style.animationDelay = i * 0.07 + "s";
        p.classList.add("pop");
      }
    });
  });
});
document.querySelectorAll(".mag").forEach(function (b) {
  b.addEventListener("pointermove", function (e) {
    if (rm) return;
    var r = b.getBoundingClientRect();
    b.style.transform =
      "translate(" +
      (e.clientX - r.left - r.width / 2) * 0.2 +
      "px," +
      (e.clientY - r.top - r.height / 2) * 0.3 +
      "px)";
  });
  b.addEventListener("pointerleave", function () {
    b.style.transform = "";
  });
});
function confetti(el) {
  if (rm) return;
  var r = el.getBoundingClientRect(),
    cs = ["#7e35c8", "#4a1a80", "#2a0f4a", "#b060e0", "#e04bd6"];
  for (var i = 0; i < 28; i++) {
    var d = document.createElement("span");
    d.className = "conf";
    d.style.background = cs[i % 5];
    d.style.left = r.left + r.width / 2 + "px";
    d.style.top = r.top + "px";
    document.body.appendChild(d);
    var a = Math.random() * Math.PI - Math.PI,
      v = 80 + Math.random() * 120;
    d.animate(
      [
        { transform: "translate(0,0) rotate(0)", opacity: 1 },
        {
          transform:
            "translate(" +
            Math.cos(a) * v +
            "px," +
            (Math.sin(a) * v + 160) +
            "px) rotate(" +
            Math.random() * 720 +
            "deg)",
          opacity: 0,
        },
      ],
      {
        duration: 1000 + Math.random() * 500,
        easing: "cubic-bezier(.2,.6,.4,1)",
      },
    ).onfinish = (function (n) {
      return function () {
        n.remove();
      };
    })(d);
  }
}
document.getElementById("copy").addEventListener("click", function () {
  confetti(this);
});

var slides = [].slice.call(document.querySelectorAll(".slide")),
  trk = document.querySelector(".trk"),
  dots = document.querySelector(".dots"),
  car = document.querySelector(".car"),
  ci2 = 0,
  paused = false;
function vis() {
  return slides.filter(function (x) {
    return !x.hidden;
  });
}
function go(n) {
  var v = vis();
  if (!v.length) return;
  ci2 = (n + v.length) % v.length;
  trk.style.transform = "translateX(-" + ci2 * 100 + "%)";
  v.forEach(function (x, k) {
    x.classList.toggle("act", k === ci2);
  });
  [].forEach.call(dots.children, function (d, k) {
    d.setAttribute("aria-current", k === ci2);
  });
}
function build() {
  dots.innerHTML = "";
  vis().forEach(function (x, k) {
    var b = document.createElement("button");
    b.setAttribute("aria-label", "Project " + (k + 1));
    b.onclick = function () {
      go(k);
    };
    dots.appendChild(b);
  });
  go(0);
}
document.querySelector(".prev").onclick = function () {
  go(ci2 - 1);
};
document.querySelector(".next").onclick = function () {
  go(ci2 + 1);
};
document.querySelectorAll(".chip").forEach(function (c) {
  c.addEventListener("click", function () {
    var f = c.dataset.f;
    slides.forEach(function (x) {
      x.hidden = !(f === "all" || x.dataset.c.split(" ").indexOf(f) > -1);
    });
    build();
  });
});
car.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") go(ci2 - 1);
  if (e.key === "ArrowRight") go(ci2 + 1);
});
var sx = null;
car.addEventListener("pointerdown", function (e) {
  sx = e.clientX;
});
car.addEventListener("pointerup", function (e) {
  if (sx !== null && Math.abs(e.clientX - sx) > 50)
    go(ci2 + (e.clientX < sx ? 1 : -1));
  sx = null;
});
car.addEventListener("pointerenter", function () {
  paused = true;
});
car.addEventListener("pointerleave", function () {
  paused = false;
});
car.addEventListener("focusin", function () {
  paused = true;
});
car.addEventListener("focusout", function () {
  paused = false;
});
if (!rm)
  setInterval(function () {
    if (!paused && !document.hidden) go(ci2 + 1);
  }, 5000);
build();

(function () {
  var host = document.getElementById("web"),
    NS = "http://www.w3.org/2000/svg",
    CX = 380,
    CY = 310,
    wrap = host.parentNode,
    tip = document.createElement("div");
  tip.className = "wcard";
  tip.setAttribute("role", "tooltip");
  wrap.appendChild(tip);
  function el(n, at, par) {
    var e = document.createElementNS(NS, n);
    for (var k in at) e.setAttribute(k, at[k]);
    if (par) par.appendChild(e);
    return e;
  }
  var G = [
    {
      n: "Web development",
      a: -90,
      off: [-42, -14, 14, 42],
      k: [
        [
          "HTML",
          70,
          "Foundation",
          "Forms, inputs, buttons and IDs, plus connecting JavaScript to the page.",
        ],
        [
          "CSS",
          65,
          "Foundation",
          "Layout and styling for clean, readable pages.",
        ],
        [
          "JavaScript",
          45,
          "Learning",
          "My main focus right now: variables, functions, arrays, objects, map, filter, reduce, the DOM and events.",
        ],
        [
          "SQL",
          60,
          "Comfortable",
          "Creating tables, importing dumps and working with relational data in MariaDB.",
        ],
      ],
    },
    {
      n: "Foundations",
      a: 30,
      off: [-42, -14, 14, 42],
      k: [
        [
          "Python",
          30,
          "Exposure",
          "Some prior exposure. It becomes a major language later, for the ML and AI stage.",
        ],
        [
          "Java",
          25,
          "Exposure",
          "Prior exposure, possibly a secondary language later.",
        ],
        ["C", 20, "Exposure", "Prior exposure from coursework."],
        [
          "Debugging",
          50,
          "Developing",
          "Tracing bugs in my own functions and asking why code behaves the way it does, not only whether it runs.",
        ],
      ],
    },
    {
      n: "Workflow",
      a: 150,
      off: [-28, 0, 28],
      k: [
        [
          "Version control",
          45,
          "Basics",
          "Git on Windows and in VS Code: cloning repositories, committing and reading history.",
        ],
        [
          "Database design",
          65,
          "Comfortable",
          "Relational table design with primary and foreign keys, written in SQL and built in MariaDB.",
        ],
        [
          "Network labs",
          45,
          "Hands-on",
          "An isolated VirtualBox lab with Kali Linux: Nmap scans, service discovery and Wireshark.",
        ],
      ],
    },
  ];
  var X = [
    ["HTML", "CSS"],
    ["CSS", "JavaScript"],
    ["HTML", "JavaScript"],
    ["JavaScript", "Debugging"],
    ["SQL", "Database design"],
    ["SQL", "JavaScript"],
    ["JavaScript", "Version control"],
    ["Python", "Debugging"],
    ["Java", "C"],
    ["Debugging", "Version control"],
    ["Python", "SQL"],
  ];
  var svg = el(
    "svg",
    {
      viewBox: "0 0 760 620",
      class: "webs",
      role: "group",
      "aria-label": "Skill web",
    },
    host,
  );
  var rg = el("g", {}, svg),
    lg = el("g", {}, svg),
    ng = el("g", {}, svg);

  var nodes = {},
    list = [],
    links = [];
  function mk(id, type, x, y, data) {
    var g = el("g", { class: "nd2 " + type }, ng),
      n = {
        id: id,
        type: type,
        x0: x,
        y0: y,
        x: x,
        y: y,
        g: g,
        data: data,
        s: 0.6 + Math.random() * 0.6,
        p: Math.random() * 6.28,
        am: type === "root" ? 0 : 4 + Math.random() * 4,
      };
    var q = Math.atan2(y - CY, x - CX);
    if (type === "root") {
      el("circle", { r: 30, class: "rc" }, g);
      var t = el("text", { class: "rt2", "text-anchor": "middle", dy: 5 }, g);
      t.textContent = "JP";
    } else if (type === "hub") {
      var w = id.length * 8.6 + 30;
      el(
        "rect",
        { x: -w / 2, y: -17, width: w, height: 34, rx: 17, class: "hr" },
        g,
      );
      var t2 = el("text", { class: "ht2", "text-anchor": "middle", dy: 5 }, g);
      t2.textContent = id;
    } else {
      el("circle", { r: 18, class: "hit" }, g);
      el("circle", { r: 5 + (data[1] / 100) * 8, class: "lc" }, g);
      var c = Math.cos(q),
        sn = Math.sin(q),
        rr = 5 + (data[1] / 100) * 8 + 10,
        an = c > 0.35 ? "start" : c < -0.35 ? "end" : "middle",
        t3 = el(
          "text",
          {
            x: c * rr,
            y: sn * rr + (an === "middle" ? (sn > 0 ? 12 : -2) : 4),
            class: "lt",
            "text-anchor": an,
          },
          g,
        );
      t3.textContent = id;
      g.setAttribute("tabindex", "0");
      g.setAttribute("aria-label", id + ", " + data[2]);
    }
    nodes[id] = n;
    list.push(n);
    return n;
  }
  var root = mk("JP", "root", CX, CY);
  G.forEach(function (gr) {
    var ha = (gr.a * Math.PI) / 180,
      hub = mk(gr.n, "hub", CX + 120 * Math.cos(ha), CY + 120 * Math.sin(ha));
    links.push({ a: root, b: hub, c: "root" });
    gr.k.forEach(function (k, i) {
      var la = ((gr.a + gr.off[i]) * Math.PI) / 180,
        lf = mk(
          k[0],
          "leaf",
          CX + 235 * Math.cos(la),
          CY + 235 * Math.sin(la),
          k,
        );
      links.push({ a: hub, b: lf, c: "hub" });
    });
  });
  X.forEach(function (p) {
    links.push({ a: nodes[p[0]], b: nodes[p[1]], c: "x" });
  });
  links.forEach(function (l, i) {
    l.e = el("path", { class: "lnk " + l.c, fill: "none" }, lg);
    l.e.style.setProperty("--d", (i % 12) * 0.05 + "s");
  });
  list.forEach(function (n, i) {
    n.g.style.setProperty("--d", (i % 10) * 0.06 + "s");
  });
  function pos() {
    list.forEach(function (n) {
      n.g.setAttribute(
        "transform",
        "translate(" + n.x.toFixed(1) + " " + n.y.toFixed(1) + ")",
      );
    });
    links.forEach(function (l) {
      var a = l.a,
        b = l.b,
        dd;
      if (l.c === "x") {
        var mx = (a.x + b.x) / 2,
          my = (a.y + b.y) / 2;
        dd =
          "M" +
          a.x.toFixed(1) +
          " " +
          a.y.toFixed(1) +
          " Q" +
          (mx + (CX - mx) * 0.4).toFixed(1) +
          " " +
          (my + (CY - my) * 0.4).toFixed(1) +
          " " +
          b.x.toFixed(1) +
          " " +
          b.y.toFixed(1);
      } else
        dd =
          "M" +
          a.x.toFixed(1) +
          " " +
          a.y.toFixed(1) +
          " L" +
          b.x.toFixed(1) +
          " " +
          b.y.toFixed(1);
      l.e.setAttribute("d", dd);
    });
  }
  pos();
  function clear() {
    host.classList.remove("dim");
    host.querySelectorAll(".hl").forEach(function (e) {
      e.classList.remove("hl");
    });
    tip.classList.remove("show");
  }
  function show(n) {
    host.classList.add("dim");
    n.g.classList.add("hl");
    links.forEach(function (l) {
      if (l.a === n || l.b === n) {
        l.e.classList.add("hl");
        l.a.g.classList.add("hl");
        l.b.g.classList.add("hl");
      }
    });
    if (!n.data) return;
    tip.innerHTML = "";
    var b = document.createElement("b");
    b.textContent = n.id;
    var sm = document.createElement("small");
    sm.textContent = n.data[2];
    var bar = document.createElement("div");
    bar.className = "dm";
    var i = document.createElement("i");
    bar.appendChild(i);
    var p = document.createElement("p");
    p.textContent = n.data[3];
    tip.appendChild(b);
    tip.appendChild(sm);
    tip.appendChild(bar);
    tip.appendChild(p);
    if (innerWidth <= 700) {
      tip.style.left = tip.style.top = "";
      tip.classList.add("show");
    } else {
      var wr = wrap.getBoundingClientRect(),
        w = tip.offsetWidth,
        h = tip.offsetHeight,
        nr = n.g.getBoundingClientRect(),
        ncx = nr.left + nr.width / 2 - wr.left,
        ncy = nr.top + nr.height / 2 - wr.top,
        best = null;
      [
        [8, 8],
        [wr.width - w - 8, 8],
        [8, wr.height - h - 8],
        [wr.width - w - 8, wr.height - h - 8],
      ].forEach(function (c) {
        var ov = 0;
        list.forEach(function (o) {
          var b = o.g.getBoundingClientRect(),
            bx = b.left - wr.left,
            by = b.top - wr.top,
            ix = Math.max(
              0,
              Math.min(c[0] + w, bx + b.width) - Math.max(c[0], bx),
            ),
            iy = Math.max(
              0,
              Math.min(c[1] + h, by + b.height) - Math.max(c[1], by),
            );
          ov += ix * iy;
        });
        var sc = ov * 1000 - Math.hypot(c[0] + w / 2 - ncx, c[1] + h / 2 - ncy);
        if (!best || sc < best.s) best = { x: c[0], y: c[1], s: sc };
      });
      tip.style.left = best.x + "px";
      tip.style.top = best.y + "px";
      tip.classList.add("show");
    }
    requestAnimationFrame(function () {
      i.style.width = n.data[1] + "%";
    });
  }
  list.forEach(function (n) {
    n.g.addEventListener("pointerenter", function (e) {
      if (e.pointerType === "mouse") {
        clear();
        show(n);
      }
    });
    n.g.addEventListener("pointerleave", function (e) {
      if (e.pointerType === "mouse") clear();
    });
    n.g.addEventListener("focus", function () {
      clear();
      show(n);
    });
    n.g.addEventListener("blur", clear);
    n.g.addEventListener("click", function () {
      clear();
      show(n);
    });
  });
  document.addEventListener("pointerdown", function (e) {
    if (!e.target.closest(".nd2")) clear();
  });
  addEventListener(
    "scroll",
    function () {
      tip.classList.remove("show");
    },
    { passive: true },
  );
  var vis = false;
  new IntersectionObserver(
    function (es) {
      vis = es[0].isIntersecting;
      if (vis && host.classList.contains("wait")) {
        host.classList.remove("wait");
        host.classList.add("go");
      }
    },
    { threshold: 0.2 },
  ).observe(host);
  if (rm) {
    host.classList.remove("wait");
  }
  function loop(t) {
    if (!rm && vis && !document.hidden) {
      list.forEach(function (n) {
        n.x = n.x0 + Math.sin((t / 1400) * n.s + n.p) * n.am;
        n.y = n.y0 + Math.cos((t / 1700) * n.s + n.p) * n.am;
      });
      pos();
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();

(function () {
  var c = document.getElementById("bg"),
    x = c.getContext("2d"),
    W,
    H,
    P = [],
    m = { x: -999, y: -999 },
    dpr = Math.min(devicePixelRatio || 1, 2);
  function mk() {
    var vx = (Math.random() - 0.5) * 0.35,
      vy = (Math.random() - 0.5) * 0.35;
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: vx,
      vy: vy,
      bx: vx,
      by: vy,
      r: Math.random() * 1.6 + 0.6,
      z: Math.random() * 0.25 + 0.05,
    };
  }
  function size() {
    W = innerWidth;
    H = innerHeight;
    c.width = W * dpr;
    c.height = H * dpr;
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.min(95, Math.round((W * H) / 15000));
    while (P.length < n) P.push(mk());
    P.length = n;
  }
  size();
  addEventListener("resize", size);
  addEventListener("pointermove", function (e) {
    m.x = e.clientX;
    m.y = e.clientY;
  });
  addEventListener("pointerleave", function () {
    m.x = m.y = -999;
  });
  addEventListener("pointerdown", function (e) {
    P.forEach(function (p) {
      var dx = p.x - e.clientX,
        dy = p.y - e.clientY,
        d = Math.sqrt(dx * dx + dy * dy) || 1;
      if (d < 260) {
        var f = ((260 - d) / 260) * 4;
        p.vx += (dx / d) * f;
        p.vy += (dy / d) * f;
      }
    });
  });
  function draw() {
    x.clearRect(0, 0, W, H);
    var L = root.dataset.theme === "light",
      sy = scrollY,
      pts = [];
    P.forEach(function (p) {
      p.vx += (p.bx - p.vx) * 0.02;
      p.vy += (p.by - p.vy) * 0.02;
      var yy = (((p.y - sy * p.z) % H) + H) % H,
        dx = p.x - m.x,
        dy = yy - m.y,
        d = Math.sqrt(dx * dx + dy * dy);
      if (d < 150 && d > 0) {
        var f = ((150 - d) / 150) * 0.5;
        p.vx += (dx / d) * f * 0.1;
        p.vy += (dy / d) * f * 0.1;
      }
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x += W;
      if (p.x > W) p.x -= W;
      if (p.y < 0) p.y += H;
      if (p.y > H) p.y -= H;
      pts.push([p.x, yy, p.r, d]);
    });
    for (var i = 0; i < pts.length; i++) {
      var a = pts[i];
      for (var j = i + 1; j < pts.length; j++) {
        var b = pts[j],
          dx = a[0] - b[0],
          dy = a[1] - b[1],
          d2 = dx * dx + dy * dy;
        if (d2 < 14400) {
          x.strokeStyle =
            (L ? "rgba(40,100,230," : "rgba(138,92,240,") +
            (1 - Math.sqrt(d2) / 120) * 0.35 +
            ")";
          x.lineWidth = 1;
          x.beginPath();
          x.moveTo(a[0], a[1]);
          x.lineTo(b[0], b[1]);
          x.stroke();
        }
      }
      if (a[3] < 180) {
        x.strokeStyle =
          (L ? "rgba(58,141,255," : "rgba(224,75,214,") +
          (1 - a[3] / 180) * 0.7 +
          ")";
        x.lineWidth = 1.2;
        x.beginPath();
        x.moveTo(a[0], a[1]);
        x.lineTo(m.x, m.y);
        x.stroke();
      }
      x.fillStyle =
        a[3] < 150
          ? L
            ? "rgba(58,141,255,.9)"
            : "rgba(224,75,214,.9)"
          : L
            ? "rgba(40,100,230,.65)"
            : "rgba(170,125,255,.75)";
      x.beginPath();
      x.arc(a[0], a[1], a[3] < 150 ? a[2] + 1 : a[2], 0, 6.283);
      x.fill();
    }
  }
  function loop() {
    if (!document.hidden) draw();
    requestAnimationFrame(loop);
  }
  if (rm) draw();
  else loop();
})();

document.querySelectorAll("#tools h2,#tools .lead").forEach(function (el, i) {
  el.style.setProperty("--d", (i % 6) * 0.07 + "s");
  el.classList.add("rv");
  rio.observe(el);
});

(function () {
  var box = document.querySelector(".tgrid"),
    items = [].slice.call(document.querySelectorAll(".tc")),
    B = [],
    R = 50,
    vis = true,
    cur = null;
  function dim() {
    return { W: box.clientWidth, H: box.clientHeight };
  }
  function find(t) {
    for (var i = 0; i < B.length; i++) if (B[i].t === t) return B[i];
  }
  function draw() {
    B.forEach(function (b) {
      b.t.style.transform =
        "translate(" + b.x.toFixed(1) + "px," + b.y.toFixed(1) + "px)";
    });
  }
  function place() {
    var z = dim(),
      m = innerWidth <= 560,
      cols = m ? 2 : 4,
      rows = m ? 5 : 3,
      cells = [];
    for (var r = 0; r < rows; r++)
      for (var c = 0; c < cols; c++) cells.push([c, r]);
    cells.sort(function () {
      return Math.random() - 0.5;
    });
    B = items.map(function (t, i) {
      var w = t.offsetWidth || 130,
        h = t.offsetHeight || 105,
        cell = cells[i % cells.length],
        a = Math.random() * 6.283,
        sp = rm ? 0 : 0.25 + Math.random() * 0.35;
      return {
        t: t,
        w: w,
        h: h,
        d: false,
        x: ((cell[0] + 0.1 + Math.random() * 0.8) / cols) * (z.W - w),
        y: ((cell[1] + 0.1 + Math.random() * 0.8) / rows) * (z.H - h),
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
      };
    });
    cur = m;
    draw();
  }
  function walls(b, z) {
    if (b.x < 0) {
      b.x = 0;
      b.vx = Math.abs(b.vx) * 0.8;
    }
    if (b.x > z.W - b.w) {
      b.x = z.W - b.w;
      b.vx = -Math.abs(b.vx) * 0.8;
    }
    if (b.y < 0) {
      b.y = 0;
      b.vy = Math.abs(b.vy) * 0.8;
    }
    if (b.y > z.H - b.h) {
      b.y = z.H - b.h;
      b.vy = -Math.abs(b.vy) * 0.8;
    }
  }
  function step() {
    var z = dim();
    B.forEach(function (b) {
      if (b.d) return;
      b.x += b.vx;
      b.y += b.vy;
      b.vx *= 0.996;
      b.vy *= 0.996;
      var sp = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
      if (!rm && sp < 0.2) {
        b.vx += (Math.random() - 0.5) * 0.06;
        b.vy += (Math.random() - 0.5) * 0.06;
      }
      if (sp > 9) {
        b.vx *= 9 / sp;
        b.vy *= 9 / sp;
      }
    });
    for (var i = 0; i < B.length; i++)
      for (var j = i + 1; j < B.length; j++) {
        var a = B[i],
          c = B[j];
        if (a.d && c.d) continue;
        var dx = c.x + c.w / 2 - (a.x + a.w / 2),
          dy = c.y + c.h / 2 - (a.y + a.h / 2),
          d = Math.sqrt(dx * dx + dy * dy);
        if (d >= 2 * R || d === 0) continue;
        var nx = dx / d,
          ny = dy / d,
          ov = 2 * R - d,
          vn = (c.vx - a.vx) * nx + (c.vy - a.vy) * ny;
        if (a.d) {
          c.x += nx * ov;
          c.y += ny * ov;
          if (vn < 0) {
            c.vx -= 1.8 * vn * nx;
            c.vy -= 1.8 * vn * ny;
          }
        } else if (c.d) {
          a.x -= nx * ov;
          a.y -= ny * ov;
          if (vn < 0) {
            a.vx += 1.8 * vn * nx;
            a.vy += 1.8 * vn * ny;
          }
        } else {
          a.x -= (nx * ov) / 2;
          a.y -= (ny * ov) / 2;
          c.x += (nx * ov) / 2;
          c.y += (ny * ov) / 2;
          if (vn < 0) {
            var k = (-1.9 * vn) / 2;
            a.vx -= k * nx;
            a.vy -= k * ny;
            c.vx += k * nx;
            c.vy += k * ny;
          }
        }
      }
    B.forEach(function (b) {
      if (!b.d) walls(b, z);
    });
  }
  items.forEach(function (t) {
    var ox = 0,
      oy = 0;
    t.addEventListener("pointerdown", function (e) {
      var b = find(t),
        r = box.getBoundingClientRect();
      if (!b) return;
      t.setPointerCapture(e.pointerId);
      b.d = true;
      b.vx = b.vy = 0;
      t.classList.add("drag");
      ox = e.clientX - r.left - b.x;
      oy = e.clientY - r.top - b.y;
      e.preventDefault();
    });
    t.addEventListener("pointermove", function (e) {
      var b = find(t);
      if (!b || !b.d) return;
      var r = box.getBoundingClientRect(),
        z = dim(),
        nx = Math.max(0, Math.min(z.W - b.w, e.clientX - r.left - ox)),
        ny = Math.max(0, Math.min(z.H - b.h, e.clientY - r.top - oy));
      b.vx = 0.6 * (nx - b.x) + 0.4 * b.vx;
      b.vy = 0.6 * (ny - b.y) + 0.4 * b.vy;
      b.x = nx;
      b.y = ny;
    });
    function up() {
      var b = find(t);
      if (!b) return;
      b.d = false;
      t.classList.remove("drag");
      var sp = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
      if (sp > 9) {
        b.vx *= 9 / sp;
        b.vy *= 9 / sp;
      }
    }
    t.addEventListener("pointerup", up);
    t.addEventListener("pointercancel", up);
  });
  new IntersectionObserver(
    function (es) {
      vis = es[0].isIntersecting;
    },
    { rootMargin: "100px" },
  ).observe(box);
  function loop() {
    if (vis && !document.hidden) step();
    draw();
    requestAnimationFrame(loop);
  }
  place();
  loop();
  addEventListener("resize", function () {
    if (innerWidth <= 560 !== cur) place();
    else {
      var z = dim();
      B.forEach(function (b) {
        walls(b, z);
      });
    }
  });
})();
