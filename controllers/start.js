"use strict";

import logger from "../utils/logger.js";
import accounts from './accounts.js';
import appStore from '../models/app-store.js';
import userStore from '../models/user-store.js';

const start = {

  createView(request, response) {
    logger.info("Start page loading!");
    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      const viewData = {
        title: "Best Tourist Destinations",
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      };
      response.render("start", viewData);
    } else {
      response.redirect('/');
    }
  },

};

export default start;