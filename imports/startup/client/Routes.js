import React from 'react';
import { Router , Route , browserHistory } from "react-router";
import App from '../../ui/App';
import Signup from '../../ui/Signup';
import {Testing} from '../../ui/Testing';
import Dogs from '../../ui/Dogs';
export const routes = (
  <Router history={browserHistory}>
  <Route path = "/" component = {App}/>
  <Route path ="/signup" component = {Signup} />
  <Route path ="/not-found" component = {Testing} />
  <Route path ="/dogs" component = {Dogs} >
   <Route path="/dogs/:id" component={Dogs} />
  </Route>
  </Router>
)
