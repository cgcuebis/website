const jobs = [
  {
    id: "motor-presse-hearst",
    title: "Motor Presse Hearst",
    kicker: "Editorial / Live experiences / Brand programming",
    shortDescription: "A concise snapshot of role + impact in editorial, live experiences, and brand programming.",
    longDescription: "An overview of the collaboration, deliverables, and outcomes. Replace this text with your actual case study intro.",
    subProjects: [
      { id:"ispo", title:"ISPO Runners Symposium", year:"2024", role:"Creative direction", tools:"Figma, InDesign", description:"Replace with project details." },
      { id:"abarth", title:"Abarth Workout Night", year:"2023", role:"Brand design", tools:"Illustrator, After Effects", description:"Replace with project details." },
      { id:"mhwh", title:"Men’s & Women’s Health Camp", year:"2022", role:"Design system", tools:"Figma", description:"Replace with project details." },
    ]
  },
  {
    id: "bingoo",
    title: "Bingoo",
    kicker: "Brand / Social",
    shortDescription: "Campaign system, templates and art direction across formats.",
    longDescription: "Replace with your case study intro for this client.",
    subProjects: [
      { id:"templates", title:"Template System", year:"2024", role:"Design", tools:"Figma", description:"Replace with project details." },
      { id:"launch", title:"Launch Assets", year:"2024", role:"Art direction", tools:"Photoshop", description:"Replace with project details." },
    ]
  },
  {
    id: "lenus",
    title: "Lenus",
    kicker: "Social / Performance creative",
    shortDescription: "Social assets and iterations built for clarity and conversion.",
    longDescription: "Replace with your case study intro for this client.",
    subProjects: [
      { id:"ads", title:"Ad Variations", year:"2023", role:"Design", tools:"Figma", description:"Replace with project details." },
      { id:"motion", title:"Motion Cutdowns", year:"2023", role:"Motion", tools:"After Effects", description:"Replace with project details." },
    ]
  },
  {
    id: "elysium",
    title: "Elysium Ventures Group",
    kicker: "Strategy / Identity",
    shortDescription: "Identity exploration and rollout assets across touchpoints.",
    longDescription: "Replace with your case study intro for this client.",
    subProjects: [
      { id:"identity", title:"Identity System", year:"2022", role:"Brand", tools:"Illustrator", description:"Replace with project details." },
    ]
  },
  {
    id: "general",
    title: "General",
    kicker: "Cross-disciplinary",
    shortDescription: "A mix of independent work spanning design, branding and editorial.",
    longDescription: "Replace with your case study intro for your general folder.",
    subProjects: [
      { id:"posters", title:"Posters", year:"2021–2024", role:"Design", tools:"InDesign", description:"Replace with project details." },
      { id:"editorial", title:"Editorial", year:"2020–2024", role:"Layout", tools:"InDesign", description:"Replace with project details." },
    ]
  }
];

const el = (id) => document.getElementById(id);

const folderStack = el("folderStack");
const noteTitle = el("noteTitle");
const noteDesc = el("noteDesc");
const noteMeta = el("noteMeta");

const cabinetView = el("cabinetView");
const chapterView = el("chapterView");

const chapterTitle = el("chapterTitle");
const chapterLead = el("chapterLead");
const miniStack = el("miniStack");

const projectTitle = el("projectTitle");
const projectMeta = el("projectMeta");
const projectDesc = el("projectDesc");

const backBtn = el("backBtn");

let activeJobId = null;
let activeSubProjectId = null;

function renderCabinet() {
  folderStack.innerHTML = "";
  jobs.forEach((job, i) => {
    const btn = document.createElement("button");
    btn.className = "folder";
    btn.type = "button";
    btn.style.zIndex = String(100 - i);
    btn.setAttribute("data-id", job.id);

    btn.innerHTML = `
      <div class="tabLabel">${job.title}</div>
      <div class="mini">${job.kicker}</div>
    `;

    btn.addEventListener("mouseenter", () => previewJob(job.id));
    btn.addEventListener("focus", () => previewJob(job.id));
    btn.addEventListener("click", () => openJob(job.id));

    folderStack.appendChild(btn);
  });

  previewJob(jobs[0]?.id);
}

function previewJob(jobId) {
  const job = jobs.find(j => j.id === jobId);
  if (!job) return;

  noteTitle.textContent = job.title;
  noteDesc.textContent = job.shortDescription;
  noteMeta.textContent = job.kicker;

  [...folderStack.children].forEach((node) => {
    const isMatch = node.getAttribute("data-id") === jobId;
    node.style.filter = isMatch ? "none" : "contrast(0.98) brightness(0.98)";
  });
}

function openJob(jobId) {
  const job = jobs.find(j => j.id === jobId);
  if (!job) return;

  activeJobId = jobId;
  activeSubProjectId = job.subProjects[0]?.id ?? null;

  cabinetView.classList.add("hidden");
  chapterView.classList.remove("hidden");

  chapterTitle.textContent = job.title;
  chapterLead.textContent = job.longDescription;

  renderMiniStack(job);
  renderProject(job, activeSubProjectId);
}

function renderMiniStack(job) {
  miniStack.innerHTML = "";
  job.subProjects.forEach((p, i) => {
    const btn = document.createElement("button");
    btn.className = "miniFolder";
    btn.type = "button";
    btn.style.zIndex = String(100 - i);
    btn.setAttribute("data-sub", p.id);

    btn.innerHTML = `<div class="tabLabel">${p.title}</div>`;

    btn.addEventListener("mouseenter", () => setActiveSub(job, p.id, false));
    btn.addEventListener("focus", () => setActiveSub(job, p.id, false));
    btn.addEventListener("click", () => setActiveSub(job, p.id, true));

    miniStack.appendChild(btn);
  });

  syncMiniActive();
}

function setActiveSub(job, subId, persist) {
  if (persist) activeSubProjectId = subId;
  renderProject(job, subId);
  if (persist) syncMiniActive();
}

function syncMiniActive() {
  [...miniStack.children].forEach((node) => {
    node.classList.toggle("active", node.getAttribute("data-sub") === activeSubProjectId);
  });
}

function renderProject(job, subId) {
  const p = job.subProjects.find(x => x.id === subId) ?? job.subProjects[0];
  if (!p) return;

  projectTitle.textContent = p.title;
  projectMeta.textContent = `${p.year} · ${p.role} · ${p.tools}`;
  projectDesc.textContent = p.description;
}

backBtn.addEventListener("click", () => {
  chapterView.classList.add("hidden");
  cabinetView.classList.remove("hidden");
  activeJobId = null;
  activeSubProjectId = null;
});

renderCabinet();
