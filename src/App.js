import React, { Component } from 'react';
import './App.css';
// import the Google Maps API Wrapper from google-maps-react
import { GoogleApiWrapper } from 'google-maps-react';

import MapContainer from './components/MapContainer';

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
  apiKey: 'AIzaSyARgI4BYPt4xs2D8lU_bOo_DiFkrTOnYGQ'
})(App);
