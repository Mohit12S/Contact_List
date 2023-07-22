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

// Using Express Router
app.use('/' , require('./routes'));

// Accessing Static files
app.use(express.static('./assets'));



// Set Up Views Engine
app.set('view engine' , 'ejs');
app.set('views', './views');

app.listen(port , function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
})