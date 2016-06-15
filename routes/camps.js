var express=require('express');
var router = express.Router();
var Camp=require('../models/camp');
var midwr=require('../midwr');

router.use(function(req,res, next){
    res.locals.curuser=req.user;
    next();
});

router.get('/', function(req,res){
    Camp.find({},function(err, found){
        if(err){console.log('Schitts Creek!! Found is bad', err)}
        else{
            res.render('camps/index', {passin:found, curuser: req.user})
        }
    })
})


router.post('/', midwr.isLoggedIn, function(req,res){
   var  campname = req.body.name;
   var campimg=req.body.img;
   var camptxt=req.body.txt
   var op = {
       id: req.user._id,
       username: req.user.username
   }
   console.log(req.user);
   Camp.create({name:campname, img:campimg, txt:camptxt, op:op}, function(err,ncamp){
               if(err){console.log('Schitts Creek!! create is bad', err)}
else{
    req.flash('win', 'Added New Camp')
    res.redirect('/camps');
      console.log(ncamp)
}
   })
   
   //console.log(ncamp)
})

router.get('/new', midwr.isLoggedIn, function(req,res){
    res.render('camps/new')
})

router.get('/:id', function(req,res){
    var id= req.params.id
    console.log(id)
     Camp.findById(id).populate('comments').exec(function(err,foundcamp){
               if(err){console.log('Schitts Creek!! findByID is bad', err)}
else{
    //console.log(foundcamp.comments)
    res.render("camps/show", {passin:foundcamp})
}
    
})
});



//edit route
router.get('/:id/edit', midwr.permissionChkerCamp, function(req,res){
    
    // is user logged-in

            Camp.findById(req.params.id, function(err, found){
            
                res.render('camps/edit',{passin: found})

        })
    })
        

    


//update route
router.put('/:id', midwr.permissionChkerCamp, function(req,res){
    
    Camp.findByIdAndUpdate(req.params.id,req.body.camp, function(err,updcamp){
        
        if(err){console.log(err);res.redirect('/camps')}
        else{
                        console.log(updcamp);
                        console.log(req.body);
                req.flash('win', 'Edit Succesful.')
                res.redirect('/camps/'+req.params.id)
        }
    } )
})

//destroy camp

router.delete('/:id', midwr.permissionChkerCamp, function(req,res){
    //res.send('deleting')
    Camp.findByIdAndRemove(req.params.id, function(err){
        if(err){console.log("can't delete", err)}
        else{
            console.log('deleted', req.params.id);
        }
                    res.redirect('/camps')

    })
})




module.exports = router;




//  var camps = [
//         {name: 'algo', img: 'http://cdn.grindtv.com/wp-content/uploads/2015/02/shutterstock_242371765.jpg'},
//         {name: 'bruce', img: 'https://www.nps.gov/yuch/planyourvisit/images/Kandik-outer-Josh-Spice-EDIT-300x.jpg'},
//         {name: 'squamish', img: 'http://www.fiisschen.lu/wp-content/uploads/2016/01/Camping-Near-The-Lake-Background-Wallpaper.jpg'}
//     ]

// app.get('/camps', function(req,res){
   
//     res.render('camps', {passin: camps})
// })

