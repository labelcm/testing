const articles = [
  {
    id: 1,
    title: "Global markets rally as inflation cools faster than expected",
    summary: "Stocks climb across regions after new economic data shows inflation slowing for the third month in a row.",
    section: "business",
    time: "2h ago",
    popularity: 98,
    editorPick: true
  },
  {
    id: 2,
    title: "New AI safety framework agreed by 12 countries",
    summary: "A joint framework outlines testing standards and incident reporting for high-capability models.",
    section: "technology",
    time: "45m ago",
    popularity: 96,
    editorPick: true
  },
  {
    id: 3,
    title: "Championship final heads to overtime thriller",
    summary: "Underdogs force overtime in a dramatic final watched by millions worldwide.",
    section: "sports",
    time: "5h ago",
    popularity: 88,
    editorPick: false
  },
  {
    id: 4,
    title: "Health agency approves next-gen vaccine rollout",
    summary: "Officials say targeted rollout begins next month for high-risk groups and frontline workers.",
    section: "health",
    time: "1h ago",
    popularity: 85,
    editorPick: true
  },
  {
    id: 5,
    title: "Film festival opens with record international lineup",
    summary: "More than 300 films from 74 countries will screen over ten days.",
    section: "entertainment",
    time: "3h ago",
    popularity: 80,
    editorPick: false
  },
  {
    id: 6,
    title: "Leaders call emergency summit after regional tensions rise",
    summary: "Diplomats seek de-escalation as neighboring states report increased military activity.",
    section: "world",
    time: "30m ago",
    popularity: 91,
    editorPick: true
  },
  {
    id: 7,
    title: "Startups adopt four-day workweek to attract talent",
    summary: "A new survey finds flexible schedules are now a leading factor in tech recruitment.",
    section: "business",
    time: "7h ago",
    popularity: 70,
    editorPick: false
  },
  {
    id: 8,
    title: "City unveils smart traffic network to cut commute time",
    summary: "Sensors and AI-powered signaling are expected to reduce congestion by up to 18%.",
    section: "technology",
    time: "9h ago",
    popularity: 75,
    editorPick: false
  }
];

const state = {
  section: "all",
  query: "",
  sort: "latest"
};

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const articlesGrid = document.getElementById("articlesGrid");
const heroArticle = document.getElementById("heroArticle");
const resultMeta = document.getElementById("resultMeta");
const sectionButtons = document.querySelectorAll(".section-chip");
const quickTags = document.getElementById("quickTags");
const trendingList = document.getElementById("trendingList");
const liveUpdates = document.getElementById("liveUpdates");
const themeBtn = document.getElementById("themeBtn");
const newsletterForm = document.getElementById("newsletterForm");
const newsletterMessage = document.getElementById("newsletterMessage");

function matches(article) {
  const text = `${article.title} ${article.summary}`.toLowerCase();
  const sectionOk = state.section === "all" || article.section === state.section;
  const queryOk = !state.query || text.includes(state.query.toLowerCase());
  return sectionOk && queryOk;
}

function sorted(list) {
  if (state.sort === "popular") {
    return [...list].sort((a, b) => b.popularity - a.popularity);
  }
  if (state.sort === "editor") {
    return [...list].sort((a, b) => Number(b.editorPick) - Number(a.editorPick));
  }
  return [...list];
}

function render() {
  const filtered = sorted(articles.filter(matches));
  const hero = filtered[0] || articles[0];

  heroArticle.innerHTML = `
    <span class="article-meta"><strong>${hero.section.toUpperCase()}</strong> • ${hero.time}</span>
    <h1>${hero.title}</h1>
    <p>${hero.summary}</p>
  `;

  resultMeta.textContent = `${filtered.length} article${filtered.length === 1 ? "" : "s"} shown`;

  articlesGrid.innerHTML = filtered
    .map(
      (article) => `
      <article class="article-card">
        <div class="article-meta">
          <span>${article.section}</span>
          <span>${article.time}</span>
        </div>
        <h3>${article.title}</h3>
        <p>${article.summary}</p>
      </article>
    `
    )
    .join("");
}

function renderQuickTags() {
  ["election", "ai", "climate", "startup", "markets", "health"].forEach((tag) => {
    const button = document.createElement("button");
    button.className = "tag-btn";
    button.type = "button";
    button.textContent = `#${tag}`;
    button.addEventListener("click", () => {
      searchInput.value = tag;
      state.query = tag;
      render();
    });
    quickTags.appendChild(button);
  });
}

function renderTrending() {
  sorted(articles)
    .slice(0, 5)
    .forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.title;
      trendingList.appendChild(li);
    });
}

function renderLiveUpdates() {
  [
    "Breaking: Metro line services restored after temporary shutdown.",
    "Press briefing set for 7:30 PM local time.",
    "Election watchdog confirms 63% turnout in early count.",
    "Tech expo announces additional keynote speaker lineup."
  ].forEach((update) => {
    const li = document.createElement("li");
    li.textContent = update;
    liveUpdates.appendChild(li);
  });
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.query = searchInput.value.trim();
  render();
});

sortSelect.addEventListener("change", () => {
  state.sort = sortSelect.value;
  render();
});

sectionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    sectionButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    state.section = button.dataset.section;
    render();
  });
});

themeBtn.addEventListener("click", () => {
  const root = document.documentElement;
  const darkMode = root.getAttribute("data-theme") === "dark";
  root.setAttribute("data-theme", darkMode ? "light" : "dark");
  themeBtn.textContent = darkMode ? "🌙" : "☀️";
});

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const emailInput = document.getElementById("newsletterEmail");
  newsletterMessage.textContent = `Thanks! ${emailInput.value} is now subscribed.`;
  newsletterForm.reset();
});

renderQuickTags();
renderTrending();
renderLiveUpdates();
render();
