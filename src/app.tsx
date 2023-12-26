// @ts-ignore
import Kuroshiro from "kuroshiro"
// @ts-ignore
import Analyzer from "./analyzer.js"

let kuroshiro: any = null;

async function observerCallback() {
  const lyricLines = document.getElementsByClassName("lyrics-lyricsContent-text");
  for (const lyricLine of lyricLines) {
    if (lyricLine.classList.contains("spicetify-furigana-lyrics"))
      continue;
    lyricLine.classList.add("spicetify-furigana-lyrics");
    const furigana = await kuroshiro.convert(lyricLine.textContent, {mode: "furigana", to: "hiragana"});
    lyricLine.innerHTML = furigana;
  }
}

async function main() {
  while (!Spicetify?.showNotification) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  kuroshiro = new Kuroshiro()
  await kuroshiro.init(Analyzer);

  const observer = new MutationObserver(async () => {
    await observerCallback();
  });
  await observerCallback();
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

export default main;
