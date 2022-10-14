const request = require('request')


const url = "http://api.weatherstack.com/current?access_key=a198c4c424994529922714d0dec78c81&query=New%20York"
request({ url: url, json: true }, (error, response) => {
    if (error) {
        console.log('Unable to connect to weather service!')
    } else if (response.body.error) {
        console.log('Unable to find location')
    } else {
        console.log('the wind speed is '+ response.body.current.wind_speed)  
    }
})

const geocodeURL ="https://api.mapbox.com/geocoding/v5/mapbox.places/-73.989,40.733.json?access_token=pk.eyJ1IjoibW9oYW5hMTIzNCIsImEiOiJjbDk2dXY2NXgycW45M29wOGcwN3Y0d2VnIn0.yN0HdgeNXlpoFVsSLerdBA"

request({ url: geocodeURL, json: true }, (error, response) => {
    if (error) {
        console.log('Unable to connect to location services!')
    } else if (response.body.features.length === 0) {
        console.log('Unable to find location. Try another search.')
    } else {
        const latitude = response.body.features[0].center[0]
        const longitude = response.body.features[0].center[1]
        console.log(latitude, longitude)
    }
})