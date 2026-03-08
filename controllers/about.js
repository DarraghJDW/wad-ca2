"use strict";

import logger from "../utils/logger.js";
import aboutStore from "../models/about-store.js";

const about = {

  createView(request, response) {

    //logger sends a message to the terminal that the page is loading
    logger.info("About page loading");

    const viewData = {
      title: "About",
      stats: aboutStore.getStats()
    };

    response.render("about", viewData);
  }

};

export default about;