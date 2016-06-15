var express=require('express');
var router = express.Router({mergeParams:true});
var pspt=require("passport");

var User=require('../models/user');

router.use(function(req,res, next){
    res.locals.curuser=req.user;
    next();
});



router.get('/', function(req,res){
    res.render('landpg')
})


// ================ AUTH ROUTES ========================

router.get('/signup', function(req,res){
    res.render("auth/signup")
})

router.post('/signup', function(req,res){
    console.log(req.body);
    var newuser = new User({username: req.body.username});
    User.register(newuser, req.body.password, function(err, nuser){
        if(err){req.flash('err', err.message), res.render('auth/signup')}
        else{pspt.authenticate('local')(req,res, function(){
            req.flash('win', " Welcome " + nuser.username + " !")
            res.redirect('camps')
        })}
    });
})


router.get('/login', function(req,res){
    res.render("auth/login")
})

router.post('/login', pspt.authenticate('local', {

    successRedirect: '/camps',
    failureRedirect: '/login'
}),function(req,res){
    
})

router.get('/logout', function(req,res){
    req.logout();
    req.flash('win', "Logged Out.")
    res.redirect('/camps')
})


// function isLoggedIn(req,res,next){
//     if (req.isAuthenticated()){
//         return next();
//     }else{
//         res.redirect('/login')
//     }
// } 

module.exports = router;