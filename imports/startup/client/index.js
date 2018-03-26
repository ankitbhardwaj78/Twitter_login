import React from 'react'
import ReactDOM from 'react-dom'

import App from '../../ui/App';
import {routes} from './Routes';

Meteor.startup( () => {
	ReactDOM.render( routes , document.querySelector('.render-target'))
});
