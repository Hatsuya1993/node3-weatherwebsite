const request = require("request")

const forecast = (lat, lon, callback) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + encodeURIComponent(lat) + "&lon=" + encodeURIComponent(lon) + "&appid=3a6d6374813054bbbe5b1b5598a46169"
    request({
            url,
            json: true
        },
        (error, response) => {
            if (response.body.cod == 404) {
                callback("Country", undefined)
            } else if (response.body.cod == 401) {
                callback("API", undefined)
            } else {
                callback(undefined, {
                    cloud: response.body.weather[0].main,
                    type: response.body.weather[0].description
                })
            }
        })
}

module.exports = forecast