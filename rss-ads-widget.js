(function (window, document) {
  "use strict";

  const rotationTimers = new WeakMap();

  function initRssAdsWidget(container) {
    if (!container) return;

    const feedUrl = container.getAttribute("data-rss-url");
    if (!feedUrl) return;

    const templateName = container.getAttribute("data-template") || "card-list";
    let maxItems = parseInt(container.getAttribute("data-max-items"), 10);
    if (isNaN(maxItems) || maxItems <= 0) maxItems = 5;

    const rotate = container.getAttribute("data-rotate") === "true";
    let rotateSpeed = parseInt(container.getAttribute("data-rotate-speed"), 10);
    if (isNaN(rotateSpeed) || rotateSpeed < 1000) rotateSpeed = 5000;

    container.innerHTML = "";
    container.className = container.className.replace(/\brss-template-\S+/g, "").trim();

    fetch(feedUrl)
      .then(res => res.text())
      .then(xmlText => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlText, "application/xml");
        const items = Array.from(xml.getElementsByTagName("item"));

        const ads = items.map(item => ({
          title: item.getElementsByTagName("title")[0]?.textContent.trim() || "",
          link: item.getElementsByTagName("link")[0]?.textContent.trim() || "",
          description: item.getElementsByTagName("description")[0]?.textContent.trim() || ""
        }));

        const firstBatch = ads.slice(0, maxItems);
        renderTemplate(container, templateName, firstBatch);

        if (rotate) {
          enableRotation(container, ads, templateName, maxItems, rotateSpeed);
        }
      })
      .catch(err => console.error("RSS Ads Widget Error:", err));
  }

  function enableRotation(container, ads, templateName, maxItems, rotateSpeed) {
    if (rotationTimers.has(container)) {
      clearInterval(rotationTimers.get(container));
    }

    let index = 0;

    const timer = setInterval(() => {
      index += maxItems;
      if (index >= ads.length) index = 0;

      const slice = ads.slice(index, index + maxItems);
      renderTemplate(container, templateName, slice);
    }, rotateSpeed);

    rotationTimers.set(container, timer);
  }

  function renderTemplate(container, templateName, ads) {
    let html = "";

    switch (templateName) {
      case "horizontal":
        html = tplHorizontal(ads);
        break;
      case "banner":
        html = tplBanner(ads);
        break;
      case "grid":
        html = tplGrid(ads);
        break;
      case "line":
        html = tplLine(ads);
        break;
      default:
        html = tplCardList(ads);
    }

    container.innerHTML = html;
    container.classList.add("rss-template-" + templateName);
  }

  function tplCardList(ads) {
    return ads.map(ad => `
      <div class="rss-item">
        <a href="${ad.link}" target="_blank" rel="noopener noreferrer">
          <h3>${ad.title}</h3>
          <p>${ad.description}</p>
        </a>
      </div>
    `).join("");
  }

  function tplHorizontal(ads) {
    return ads.map(ad => `
      <div class="rss-item">
        <a href="${ad.link}" target="_blank" rel="noopener noreferrer">
          <div class="text">
            <h4>${ad.title}</h4>
            <p>${ad.description}</p>
          </div>
        </a>
      </div>
    `).join("");
  }

  function tplBanner(ads) {
    const ad = ads[0];
    if (!ad) return "";
    return `
      <a class="rss-banner" href="${ad.link}" target="_blank" rel="noopener noreferrer">
        <strong>${ad.title}</strong>
        <span>${ad.description}</span>
      </a>
    `;
  }

  function tplGrid(ads) {
    return ads.map(ad => `
      <div class="rss-grid-item">
        <a href="${ad.link}" target="_blank" rel="noopener noreferrer">
          <h3>${ad.title}</h3>
          <p>${ad.description}</p>
        </a>
      </div>
    `).join("");
  }

  function tplLine(ads) {
    return ads.map(ad => `
      <div class="rss-line-item">
        <a href="${ad.link}" target="_blank" rel="noopener noreferrer">
          <strong>${ad.title}</strong> — ${ad.description}
        </a>
      </div>
    `).join("");
  }

  function initAllWidgets() {
    document.querySelectorAll(".rss-ads-widget").forEach(initRssAdsWidget);
  }

  window.RssAdsWidget = {
    reloadWidget: initRssAdsWidget,
    initAll: initAllWidgets
  };

  document.addEventListener("DOMContentLoaded", initAllWidgets);

})(window, document);
