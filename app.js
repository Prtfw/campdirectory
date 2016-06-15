var express = require('express'),
     app = express(),
    ejs = require('ejs'),
    bdparse = require('body-parser'),
    pspt = require("passport"),
    flash = require("connect-flash"),
    locostrat = require("passport-local"),
     mongoose = require("mongoose"),
     dbseeder = require("./seeder"),
     ovrd = require('method-override'),
    Comment = require("./models/comment"),
    User=require("./models/user"),
    Camp= require("./models/camp")
    //dbseeder()
    


    //User = require("./models/user "),
        
app.use(bdparse.urlencoded({extended:true}));

//mongoose.connect('mongodb://localhost/camps') //-OG c9 db
mongoose.connect('mongodb://prtfwcamp:my0camp@ds015194.mlab.com:15194/camps')  //MLAB DB


app.set('view engine', 'ejs')
app.use(express.static(__dirname+'/public'))
app.use(ovrd('_method'))
app.use(flash());


// PASSPORT CONFIG

app.use(require("express-session")({
    secret: "maddie rocks",
    resave: false,
    saveUninitialized: false
}))

app.use(pspt.initialize());
app.use(pspt.session());
pspt.use(new locostrat(User.authenticate()));

pspt.serializeUser(User.serializeUser());
pspt.deserializeUser(User.deserializeUser());


app.use(function(req,res, next){
    res.locals.curuser=req.user;
    res.locals.err = req.flash('err');
    res.locals.win = req.flash('win');
    next();
});
// Camp.create(        {name: 'Algonquin', img: 'http://cdn.grindtv.com/wp-content/uploads/2015/02/shutterstock_242371765.jpg', txt: "BIG BAD national park in Ontario! Best in fall time."},
// function(err, created){
//     if(err){console.log('Schitt Creek', err)}
//     else{console.log("no prob", created.name)}
// })

// ==========> require route files, & use

var camproutes=require("./routes/camps"),
    commroutes=require("./routes/comms"),
    indroutes=require("./routes/index");
    
app.use('/camps', camproutes);
app.use('/camps/:id/comments', commroutes);
app.use(indroutes);



app.listen(process.env.PORT, process.env.IP, function(){
    console.log('camp dir server has started!')
})