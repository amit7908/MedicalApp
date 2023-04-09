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

const multer=require('multer')

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

app.use('/upload',express.static(path.join(__dirname,'upload')));
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')))

const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'upload')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const fileFilter=(req,file,cb)=>{
    if(file.mimetype.includes("png") ||
    file.mimetype.includes("jpg") ||
    file.mimetype.includes("jpeg")){
        cb(null,true)
    }
    else{
        cb(null,false)
    }    
} 

app.use(multer({storage:fileStorage,fileFilter:fileFilter,limits:{fieldSize:1024*1024*5}}).single('image'))


app.set('view engine','ejs');
app.set("views","views");


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