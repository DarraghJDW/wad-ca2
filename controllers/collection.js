"use strict";

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";

const collection = {

  createView(request, response) {


    // Get the region id from the URL
    const regionId = request.params.id;

    //logger sends a message to the terminal that the page is loading
    logger.info("Collection page loading: " + regionId);


    //get the selected region from the json 
    const region = appStore.getRegionById(regionId);

    const viewData = {
      title: region.title,
      destinations: region.destinations
    };


    //render the page
    response.render("collection", viewData);
  },

};

export default collection;