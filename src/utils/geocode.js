const request = require("postman-request");

// Geocoding
// Address -> Lat/Long -> Weather
// const geocodeURL =
//     "https://us1.locationiq.com/v1/search?key=pk.48e5fe92d6629a18152f39424ad4f237&q=Empire%20State%20Building&format=json&limit=1";

// request({ url: geocodeURL, json: true }, (error, response) => {
//     if (error) {
//         console.log("Unable to connect to weather service!");
//     } else if (response.body.error) {
//         console.log("Unable to find location.");
//     } else {
//         const data = response.body[0];
//         const location = data.display_name.split(",")[0];
//         console.log(
//             `The latitude and longitude of ${location} is: Lat ${data.lat} and Long ${data.lon}`
//         );
//     }
// });

const geocode = (address, callback) => {
    const url = `https://us1.locationiq.com/v1/search?key=pk.48e5fe92d6629a18152f39424ad4f237&q=${encodeURIComponent(
        address
    )}&format=json&limit=1`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location services!", undefined);
        } else if (body.error) {
            callback("Unable to find location. Try another search.", undefined);
        } else {
            callback(undefined, {
                latitude: body[0].lat,
                longitude: body[0].lon,
                location: body[0].display_name,
            });
        }
    });
};

module.exports = geocode;
