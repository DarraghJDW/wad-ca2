'use strict';

import logger from '../utils/logger.js';
import userStore from '../models/user-store.js';
import { v4 as uuidv4 } from 'uuid';

const accounts = {

  index(request, response) {
    response.render('index', { title: 'Login or Signup' });
  },

  login(request, response) {
    response.render('login', { title: 'Login' });
  },

  logout(request, response) {
    response.cookie('travel', '');
    response.redirect('/');
  },

  signup(request, response) {
    response.render('signup', { title: 'Signup' });
  },

register(request, response) {
  const user = request.body;
  user.id = uuidv4();
  userStore.addUser(user);
  logger.info('registering ' + user.email);
  response.cookie('travel', user.email);
  response.redirect('/dashboard');
},

  authenticate(request, response) {
    const user = userStore.getUserByEmail(request.body.email);
    if (user && user.password === request.body.password) {
      response.cookie('travel', user.email);
      logger.info('logging in ' + user.email);
      response.redirect('/dashboard');
    } else {
      response.redirect('/login');
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.travel;
    return userStore.getUserByEmail(userEmail);
  }
};

export default accounts;