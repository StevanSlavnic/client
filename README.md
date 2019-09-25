## Quick start

1. Make sure that you have Node.js v8.15.1 and npm v5 or above installed.
2. Clone this repo using git clone https://github.com/StevanSlavnic/client.git <YOUR_PROJECT_NAME>
3. Move to the appropriate directory: cd <YOUR_PROJECT_NAME>.
4. Run yarn install in order to install dependencies.
5. From comand line run cp .env.dist .env
6. In .env file add: 
    - your URL of your app under parameter REACT_APP_DOMAIN='http://localhost:3000'
    - your API base URL under parameter REACT_APP_BACKEND_API_ENDPOINT='http://127.0.0.1:8093/api/v1'
    - your Google Maps API key under parameter REACT_APP_GOOGLE_PLACES_API_KEY="<YOUR_GOOGLE_MAPS_API_KEY>".
   See more on https://developers.google.com/maps/documentation/embed/get-api-key

7. At this point you can run yarn start to see the app at http://localhost:3000.
