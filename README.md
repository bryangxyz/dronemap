# Drone Map

> a web page with a map to convey the locations of several drones to a user.

## Quick Start

``` bash
# Install dependencies for the app
npm install

# Run the client
npm start

# Client runs on http://localhost:3000
```

## Built With

* [React](https://facebook.github.io/react/)
* [google-maps-react](https://www.npmjs.com/package/google-maps-react)
* [axios](https://www.npmjs.com/package/axios)

## Analysis
* Implementation:
  In this application, I added a simple Google Map to my React app and added the markers for the locations of drones.  I used create-react-app because it configures webpack, etc so I don't need to worry about all that configuration.  I then used google-maps-react which integrates React and Google Maps.  For the Google Maps API to work, you need a parent and child component.  For this, I used App.js as the parent component and MapContainer.js as the child.  
  In App.js, I exported App wrapped inside the GoogleApiWrapper which allows it to access all the functionality of the Google Maps API. 
  In MapContainer.js, 
    First, after the component mounts, I used axios to retrieve the locations of drones from the API provided.  (If you encounter "No 'Access-Control-Allow-Origin' header" error when using Chrome, please add Allow-Control-Allow-Origin: * plugin to your Chrome).
    Second, I saved the locations of drone to this.state.
    Third, I called the loadMap function which created a new google map and displayed all drone locations on the map with the zoom to cover all visible markers.
    Last, when the window resized, the map will reset the zoom to cover all visible markers.
* Tradeoffs:
  Instead of using fetch to make HTTP request, I chose axios which is an additional dependency to install because axios performs automatic transforms of JSON data.  If you use .fetch() there is a two-step process when handing JSON data. The first is to make the actual request and then the second is to call the .json() method on the response.
* Future Considerations for increased scale:
  If there will be a large number of drones to show and the API call takes a long time, I will add loading animation to show before the API call ends.
  If there will be more information to show for each drone, such as icon, content, etc, instead of looping through this.state.locations to create new marker object directly, I will create a new addMarker function to take in each drone as input.  The function will then create new marker for each drone, set icon and show content with event listener(such as click).
  If there will be more drones to show cross different locations(countries), I will add a re-center function to allow user to re-center the map after moving around in the map.

### Author

Bryan Wang

### Version

1.0.0

### License

This project is licensed under the MIT License