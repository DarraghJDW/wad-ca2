'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const appStore = {

  store: new JsonStore('./models/app-store.json', { destinationCollection: [] }),
  collection: "destinationCollection",


  //returns all regions from the json collection
  getAllRegions() {
    return this.store.findAll(this.collection);
  },


  //finds a specific region by its id
  getRegionById(id) {
    const regions = this.store.findAll(this.collection);
    return regions.find(region => region.id == id);
  },

  addRegion(region) {
  this.store.addCollection(this.collection, region);
  },

  addDestination(regionId, destination) {
    return this.store.addItem(this.collection, regionId, 'destinations', destination);
  },

    removeRegion(id) {
    const region = this.getRegionById(id);
    return this.store.removeCollection(this.collection, region);
  },

  removeDestination(regionId, destinationId) {
    return this.store.removeItem(this.collection, regionId, 'destinations', destinationId);
  },

  editDestination(id, destinationId, updatedDestination) {
    this.store.editItem(this.collection, id, destinationId, "destinations", updatedDestination);
},


};

export default appStore;
