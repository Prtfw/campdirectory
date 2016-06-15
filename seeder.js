var mongoose = require("mongoose"),
    Camp=require("./models/camp")
    Comment = require("./models/comment")
seedarr=[
    {name: "Algonquin", img: "http://cdn.grindtv.com/wp-content/uploads/2015/02/shutterstock_242371765.jpg", txt: "BIG BAD national park in Ontario! Best in fall time." },
    {name : "Denali", img : "http://images.summitpost.org/original/831329.jpg", txt : "Really cold all the time. Must fight bears for blueberries. Great place to build a wood cabin."},
    {name : "Whistler", img : "http://www.hellobc.com/getmedia/60f4ab9f-c488-45d7-ba61-34a69b045c8a/2-7117-Whistler-Hiking.jpg.aspx", txt : "Big tall mountain, don't take the lift you wuss!"},
    ]
    
function dbseeder(){
    // remove camps
    Camp.remove({}, function(err){
        if(err){console.log("shit!!", err)}
        else{
    console.log('removed all camps!!!')
        
        
    //     seedarr.forEach(function(i){
    //     Camp.create(i, function(err,ncamp){
    //          if(err){console.log("shit!!", err)}
    //     else{
    //          //console.log('created', ncamp)
            
    //         //add a comment for each campground
    //         //make comment
    //         Comment.create({txt: "Great place! I'd live here 4ever if there was wifi.", said: "Maddie"},function(err, ncomment){
    //             if(err){console.log("shit!!", err)}
    //             else{
    //                     //console.log('added comment', ncomment.txt)
    //                     }
                        
    //         //associate new comment with the current camp
    //             ncamp.comments.push(ncomment);
    //             ncamp.save();
    //             //console.log('saved comment', ncomment.txt, 'to', ncamp.txt);
    //         })
    //     }
    //     })
    // })
        }
})

    //add seeder camps

    
}

    
module.exports= dbseeder;