var express=require('express');
var router = express.Router({mergeParams:true});

var Comment=require('../models/comment');
var Camp=require('../models/camp');
var midwr=require('../midwr');

router.use(function(req,res,next){
    res.locals.curuser=req.user;
    next();
});

// ============= comment routes =============

router.get('/new', midwr.isLoggedIn,function(req,res){
    console.log(req.params.id)
    Camp.findById(req.params.id, function(err,found){
        if(err){console.log("err=", err)}
        else{ console.log('found', found._id)    
            res.render('comments/new', {passin:found})
}
        
    });
})


router.post('/',midwr.isLoggedIn, function(req,res){
    Camp.findById(req.params.id, function(err,found){
        if(err){console.log("err=", err); res.redirect('/camps')}
        else{ console.log('found', found._id);    
        
           
            // make new comment
            console.log(req.body.comment)
        Comment.create(req.body.comment,function(err, ncomment){
            if(err){console.log("err=", err); res.redirect('/camps')}
            else{
                    // add user name and id
                    ncomment.said.id = req.user._id;
                    ncomment.said.username= req.user.username;
                    ncomment.save();
                found.comments.push(ncomment);
                found.save();
                console.log(ncomment);
                res.redirect('/camps/'+found._id)
            }
        })
            //res.render('comments/new', {passin:found})
}
        
    });
})



router.get('/:comm_id/edit',midwr.permissionChkerComm, function(req, res){
    console.log( '65',req.params.comm_id)
    Comment.findById(req.params.comm_id, function(err, found){
        if(err){
            //console.log("error finding comment for edit", err); 
            res.redirect('back')}
        else{
            console.log('rendering', found)
                res.render('comments/edit', {passin: found, camp_id: req.params.id})

        }
    })
})

router.put('/:comm_id',midwr.permissionChkerComm, function(req, res){
    Comment.findByIdAndUpdate(req.params.comm_id,req.body.comment, function(err, updcomm){
        if(err){res.redirect('back');}
        else{
            res.redirect('/camps/'+req.params.id)
        }
    })
})


// comment delete

router.delete('/:comm_id', midwr.permissionChkerComm, function(req, res){
    Comment.findByIdAndRemove(req.params.comm_id, function(err){
        if(err){
            console.log("err deleting comment", err);
            res.redirect('back');
        }
        else{console.log("comment removed"); res.redirect('/camps/'+req.params.id)}
    })
})







module.exports = router;

