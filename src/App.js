import React, { Component } from 'react';
import './styles/App.css';
// import the Google Maps API Wrapper from google-maps-react
import { GoogleApiWrapper } from 'google-maps-react';

import MapContainer from './components/MapContainer';
import config from './configs/config';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Drone Map</h1>
        <MapContainer google={this.props.google} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: config.API_KEY
})(App);
