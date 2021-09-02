const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const randomize = require('randomatic');
const requests = require('requests');


const app = express();
const static_path = path.join(path.resolve(), "../src/imageUpload");

app.use(express.static(static_path));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser());
dotenv.config()

// DataBase Connection
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("[ User Database Connected... ]");
}).catch((e) => {
    console.log("[ User Database Connection Error! ]");
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        required: true,
        unique: true,
        type: Number

    },
    address: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    // geolocation:[{
    //     geometry:{
    //         type: String,
    //         // default: null
    //     },
    //     components:{
    //         type: String,
    //         // default: null
    //     },
    //     formatted:{
    //         type: String,
    //         // default: null
    //     }
    // }],

    geometry: {
        type:{
            type: String,
            default: "Point"
        },
        coordinates: {
            type: [Number],
            index: "2dsphere"
        }
        // longitude: {
        //     type: Number,
        // },
        // latitude: {
        //     type: Number,
        // }
    },

    geolocation: [{
        components: {
            type: String,
        },
        formatted: {
            type: String,
        }

    }],
    email: {
        unique: true,
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    imageupload: {
        type: String,
    },
    captcha: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

const User = new mongoose.model("User", userSchema);


// Sending a login Confirmation Email to the user i.e the user has sucessfully logined 
function sendEmailfun(email, name, phone) {
    var transporter = nodemailer.createTransport({
        service: process.env.services,
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: process.env.user,
            pass: process.env.pass
        }
    })

    transporter.sendMail({
        from: process.env.from,
        to: email,
        subject: "Login Sucessful",
        text: `Hello ${name},
           Your Login is succesfull with us. 
           Kindly use your account and dont forget to Logout for your safety Reasons.
           
           
           With Best Regards from,
           Cbnits India Pvt Ltd.
           Username:${name}  
           Contact No:${phone}
           Thankyou `,
    }, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            res.status(201).send("Mail sent Sucessfully");
        }
    })
}

function sendEmailforverification(name, email) {
    var captchacode = captcha();
    var transporter = nodemailer.createTransport({
        service: process.env.services,
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: process.env.user,
            pass: process.env.pass
        }
    })

    transporter.sendMail({
        from: process.env.from,
        to: email,
        subject: "Email Verification code",
        html: `<pre>Hello ${name},
        Your Email verification code is <b><style=font-size:1.5rem> ${captchacode}</b>.
        Kindly use this code to verify your email address.
                        
                        
            With Best Regards from,
            Cbnits India Pvt Ltd.
            Thankyou 
                        
           <i><style=text-align:center color:grey> *This is an autogenerated Email please do not reply.*</i></pre>`,
    }, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            res.status(201).send("Mail sent Sucessfully");
        }
    })
    return captchacode;
}



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../src/imageUpload/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname + "_" + "OnlineUplaod")
    }
})

var upload = multer({ storage: storage }).single('imageupload')

app.post("/sendverifcationemail", upload, (req, res) => {
    const { name, email, phone, gender, address, country, state, city, password, confirmpassword } = req.body;
    User.findOne({ email: email }, async (err, user) => {
        if (user) {
            res.send({ message: "User Already Registered..Kindly Login " });
        } else {
            
            const captchacode = 123 //sendEmailforverification(name, email);

            let loc = `https://api.opencagedata.com/geocode/v1/json?key=76cc657768d7459f9f7f064704f2355b&q=${city}`
            requests(loc).on('data', function (chunk) {
                const geometry = [
                    parseFloat(JSON.parse(chunk).results[0].geometry.lng),
                    parseFloat(JSON.parse(chunk).results[0].geometry.lat)
                ]
                const geolocation = [
                    JSON.stringify(JSON.parse(chunk).results[0].components),
                    JSON.stringify(JSON.parse(chunk).results[0].formatted)
                ]

                const tempuser = new User({
                    name: name,
                    email: email,
                    phone: phone,
                    gender: gender,
                    address: address,
                    country: country,
                    state: state,
                    city: city,
                    password: password,
                    imageupload: req.file.filename,
                    confirmpassword: confirmpassword,
                    captcha: captchacode,
                    geolocation: [{ components: geolocation[0] }, { formatted: geolocation[1] }],
                    geometry:{ coordinates: geometry} 
                    // [{ longitude: geometry[0] }, { latitude: geometry[1] }]
                })
                res.send({ tempuser: tempuser })
                // console.log("Email Verification send")
            })
        }
    })
})


//Route

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {

                const tkn = user._id.toString()
                const token = jwt.sign({ tkn }, process.env.SECRETKEY)
                //sendEmailfun(user.email, user.name, user.phone)
                user.tokens = user.tokens.concat({ token })
                user.save(err => {
                    if (err) {
                        console.log(err)
                        res.send("Token Generating Error" + err)
                    }
                    else {
                        res.status(201).send({ message: " Logined Successfully", user: user, token: token })
                    }
                })
            } else {
                res.status(201).send({ message: "Invalid Credentials...Please Try Again!!" });
            }
        } else
            res.send({ message: "User Not in the database .. Kindly Register... " });
    });
})


app.post("/register", (req, res) => {
    const { name, email, captcha, phone, gender, address, country, state, city, password, confirmpassword, imageupload, geometry, geolocation } = req.body;
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "User Already Registered..Kindly Login " });
        } else {
            const user = new User({
                name: name,
                email: email,
                phone: phone,
                gender: gender,
                address: address,
                country: country,
                state: state,
                city: city,
                imageupload: imageupload,
                captcha: captcha,
                password: bcrypt.hashSync(password, 10),
                confirmpassword: bcrypt.hashSync(confirmpassword, 10),
                geolocation: [{ components: geolocation[0].components }, { formatted: geolocation[1].formatted }],
                geometry: geometry
                // geolocation:[{geometry:geolocation[0].geometry},
                //     {components:geolocation[1].components},{formatted:geolocation[2].formatted}]
            })

            user.save(err => {
                if (err) {
                    console.log(err)
                    res.send(err)
                }
                else {
                    res.send({ message: "user Registered Sucessfully ...Kindly Login" })
                }
            })
        }
    })
})

function captcha() {
    const captcha1 = randomize("*", 8)
    return captcha1;
}

app.post("/locationfinder", async(req, res) => {
    console.log("\nMapping ----->>>")
    const distn = 5
    const longitude = 79.527918
    const latitude = 29.2144604
    const radius = distn / 6378.1 

    // https://www.latlong.net/c/?lat=29.2144604&long=79.527918
    // Dehradun,Haridwar,Roorkee,Rudrapur,Kashipur,Rishikesh,Haldwani,Bareilly
    // https://www.mapdevelopers.com/draw-circle-tool.php
    // https://www.nhc.noaa.gov/gccalc.shtml

    const cities = await User.find({
        geometry: { $geoWithin: { $centerSphere: [[longitude,latitude], radius] }}
    })
    console.log(`No of cities in range ${distn} km: ${cities.length} . \n Listed as: \n ${cities}`)
    console.log("Mapping Done <<<-----")
})


app.listen(3400, () => {
    console.log("server started at 3400")
});