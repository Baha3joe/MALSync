import { PageInterface } from '../../pageInterface';

export const AnimeSugeMirror: PageInterface = {
  name: 'AnimeSuge Mirror',
  database: 'AnimeSuge',
  type: 'anime',
  domain: 'https://animesuges.ru',
  languages: ['English'],
  urls: {
    match: [
      '*://animesuges.ru/*',
      '*://aniwaves.ru/*',
      '*://animesuge.to/*',
      '*://animesuge.re/*',
      '*://anisuge.tv/*',
      '*://anisuge.se/*',
      '*://animesuge.cz/*',
      '*://animesuge.uk/*',
      '*://animesugez.tv/*',
    ],
  },
  search: 'https://animesuges.ru/search?keyword={searchtermPlus}',
  sync: {
    isSyncPage($c) {
      return $c.url().contains('/watch/').run();
    },
    getTitle($c) {
      // Standard scraper logic
      return $c.querySelector('.item-bottom .name a').ifNotReturn().text().run();
    },
    getIdentifier($c) {
      // Fix: Following Copilot's advice to use string() properly
      return $c.url().string().run();
    },
    getOverviewUrl($c) {
      return $c.url().string().run();
    },
    getEpisode($c) {
      // Fix: Clean number grabbing without illegal regex
      return $c.querySelector('.duration .d-info span:first-child').ifNotReturn().text().number().run();
    },
    uiInjection($c) {
      return $c.querySelector('.player-controls').uiAfter().run();
    },
    nextEpUrl($c) {
      return $c.querySelector('.item-top a.poster[href*="/ep-"]').getAttribute('href').ifNotReturn().urlAbsolute().run();
    },
  },
  lifecycle: {
    setup($c) {
      return $c.addStyle(require('./style.less?raw').toString()).run();
    },
    ready($c) {
      return $c.domReady().trigger().run();
    },
  },
};
