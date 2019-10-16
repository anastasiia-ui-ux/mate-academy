import { initScripts } from './../../modules/common';

class Home {
  constructor() {
    Home.initModules();
  }
  static initModules() {
    initScripts();
  }
}

new Home();
