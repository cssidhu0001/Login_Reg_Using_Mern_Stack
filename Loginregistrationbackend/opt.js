import express from 'express';
const app = express();
import  randomize from 'randomatic';
 

app.post("/otp",(req, res) => {
const token = randomize("*",8)
console.log(token);
})
app.listen(3600, () => {
    console.log("server started at 3600")
});