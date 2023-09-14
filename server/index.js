import 'dotenv/config'

// Libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import session from "express-session";
// import session from "cookie-session"

import routeConfig from './config/route.config.js';

// Database connection
import ConnectDB from "./database/connection.js";

// Microservice Routs
import Auth from "./API/Auth/index.js"
import Tweet from "./API/Tweet/index.js"
import User from "./API/User/index.js"
import Image from "./API/Image/index.js"

const app = express();
const PORT=process.env.PORT || 3001

// Session config
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'Session started'
  }));


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
routeConfig(passport);

// App Routes
app.use("/auth", Auth);
app.use("/tweet", Tweet);
app.use("/user", User);
app.use("/image", Image);

app.get("/", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log(req.headers);
    res.json({ message: "Setup done" })
  });
  
  app.listen(PORT, () => ConnectDB().then(() => console.log("Server is running")).catch((error)=>console.log(error, "Server is running, But database connection failed!")))
