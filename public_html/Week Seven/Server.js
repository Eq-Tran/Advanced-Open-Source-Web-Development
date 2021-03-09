if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const { urlencoded } = require("express");
var express = require("express");
var app = express();
var bcrypt = require("bcrypt");
var passport = require("passport");
var flash = require("express-flash");
var session = require("express-session");
var methodOverride = require("method-override");
var users = [];

var initPassport = require("./passport-config");
initPassport(passport, function(email){
    return users.find(async function(user){user.email === email});
},
function(id){
    return users.find(function(user){user.id === id});
});

var hbs = require("express-handlebars");
app.set('view engine', 'handlebars');
app.engine('handlebars', hbs({
    layoutsDir:__dirname + '/views/layouts',
    //extname: 'hbs',
}));

// Middleware
app.use(express.static('/public'));
app.use(express.urlencoded({extended:false}));
app.use(flash());
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

// Page routes
app.get('/', checkAuthentication(), (req,res) => {
    res.render('main',{
        layout: 'index',
        name: 'Ethan'
    });
});

app.get('/register', (req,res) => {
    res.render('register',{
        layout: 'index',
        name: 'Ethan'
    });
});

app.get('/login', (req,res) => {
    res.render('login',{
        layout: 'index',
    });
});


app.post('/register', async (req,res) =>{
    try{
        var hashedPw = await bcrypt.hash(req.body.password, 10);
        users.push({
            id:Date.now().toString(),
            name:req.body.name,
            email:req.body.email,
            password:hashedPw
        
        });
        res.redirect('/login');
    }catch{
        res.redirect('/register');
    }
    console.log(users);
});






app.post('/login', passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash:true
}));

app.delete('/logout', (req,res) =>{
    req.logOut();
    res.redirect('/login')
})

function checkAuthentication(req,res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}
app.listen(3000);