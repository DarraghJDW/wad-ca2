"use strict";

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";

const dashboard = {

  createView(request, response) {

    //logger sends a message to the terminal that the page is loading
    logger.info("Dashboard page loading");


    //gets all the regions from the JSON storage
    const viewData = {
      title: "Travel Dashboard",
      regions: appStore.getAllRegions()
    };

    response.render("dashboard", viewData);
  },

};

export default dashboard;