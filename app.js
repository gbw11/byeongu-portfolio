(function () {
  const $ = (id) => document.getElementById(id);
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function storageSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  let field = "all"; // 트러블슈팅 분야 필터
  const openProjects = new Set(); // 자세히 보기 펼친 프로젝트 (필터 변경 시 유지)

  function renderStatic() {
    const p = PROFILE;
    $("brand").textContent = p.name;
    document.title = p.name + " · Portfolio";
    $("footer").textContent = "© " + new Date().getFullYear() + " " + p.name;
    document.querySelectorAll(".gh-link").forEach((a) => (a.href = p.github));
    $("mailBtn").href = "mailto:" + p.email;
    $("mailBtn").textContent = p.email;
    $("avatar").innerHTML = p.photo
      ? `<img src="${esc(p.photo)}" alt="${esc(p.name)}" />`
      : `<span>${esc(p.name.slice(0, 1))}</span>`;
    $("eduList").innerHTML = p.education
      .map((e) => `<li><strong>${esc(e.title)}</strong><span class="muted">${esc(e.sub)}</span></li>`)
      .join("");
    $("certList").innerHTML = p.certs.map((c) => `<li>${esc(c)}</li>`).join("");

    const m = MAIN;
    $("eyebrow").textContent = m.eyebrow;
    $("tagline").innerHTML = esc(m.tagline).replace(/\n/g, "<br />");
    $("intro").textContent = m.intro;
    $("highlights").innerHTML = m.highlights
      .map((h) => `<div class="hl"><b>${esc(h.value)}</b><span>${esc(h.label)}</span></div>`)
      .join("");
    $("skillGrid").innerHTML = m.skillOrder
      .map((k) => SKILLS[k])
      .map(
        (s) => `<div class="skill">
          <h3>${esc(s.title)}</h3>
          <ul>${s.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`
      )
      .join("");

    const filters = [["all", "전체"]].concat(Object.entries(FIELDS));
    $("fieldFilter").innerHTML = filters
      .map(([k, label]) => `<button data-field="${k}">${esc(label)}</button>`)
      .join("");
    $("fieldFilter").addEventListener("click", (e) => {
      const b = e.target.closest("button[data-field]");
      if (!b) return;
      field = b.dataset.field;
      renderProjects();
    });
  }

  function caseHTML(c, open) {
    const metric = c.metric ? `<span class="case-metric">${esc(c.metric)}</span>` : "";
    const badges = c.tags
      .filter((t) => FIELDS[t])
      .map((t) => `<span class="badge b-${t}">${esc(FIELDS[t])}</span>`)
      .join("");
    return `
      <details class="case"${open ? " open" : ""}>
        <summary>
          <span class="case-title">${esc(c.title)}</span>
          <span class="case-side">${metric}${badges}</span>
        </summary>
        <dl class="case-body">
          <dt>문제</dt><dd>${esc(c.problem)}</dd>
          <dt>원인</dt><dd>${esc(c.cause)}</dd>
          <dt>해결</dt><dd>${esc(c.action)}</dd>
          <dt>결과</dt><dd class="result">${esc(c.result)}</dd>
        </dl>
      </details>`;
  }

  function casesBlock(key, p) {
    // 필터가 걸리면 해당 분야 사례를 모두 보이고, '전체'면 대표 사례 + 더 보기
    if (field !== "all") {
      const list = p.cases.filter((c) => c.tags.includes(field));
      if (!list.length) return `<p class="muted empty">이 프로젝트에는 ${esc(FIELDS[field])} 사례가 없습니다.</p>`;
      return `<div class="cases">${list.map((c) => caseHTML(c, false)).join("")}</div>`;
    }
    const ids = MAIN.featured[key] || [];
    const byId = Object.fromEntries(p.cases.map((c) => [c.id, c]));
    const featured = ids.map((id) => byId[id]).filter(Boolean);
    const rest = p.cases.filter((c) => !ids.includes(c.id));
    const more = rest.length
      ? `<details class="more"><summary>다른 트러블슈팅 ${rest.length}건 더 보기</summary>
           <div class="cases">${rest.map((c) => caseHTML(c, false)).join("")}</div></details>`
      : "";
    return `<div class="cases">${featured.map((c, i) => caseHTML(c, i === 0)).join("")}</div>${more}`;
  }

  function projectHTML(key, idx) {
    const p = PROJECTS[key];
    const metrics = p.metrics
      .map((m) => `<div class="metric"><b>${esc(m.value)}</b><span>${esc(m.label)}</span></div>`)
      .join("");
    const flow = p.flow.length
      ? `<ol class="flow">${p.flow.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>`
      : "";
    const meta = [p.period, p.team].filter(Boolean).map(esc).join(" · ");
    const count = field === "all" ? p.cases.length : p.cases.filter((c) => c.tags.includes(field)).length;

    // 간략히: 요약·수치·스택 / 자세히: 역할·흐름·트러블슈팅·결과
    const brief = `
      <p class="summary">${esc(p.summary)}</p>
      <div class="metrics">${metrics}</div>
      <ul class="tags">${p.stack.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>`;

    const detail = `
      <div class="role-box"><span class="label">맡은 역할</span><p>${esc(p.role)}</p></div>
      ${flow}
      <h4 class="sub">트러블슈팅 <span class="count">${count}</span></h4>
      ${casesBlock(key, p)}
      <h4 class="sub">결과</h4>
      <ul class="results">${p.results.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>`;

    return `
      <article class="project">
        <div class="proj-head">
          <span class="proj-idx">${String(idx + 1).padStart(2, "0")}</span>
          <div>
            <h3>${esc(p.title)} <small>${esc(p.subtitle)}</small></h3>
            ${meta ? `<p class="muted">${meta}</p>` : ""}
          </div>
        </div>
        ${brief}
        <details class="proj-detail" data-key="${key}"${openProjects.has(key) ? " open" : ""}>
          <summary><span class="when-closed">자세히 보기 ▾</span><span class="when-open">간략히 보기 ▴</span></summary>
          <div class="proj-detail-body">${detail}</div>
        </details>
      </article>`;
  }

  function renderProjects() {
    document.querySelectorAll("#fieldFilter button").forEach((b) => {
      b.setAttribute("aria-pressed", b.dataset.field === field);
    });
    // 분야를 고르면 모든 프로젝트의 자세히 보기를 펼쳐 결과를 바로 보여 줌
    if (field !== "all") MAIN.projectOrder.forEach((k) => openProjects.add(k));
    $("projectList").innerHTML = MAIN.projectOrder.map((k, i) => projectHTML(k, i)).join("");
    document.querySelectorAll(".proj-detail").forEach((d) => {
      d.addEventListener("toggle", () => {
        if (d.open) openProjects.add(d.dataset.key);
        else openProjects.delete(d.dataset.key);
      });
    });
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
  renderProjects();
})();
