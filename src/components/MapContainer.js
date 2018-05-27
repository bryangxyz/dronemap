import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';

import config from '../configs/config';

class MapContainer extends Component {

  state = {
    locations: []
  }

  componentDidMount() {
    this.getLocations();
  }

  /** 
   * gets the locations of drones from api 
   * */
  getLocations() {
    axios(config.LOCATIONS_SERVICE_API_URL)
      .then(res => {
        let locations = [];
        if (Array.isArray(res.data)) {
          locations = res.data;
        }
        this.setState({ // set this.state.locations to drone locations got from api
          locations
        },
          this.loadMap // call loapMap function to load the google map
        );
      })
      .catch(err => console.log(err));
  }

  /** 
   * creates a new google map and adds markers for drones 
   * */
  loadMap() {
    if (this.props && this.props.google) { // checks whether props have been passed
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map; // looks for HTML div ref 'map' returned in render below
      const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, name it node

      const center = this.state.locations.length > 0 ? 
        { lat: this.state.locations[0].location.latitude, lng: this.state.locations[0].location.longitude } : 
        { lat: -37.8136276, lng: 144.96305759999996 }; // When there is no drone returned from API, set the center of the map to Melbourne.

      const mapConfig = Object.assign({}, {
        center, // sets center of google map to the location of the 1st drone
        zoom: 11, // sets zoom. Lower number is zoomed further out.
        mapTypeId: 'roadmap'
      });

      const map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified config set above.

      if (this.state.locations.length > 0) {
        const bounds = new google.maps.LatLngBounds();

        // Add markers to map
        this.state.locations.forEach(location => { // iterate through locations saved in state
          const marker = new google.maps.Marker({ // creates a new Google maps Marker object
            position: { lat: location.location.latitude, lng: location.location.longitude }, // sets position of marker to specified location
            map: map, // sets marker to appaer on the map we created
            title: location.droneId.toString() // set the title of the marker
          });
          bounds.extend(marker.getPosition());
        });

        // Set zoom of map to cover all visible markers 
        map.fitBounds(bounds);

        // Re-zoom the map when the window is resized
        google.maps.event.addDomListener(window, "resize", () => {
          google.maps.event.trigger(map, "resize");
          map.fitBounds(bounds);
        });
      }
    }
  }

  /** 
   * gets new locations of the drones from api and refresh the markers on the map 
   * */
  handleRefresh() {
    this.getLocations();
  }

  render() {
    const style = { // MUST specify the dimensions of the Google map or it won't work
      width: '100vw',
      height: '75vh'
    };

    return (
      <div>
        <button
          type="button"
          className="btn btn-primary ml-md-3 mb-md-3"
          onClick={this.handleRefresh.bind(this)}
        >Refresh</button>
        <div ref='map' style={style}>
          loading map...
        </div>
      </div>
    )
  }
}

export default MapContainer;
