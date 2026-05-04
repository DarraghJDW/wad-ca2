"use strict";

import logger from "../utils/logger.js";
import aboutStore from "../models/about-store.js";
import accounts from './accounts.js';
import appStore from '../models/app-store.js';
import userStore from '../models/user-store.js';

const about = {

  createView(request, response) {
    logger.info("About page loading");
    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      const allRegions = appStore.getAllRegions();
      const userRegions = appStore.getUserRegions(loggedInUser.id);
      const allUsers = userStore.getAllUsers();

      const totalDestinations = allRegions.reduce((total, r) => total + r.destinations.length, 0);
      const userDestinations = userRegions.reduce((total, r) => total + r.destinations.length, 0);
      const largest = allRegions.length > 0 ? allRegions.reduce((max, r) => r.destinations.length > max.destinations.length ? r : max, allRegions[0]) : null;

      const viewData = {
        title: "About",
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        stats: aboutStore.getStats(),
        totalRegions: allRegions.length,
        totalDestinations: totalDestinations,
        userRegions: userRegions.length,
        userDestinations: userDestinations,
        totalUsers: allUsers.length,
        largestRegion: largest ? largest.title : 'N/A',
      };
      response.render("about", viewData);
    } else {
      response.redirect('/');
    }
  }

};

export default about;