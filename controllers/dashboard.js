"use strict";

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import { v4 as uuidv4 } from 'uuid';

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

  addRegion(request, response) {
  const newRegion = {
    id: uuidv4(),
    title: request.body.title,
    destinations: [],
  };
  appStore.addRegion(newRegion);
  response.redirect('/dashboard');
},

};

export default dashboard;