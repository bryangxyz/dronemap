import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';

class MapContainer extends Component {

  state = {
    locations: []
  }

  componentDidMount() {
    this.getLocations();
  }

  /** @function getLocations gets the locations of drones from api */
  getLocations() {
    axios('http://localhost:3001')
    .then(res => {
      this.setState({ // set this.state.locations to drone locations got from api
        locations: res.data
        }, 
        this.loadMap // call loapMap function to load the google map
      );
    })
    .catch(err => console.log(err));
  }

  /** @function loadMap creates a new google map and adds markers for drones */
  loadMap() {
    if (this.props && this.props.google) { // checks whether props have been passed
      const {google} = this.props; 
      const maps = google.maps;

      const mapRef = this.refs.map; // looks for HTML div ref 'map' returned in render below
      const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, name it node

      const mapConfig = Object.assign({}, {
        center: {lat: this.state.locations[0].location.latitude, lng: this.state.locations[0].location.longitude}, // sets center of google map to the location of the 1st drone
        zoom: 11, // sets zoom. Lower number is zoomed further out.
        mapTypeId: 'roadmap'
      });

      const map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified config set above.

      const bounds = new google.maps.LatLngBounds();

      /** Add markers to map */
      this.state.locations.forEach( location => { // iterate through locations saved in state
        const marker = new google.maps.Marker({ // creates a new Google maps Marker object
          position: {lat: location.location.latitude, lng: location.location.longitude}, // sets position of marker to specified location
          map: map, // sets marker to appaer on the map we created
          title: location.droneId.toString() // set the title of the marker
        });
        bounds.extend(marker.getPosition());
      });

      /** Set zoom of map to cover all visible markers */
      map.fitBounds(bounds);

      /**
       * Re-zoom the map when the window is resized
       * @listens resize
       */
      google.maps.event.addDomListener(window, "resize", () => {
        google.maps.event.trigger(map, "resize");
        map.fitBounds(bounds);
      });
    }
  }

  /** @function handleRefresh gets new locations of the drones from api and refresh the markers on the map */
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
          className="btn btn-primary"
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
