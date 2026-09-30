const cfg = window.SUPER_IGUANA || {};
const ticker = cfg.ticker || "IGUANA";
const contract = (cfg.contract || "").trim();
const pair = (cfg.pair || "").trim() || contract;
const xUrl = (cfg.x || "https://x.com/SuperIguana_X").replace("twitter.com", "x.com");
const telegramUrl = cfg.telegram || "https://t.me/Super_Iguana";

const uniswap = contract
  ? `https://app.uniswap.org/swap?chain=base&outputCurrency=${contract}`
  : "https://app.uniswap.org/swap?chain=base";
const aerodrome = contract
  ? `https://aerodrome.finance/swap?from=eth&to=${contract}`
  : "https://aerodrome.finance/swap";

document.querySelectorAll("[data-x]").forEach((link) => {
  link.href = xUrl;
});
document.querySelectorAll("[data-tg]").forEach((link) => {
  link.href = telegramUrl;
});
document.querySelectorAll("[data-buy='uniswap']").forEach((link) => {
  link.href = uniswap;
});
document.querySelectorAll("[data-buy='aerodrome']").forEach((link) => {
  link.href = aerodrome;
});
document.querySelectorAll("[data-ca]").forEach((node) => {
  node.textContent = contract || "0xb200000000000000000000fffa494c50a69a7701";
});
document.title = `Super Iguana ($${ticker}) — Born to bask. Forced to save the world.`;

const toast = document.getElementById("toast");
let toastTimer = 0;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    if (!contract) {
      showToast("Contract drops at launch.");
      return;
    }
    try {
      await navigator.clipboard.writeText(contract);
      showToast("Contract copied.");
    } catch {
      showToast("Couldn’t copy. Select the contract and copy it.");
    }
  });
});

const toggle = document.querySelector(".nav-toggle");
const links = document.getElementById("nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
});
links.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

if (pair) {
  const embed = document.getElementById("dexscreener-embed");
  const frame = document.createElement("iframe");
  frame.title = "Super Iguana price chart on Dexscreener";
  frame.loading = "lazy";
  frame.src = `https://dexscreener.com/base/${pair}?embed=1&loadChartSettings=0&trades=0&tabs=0&info=0&chartLeftToolbar=0&chartDefaultOnMobile=1&chartTheme=light&theme=light&chartStyle=1&chartType=usd&interval=15`;
  embed.appendChild(frame);
  embed.hidden = false;
  document.getElementById("chart-wait").hidden = true;
}
