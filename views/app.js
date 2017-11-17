// const yargs = require('yargs');
//
const geocode = require('./geocode/geocode');
//
// var argv = yargs
//           .options({
//             a: {
//               demand : true,
//               alias: 'address',
//               describe: 'User Address for lattitude and longitude',
//               string : true
//             }
//           })
//           .help()
//           .alias('help', 'h')
//           .argv;
//
// geocode.geoCodeAddress(argv.address,(errMsg,result)=>{
//   if(errMsg){
//     console.log(errMsg);
//   }else {
//     console.log(JSON.stringify(result, undefined, 2));
//   }
// });

const request = require('request');
const yargs = require('yargs');
const weather = require('./playground/weather')

var argv = yargs
            .options({
              a: {
                demand : true,
                alias : 'address',
                describe : 'addresss lat, lng',
                string : true
              }
            })
            .help('address', 'a')
            .argv;


geocode.geoCodeAddress(argv.address,(errMsg,result)=>{
  if(errMsg){
    console.log(errMsg);
  }else {
    // console.log(JSON.stringify(result, undefined, 2));
    weather.getWeather(result.lattitude, result.longitude,  (errorMsg, weatherResult) =>{
      if(errorMsg){
        console.log(errorMsg);
      }else {
        console.log(`${weatherResult.temptature} is actual and ${weatherResult.apparentTemperature} is apparent Temperature`);
      }
    });
  }
});
