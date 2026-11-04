(function () {
  const ROLE_KEYS = Object.keys(ROLES);
  const $ = (id) => document.getElementById(id);
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function storageGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function storageSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  // 역할: ?role= > 경로(/backend/ 등) > 저장값 > backend
  function initialRole() {
    if (ROLE_KEYS.includes(window.FIXED_ROLE)) return window.FIXED_ROLE;
    const q = new URLSearchParams(location.search).get("role");
    if (ROLE_KEYS.includes(q)) return q;
    const fromPath = ROLE_KEYS.find((k) => location.pathname.includes("/" + k));
    if (fromPath) return fromPath;
    const saved = storageGet("role");
    return ROLE_KEYS.includes(saved) ? saved : "backend";
  }

  function renderStatic() {
    const p = PROFILE;
    $("brand").textContent = p.name;
    document.title = p.name + " · Portfolio";
    $("footer").textContent = "© " + new Date().getFullYear() + " " + p.name;
    [$("githubBtn"), $("githubBtn2")].forEach((a) => (a.href = p.github));
    if ($("repoBtn")) $("repoBtn").href = p.github;
    $("mailBtn").href = "mailto:" + p.email;
    $("mailBtn").textContent = p.email;
    $("avatar").innerHTML = p.photo
      ? `<img src="${esc(p.photo)}" alt="${esc(p.name)}" />`
      : `<span>${esc(p.name.slice(0, 1))}</span>`;
    $("eduList").innerHTML = p.education
      .map((e) => `<li><strong>${esc(e.title)}</strong><span class="muted">${esc(e.sub)}</span></li>`)
      .join("");
    $("certList").innerHTML = p.certs.map((c) => `<li>${esc(c)}</li>`).join("");

    if (!$("roleSwitch")) return;
    $("roleSwitch").innerHTML = ROLE_KEYS.map(
      (k) => `<button role="tab" data-role="${k}">${esc(ROLES[k].label)}</button>`
    ).join("");
    $("roleSwitch").addEventListener("click", (e) => {
      const b = e.target.closest("button[data-role]");
      if (b) setRole(b.dataset.role, true);
    });
  }

  function caseHTML(c, open) {
    const metric = c.metric ? `<span class="case-metric">${esc(c.metric)}</span>` : "";
    return `
      <details class="case"${open ? " open" : ""}>
        <summary><span class="case-title">${esc(c.title)}</span>${metric}</summary>
        <dl class="case-body">
          <dt>문제</dt><dd>${esc(c.problem)}</dd>
          <dt>원인</dt><dd>${esc(c.cause)}</dd>
          <dt>해결</dt><dd>${esc(c.action)}</dd>
          <dt>결과</dt><dd class="result">${esc(c.result)}</dd>
        </dl>
      </details>`;
  }

  function projectHTML(key, role, idx) {
    const p = PROJECTS[key];
    const featuredIds = (ROLES[role].featured[key] || []);
    const byId = Object.fromEntries(p.cases.map((c) => [c.id, c]));
    const featured = featuredIds.map((id) => byId[id]).filter(Boolean);
    const rest = p.cases.filter((c) => !featuredIds.includes(c.id));

    const metrics = p.metrics
      .map((m) => `<div class="metric"><b>${esc(m.value)}</b><span>${esc(m.label)}</span></div>`)
      .join("");
    const flow = p.flow.length
      ? `<ol class="flow">${p.flow.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>`
      : "";
    const meta = [p.period, p.team].filter(Boolean).map(esc).join(" · ");

    const restBlock = rest.length
      ? `<details class="more"><summary>다른 트러블슈팅 ${rest.length}건 더 보기</summary>
           <div class="cases">${rest.map((c) => caseHTML(c, false)).join("")}</div></details>`
      : "";

    // 간략히: 요약·수치·스택 / 자세히: 역할·흐름·트러블슈팅·결과
    const brief = `
      <p class="summary">${esc(p.summary)}</p>
      <div class="metrics">${metrics}</div>
      <ul class="tags">${p.stack.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>`;

    const detail = `
      <div class="role-box"><span class="label">맡은 역할</span><p>${esc(p.role)}</p></div>
      ${flow}
      <h4 class="sub">트러블슈팅</h4>
      <div class="cases">${featured.map((c, i) => caseHTML(c, i === 0)).join("")}</div>
      ${restBlock}
      <h4 class="sub">결과</h4>
      <ul class="results">${p.results.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>`;

    const head = `
      <div class="proj-head">
        <span class="proj-idx">${String(idx + 1).padStart(2, "0")}</span>
        <div>
          <h3>${esc(p.title)} <small>${esc(p.subtitle)}</small></h3>
          ${meta ? `<p class="muted">${meta}</p>` : ""}
        </div>
      </div>`;

    return `
      <article class="project">
        ${head}${brief}
        <details class="proj-detail">
          <summary><span class="when-closed">자세히 보기 ▾</span><span class="when-open">간략히 보기 ▴</span></summary>
          <div class="proj-detail-body">${detail}</div>
        </details>
      </article>`;
  }

  function setRole(role, push) {
    const r = ROLES[role];
    document.body.dataset.role = role;
    if (push) {
      storageSet("role", role);
      const url = new URL(location.href);
      url.searchParams.set("role", role);
      history.replaceState(null, "", url);
    }
    document.querySelectorAll("#roleSwitch button").forEach((b) => {
      b.setAttribute("aria-selected", b.dataset.role === role);
    });

    $("eyebrow").textContent = r.eyebrow;
    $("tagline").innerHTML = esc(r.tagline).replace(/\n/g, "<br />");
    $("intro").textContent = r.intro;
    $("highlights").innerHTML = r.highlights
      .map((h) => `<div class="hl"><b>${esc(h.value)}</b><span>${esc(h.label)}</span></div>`)
      .join("");
    $("projectList").innerHTML = r.projectOrder.map((k, i) => projectHTML(k, role, i)).join("");
    $("skillGrid").innerHTML = r.skillOrder
      .map((k) => SKILLS[k])
      .map(
        (s, i) => `<div class="skill${i === 0 ? " lead" : ""}">
          <h3>${esc(s.title)}</h3>
          <ul>${s.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`
      )
      .join("");
  }

  function initTheme() {
    $("themeBtn").addEventListener("click", () => {
      const root = document.documentElement;
      const cur = root.dataset.theme ||
        (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      const next = cur === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      storageSet("theme", next);
    });
  }

  renderStatic();
  initTheme();
  setRole(initialRole(), false);
})();
