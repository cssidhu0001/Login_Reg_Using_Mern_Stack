import express from 'express';
const app = express();
// import  randomize from 'randomatic';
import  nodeGeocoder  from 'node-geocoder'

app.post("/otp",(req, res) => {
    let options = {
        // provider: 'openstreetmap'
        provider: 'google',
        apiKey: process.env.LocationApiKey, 

      };
       
      let geoCoder = nodeGeocoder(options);

      geoCoder.geocode('haldwani')
  .then((res)=> {
    console.log(res);
  })
  .catch((err)=> {
    console.log(err);
  });
})
app.listen(3600, () => {
    console.log("server started at 3600")
});