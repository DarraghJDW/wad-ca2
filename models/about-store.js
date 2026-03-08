"use strict";

import JsonStore from "./json-store.js";

const aboutStore = {

  store: new JsonStore("./models/about-store.json", { appStats: [] }),
  collection: "appStats",

  getStats() {
    return this.store.findAll(this.collection);
  }

};

export default aboutStore;