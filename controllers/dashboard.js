"use strict";

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';

const dashboard = {

createView(request, response) {
  logger.info("Dashboard page loading");

  const loggedInUser = accounts.getCurrentUser(request);

  if (loggedInUser) {
    const searchTerm = request.query.searchTerm || "";

    const regions = searchTerm
      ? appStore.searchUserRegions(searchTerm, loggedInUser.id)
      : appStore.getUserRegions(loggedInUser.id);

    const sortField = request.query.sort;
    const order = request.query.order === "desc" ? -1 : 1;
    let sorted = regions;

    if (sortField) {
      sorted = regions.slice().sort((a, b) => {
        if (sortField === "title") {
          return a.title.localeCompare(b.title) * order;
        }
        if (sortField === "destinations") {
          return (a.destinations.length - b.destinations.length) * order;
        }
        return 0;
      });
    }

    const viewData = {
      title: "Travel Dashboard",
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      regions: sortField ? sorted : regions,
      search: searchTerm,
      titleSelected: request.query.sort === "title",
      destinationsSelected: request.query.sort === "destinations",
      ascSelected: request.query.order === "asc",
      descSelected: request.query.order === "desc",
    };

    response.render("dashboard", viewData);
  } else {
    response.redirect('/');
  }
},

addRegion(request, response) {
  const loggedInUser = accounts.getCurrentUser(request);
  const newRegion = {
    id: uuidv4(),
    userid: loggedInUser.id,
    title: request.body.title,
    destinations: [],
  };
  appStore.addRegion(newRegion);
  response.redirect('/dashboard');
},

  deleteRegion(request, response) {
  const regionId = request.params.id;
  appStore.removeRegion(regionId);
  response.redirect('/dashboard');
},



};

export default dashboard;