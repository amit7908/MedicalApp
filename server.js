const express = require("express");
const ejs  = require("ejs");
const session = require("express-session");
const flash  = require("connect-flash");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const userAuth = require("./middleware/userAuth");
const adminAuth = require("./middleware/adminAuth");
const path =require("path")
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(flash());
app.use(cookieParser());
app.use(session({
    secret:"amit",
    cookie:{
        maxAge:50000
    },
    resave:false,
    saveUninitialized:false
}))

app.set('view engine','ejs');
app.set("views","views");
app.use(express.static(path.join(__dirname,"public")))

app.use(userAuth.authUserJwt);
app.use(adminAuth.authAdiminJwt);

const userRoute = require("./routes/userRoutes");
app.use(userRoute);
const adminRoute = require("./routes/adminRoutes");
app.use("/admin",adminRoute);

const port = process.env.PORT 

mongoose.connect(process.env.DB_LINK,{useNewUrlParser:true,useUnifiedTopology:true})
.then(result =>{
    app.listen(port,()=>{
        console.log("db connected ");
        console.log(`http://localhost:${port}`);
    })
})