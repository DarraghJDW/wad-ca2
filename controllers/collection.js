"use strict";

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';

const collection = {

  createView(request, response) {


    // Get the region id from the URL
    const regionId = request.params.id;

    //logger sends a message to the terminal that the page is loading
    logger.info("Collection page loading: " + regionId);


    //get the selected region from the json 
    const region = appStore.getRegionById(regionId);

 const loggedInUser = accounts.getCurrentUser(request);
  const viewData = {
  title: region.title,
  regionId: region.id,
  destinations: region.destinations,
  fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
};


    //render the page
    response.render("collection", viewData);
  },

    addDestination(request, response) {
    const regionId = request.params.id;
    const newDestination = {
      id: uuidv4(),
      name: request.body.name,
      country: request.body.country,
      description: request.body.description,
      averageCost: request.body.averageCost,
      bestSeason: request.body.bestSeason,
    };
    appStore.addDestination(regionId, newDestination);
    response.redirect('/collection/' + regionId);
  },

    deleteDestination(request, response) {
    const regionId = request.params.id;
    const destinationId = request.params.destinationid;
    logger.debug(`Deleting Destination  $(destinationId} from Playlist ${destinationId}`);
    appStore.removeDestination(regionId, destinationId);
    response.redirect('/collection/' + regionId);
  },

  updateDestination(request, response) {
    const regionId = request.params.id;
    const destinationId = request.params.destinationid;
    logger.debug("regionId: " + regionId + " destinationId: " + destinationId);
    logger.debug("updating destination " + destinationId);
    const updatedDestination = {
      id: destinationId,
      name: request.body.name,
      country: request.body.country,
      description: request.body.description,
      averageCost: request.body.averageCost,
      bestSeason: request.body.bestSeason,
  };
    appStore.editDestination(regionId, destinationId, updatedDestination);
    response.redirect('/collection/' + regionId);
}


};

export default collection;