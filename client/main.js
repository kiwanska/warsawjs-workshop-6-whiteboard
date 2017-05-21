import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import Main from '../imports/client/Main';

Meteor.startup(() => {
  render(<Main />, document.getElementById('app'));
});
