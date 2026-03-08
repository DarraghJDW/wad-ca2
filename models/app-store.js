'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const appStore = {

  store: new JsonStore('./models/app-store.json', { destinationCollection: {} }),
  collection: "destinationCollection",


  //returns all regions from the json collection
  getAllRegions() {
    return this.store.findAll(this.collection);
  },


  //finds a specific region by its id
  getRegionById(id) {
    const regions = this.store.findAll(this.collection);
    return regions.find(region => region.id == id);
  }

};

export default appStore;
