var localStrategy = require("passport-local").Strategy;
var bCrypt = require("bcrypt");

function init(passport, getUserByEmail, getUserById){
    // autheticating user
    var authenticateUser = async function(email, password, done){
        var user = getUserByEmail(email);
        if(user == null){
            return done(null,false, {message:'No user found'});
        }

        try{
            if(await bCrypt.compare(password, user.password)){
                return done(null, user);
            }else{
                return done(null, false, {message:'Incorrect password'});
            }
        }catch(e){
            return done(e);
        }
    }

    passport.use(new localStrategy({usernameField:'email'}, authenticateUser))
    passport.serializeUser(function(user,done){done(null, user.id)})
    passport.deserializeUser(function(id,done){ return done(null,getUserById(id))})
}

module.exports = init