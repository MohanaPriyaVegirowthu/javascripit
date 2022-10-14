const request = require('request')

//const url ="https://reqres.in/api/users"
const url = "http://api.weatherstack.com/current?access_key=a198c4c424994529922714d0dec78c81&query=New%20York"

request({url:url,json:true},(error,respose)=>{
//  console.log(respose)
//  console.log('...................')
 //const data = JSON.parse(respose.body)
 //console.log(data)
 console.log(respose.body.current)
 console.log('the wind speed is '+respose.body.current.wind_speed)
})
console.log('..................................')
///////
const geoCodingUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/-73.989,40.733.json?access_token=pk.eyJ1IjoibW9oYW5hMTIzNCIsImEiOiJjbDk2dXY2NXgycW45M29wOGcwN3Y0d2VnIn0.yN0HdgeNXlpoFVsSLerdBA"
request({url:geoCodingUrl,json:true},(error,respose)=>{
console.log(respose.body)
    console.log(respose.body.features[0].center[0])
    console.log(respose.body.features[0].center[1])
})