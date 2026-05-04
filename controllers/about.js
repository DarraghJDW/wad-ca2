"use strict";

import logger from "../utils/logger.js";
import aboutStore from "../models/about-store.js";
import accounts from './accounts.js';

const about = {

  createView(request, response) {
    logger.info("About page loading");
    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      const viewData = {
        title: "About",
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        stats: aboutStore.getStats()
      };
      response.render("about", viewData);
    } else {
      response.redirect('/');
    }
  }

};

export default about;