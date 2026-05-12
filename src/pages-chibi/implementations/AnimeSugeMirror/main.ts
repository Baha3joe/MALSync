import type { ChibiGenerator } from '../../../chibiScript/ChibiGenerator';
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
    isSyncPage($c: ChibiGenerator<unknown>) {
      return $c.url().contains('/watch/').run();
    },
    getTitle($c: ChibiGenerator<unknown>) {
      return $c.querySelector('.item-bottom .name a').ifNotReturn().text().run();
    },
    getIdentifier($c: ChibiGenerator<unknown>) {
      return $c.url().string().run();
    },
    getOverviewUrl($c: ChibiGenerator<unknown>) {
      return $c.url().string().run();
    },
    getEpisode($c: ChibiGenerator<unknown>) {
      return $c.querySelector('.duration .d-info span').ifNotReturn().text().number().run();
    },
    uiInjection($c: ChibiGenerator<unknown>) {
      return $c.querySelector('.player-controls').uiAfter().run();
    },
    nextEpUrl($c: ChibiGenerator<unknown>) {
      return $c
        .querySelector('.item-top a.poster[href*="/ep-"]')
        .getAttribute('href')
        .ifNotReturn()
        .urlAbsolute()
        
        .querySelector('.item-top a.poster[href*="/ep-"]')
        .getAttribute('href')
        .ifNotReturn()
        .urlAbsolute()
        .run();
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
