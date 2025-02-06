
const User = require("../models/user.js");

module.exports.signUp =  (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.postSignUp = async (req, res) => {
    try {
       let { email, username, password } = req.body;
       let newUser = new User({ email, username });
       let registeredUser = await User.register(newUser, password);
       console.log(registeredUser);
       req.login(registeredUser, (err) => {
           if(err){
               return next(err);
           }
           req.flash("success", "Welcome to Wanderlust");
           res.redirect("/listings"); 
       });
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.login =  (req, res) => {
    res.render("users/login.ejs");
}

module.exports.postLogin = async (req, res) => {
    req.flash("success", "Welcome to Wanderlust");
    res.redirect(res.locals.redirectUrl || "/listings");
}

module.exports.logout =  (req, res, next) => {
    req.logout((err) => {
        if(err){
            next(err);
        }
        req.flash("success", "Goodbye!");
        res.redirect("/listings");
    })
}