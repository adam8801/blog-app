require('dotenv').config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const port = 5000;
const app = express();

// mongoose.connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     tlsCAFile: "./ca-certificate.crt"
// });

/*mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});*/

//

const staticPath = path.join(__dirname, "./public");

app.use('/css', express.static(path.join(__dirname, "./node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "./node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "./node_modules/jquery/dist")));

app.use(express.static(staticPath));
app.set("view engine", "hbs");

// const connection = mongoose.connection;
// connection.once("open", () => {
//     console.log("Mongodb connected");
// });

//middleware
app.set('trust proxy', 1)
app.use(helmet());
const limiter = rateLimit({
    max: 150,
    windowMs: 30*60*1000,
    message: "Too many requests. Please try after 30 minutes"
});
const limiter1 = rateLimit({
    max: 130,
    windowMs: 30*60*1000,
    message: "You have sended too many requests. Please try after 30 minutes"
});
app.use("/profiles",express.static("profiles"));
app.use("/pages",express.static("pages"));
app.use("/blogs",express.static("blogs")); //should you use limiter also here
app.use("/user",limiter);
app.use("/profile",limiter);
app.use("/page",limiter);
app.use("/blog",limiter);
app.use("/skills",limiter);

app.use(express.json());
app.use(mongoSanitize());
app.use(compression());

const userRoute = require("./routes/user");
app.use("/user",userRoute);
const profileRoute = require("./routes/profile");
app.use("/profile", profileRoute);
const pageRoute = require("./routes/page");
app.use("/page", pageRoute);
const blogRoute = require("./routes/blog");
app.use("/blog", blogRoute);
const skills = require("./routes/skills");
app.use("/skills", skills);

/*app.get('/someroute', (req,res) => {
    const ip = req.headers['x-forwarded-for'];
    const ip1 = req.socket.remoteAddress; 
    console.log(ip, ip1); // ip address of the user
    res.send("ok");
});*/

app.use("/",limiter1);
app.use("/about",limiter1);
app.use("/forgotPassword",limiter1);
app.use("/home",limiter1);
app.use("/editSkills",limiter1);
app.use("/feedback",limiter1);
app.use("/guide",limiter1);
app.use("/editProfile",limiter1);
app.use("/profilePage",limiter1);
app.use("/profileDetails",limiter1);
app.use("/profileSkills",limiter1);
app.use("/list",limiter1);
app.use("/connections",limiter1);
app.use("/pagesL",limiter1);
app.use("/addPage",limiter1);
app.use("/pageI",limiter1);
app.use("/pageAMList",limiter1);
app.use("/comment",limiter1);
app.use("/personalPage",limiter1);
app.use("/personalPageAMRList",limiter1);
app.use("/editPage",limiter1);
app.use("/chat",limiter1);
app.use("/otherProfile",limiter1);
app.use("/signUp",limiter1);
app.use("/register",limiter1);
app.use("/tof",limiter1);

app.get("/",(req, res) => {
    res.render("signIn");
});

app.get("/about",(req, res) => {
    res.render("about");
});

app.get("/forgotPassword",(req, res)=>{
    res.render("forgot");
});

app.get("/home",(req, res)=>{
    res.render("home");
});

app.get("/editSkills",(req, res)=>{
    res.render("editSkills");
});

app.get("/feedback",(req, res)=>{
    res.render("feedback");
});

app.get("/guide",(req, res)=>{
    res.render("guide");
});

app.get("/editProfile",(req, res)=>{
    res.render("editProfile");
});

app.get("/profilePage",(req, res)=>{
    res.render("profile");
});

app.get("/profileDetails",(req, res)=>{
    res.render("profileDetails");
});

app.get("/profileSkills",(req, res)=>{
    res.render("profileSkills");
});

app.get("/list",(req, res)=>{
    res.render("list");
});

app.get("/connections",(req, res)=>{
    res.render("connections");
});

app.get("/pagesL",(req, res)=>{
    res.render("pages");
});

app.get("/addPage",(req, res)=>{
    res.render("addPage");
});

app.get("/pageI",(req, res)=>{
    res.render("page");
});

app.get("/pageAMList",(req, res)=>{
    res.render("pageAMList");
});

app.get("/comment",(req, res)=>{
    res.render("comment");
});

app.get("/personalPage",(req, res)=>{
    res.render("personalPage");
});

app.get("/personalPageAMRList",(req, res)=>{
    res.render("personalPageAMRList");
});

app.get("/editPage",(req, res)=>{
    res.render("editPage");
});

app.get("/chat",(req, res)=>{
    res.render("chat");
});

app.get("/otherProfile",(req, res)=>{
    res.render("otherProfile");
});

app.get("/signUp",(req, res)=>{
    res.render("signUp");
});

app.get("/register",(req, res)=>{
    res.render("register");
});

app.get("/tof",(req, res)=>{
    res.render("tof");
});

//app.route("/").get((req, res) => res.json("your first rest api is here"));

const server = app.listen(port, () => console.log('your server is running on port '+port));

process.on('unhandledRejection', err => {
    console.log("Unhandled-----Shuting down");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

/*app.route("/getImage").get((req, res) => {
    //res.sendFile(__dirname + './profiles/back.png');
    res.sendFile('/app/profiles/back.png');
    //res.json({ dir: __dirname, file: __filename});
    });*/

process.on('SIGTERM', () => {
    console.log("System is slowing shuting down");
    server.close(() => {
        console.log("Process terminated");
    });
});
