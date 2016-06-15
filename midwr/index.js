// here are all da middle wares!

var Comment=require('../models/comment');
var Camp=require('../models/camp');

var midwrObj ={};

midwrObj.permissionChkerCamp = function(req, res, next){
    if(req.isAuthenticated()){
            Camp.findById(req.params.id, function(err, found){
                if(err){console.log('err finding camp in edit', err); res.redirect('/camps')}
                else{
                    // if logged-in is user the author?
                if(found.op.id.equals(req.user._id)){
                    next();
                }else{
                    
                req.flash('err','Sorry, you are not the owner.')
                res.redirect('Referer')
    
                }}
    })}else{
        req.flash('err','You have to login.');
        res.redirect('/login')
    }
}

midwrObj.permissionChkerComm = function(req, res, next){
    if(req.isAuthenticated()){
        console.log("commid", req.params.comm_id)
            Comment.findById(req.params.comm_id, function(err, found){
                if(err){console.log('err finding comm in edit', err); res.redirect('back')}
                else{
                    // if logged-in is user the author?
                    console.log(found)
                    console.log(found.said.id,"vs", req.user._id)

                if(found.said.id.equals(req.user._id)){

                    next();
                }else{
                req.flash('err','Sorry, you are not the owner.')
                res.redirect('back')
    
                }}
    })}else{
        req.flash('err','You have to login.');
        res.redirect('/login')
    }
} 
midwrObj.isLoggedIn = function (req,res,next){
    if (req.isAuthenticated()){
        return next();
    }else{
        req.flash('err', "Please Login.")
        res.redirect('/login')
    }
} 


module.exports = midwrObj;