const request = require("request")

const geocode = (address, callback) => {
    const url =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        address +
        "&appid=3a6d6374813054bbbe5b1b5598a46169&units=metric";
    request({
            url,
            json: true,
        },
        (error, response) => {
            console.log(response)
            if (response.body.cod == 401) {
                callback("Error", undefined);
            } else if (response.body.cod == 404) {
                callback("City", undefined);
            } else {
                callback(undefined, {
                    lat: response.body.coord.lat,
                    lon: response.body.coord.lon,
                    loca: response.body.name
                })
            }
        }
    );
};


module.exports = geocode