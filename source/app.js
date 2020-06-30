const request = require("request");
const geocode = require("./utils/geocode")
const forecast = require("./forecast/forecast")

const country = process.argv[2]
console.log(country)
if (country == undefined) {
    console.log("Please provide a country")
} else {
    geocode(country, (error, {
        lat,
        lon,
        loca
    }) => {
        if (error == "Error") {
            console.log("API error");
        } else if (error == "City") {
            console.log("Country error");
        } else {
            console.log(lat, lon, loca);
        }
        forecast(lat, lon, (error, {
            cloud,
            type
        }) => {
            if (error == "Country") {
                console.log("Country invalid")
            } else if (error == "API") {
                console.log("API Invalid")
            } else {
                console.log(cloud, type)
            }
        })
    });
}