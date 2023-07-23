const express = require('express');
const app = express();

const port = 8000;

// Importing cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Importing Body Parser to manage Post Requests
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));


// Using Express Layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// Connecting to database
const db = require('./config/mongoose');

// Extract style and scripts from subpages into the layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// Adding Passport for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

// Accessing Static files
app.use(express.static('./assets'));



// Set Up Views Engine
app.set('view engine' , 'ejs');
app.set('views', './views');

app.use(session({
    name : 'codeial',
    // ToDo change the secret during deployement
    secret : 'BlahSomething',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 1000)
    },
    store: MongoStore.create(
        {
        mongoUrl: 'mongodb://127.0.0.1:27017/codeial_development',
        autoRemove: 'disabled',
        }
    ) 
}));

// Keep this above the Routes otherwise middleware ka error aata he
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// Using Express Router
app.use('/' , require('./routes'));

app.listen(port , function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
})