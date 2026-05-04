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

async addRegion(region, file, response) {
  try {
    region.picture = await this.store.addToCloudinary(file);
    this.store.addCollection(this.collection, region);
    response();
  } catch (error) {
    logger.error("Error adding region:", error);
    response(error);
  }
},

async addDestination(regionId, destination, file, response) {
  try {
    destination.picture = await this.store.addToCloudinary(file);
    this.store.addItem(this.collection, regionId, 'destinations', destination);
    response();
  } catch (error) {
    logger.error("Error adding destination:", error);
    response(error);
  }
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
  searchRegions(search) {
  return this.store.findBy(this.collection,
    (region => region.title.toLowerCase().includes(search.toLowerCase())));
},

getUserRegions(userid) {
  return this.store.findBy(this.collection, (r => r.userid === userid));
},

searchUserRegions(search, userid) {
  return this.store.findBy(this.collection,
    (r => r.userid === userid && r.title.toLowerCase().includes(search.toLowerCase())));
},


};

export default appStore;
