var lms = require('./models/lms');
var clue =require('./models/clue');
var info =require("./models/info");
function getvalues(res) {
    lms.find(function (err, lmss) {       
        if (err) {
            res.send(err);
        }
        res.json(lmss); 
    });
};
module.exports = function (app) {
    app.get('/api/lms', function (req, res) { 
               console.log("code",req.query)
        lms.findOne({
            code:  req.query.code,
        }, function (err, todo) {
            if (err)
                res.send(err);
           res.send(todo);
        });
    });
    // all details
        app.get('/api/score', function (req, res) { 
            //    console.log("code",req.query)
        lms.find({
           
        }, function (err, todo) {
            if (err)
                res.send(err);
           res.send(todo);
        });
    });
    app.post('/api/lms', function (req, res) {  
        console.log(req.body.code);
              
        lms.findOne({
            code:  req.body.code,
        }, function (err, todo) {
            console.log("todo",todo, 'err',err);
            if (err){
                console.log("exist");
                
                
            }
            else if(todo==null){
                console.log("!exist");
                lms.create({
                    code: req.body.code,
                    time: new Date(),
                    task: req.body.currentTask,
                    totalLostMin : 0
                }, function (err, todo) {
                    console.log("response");
                    if (err){
                        console.log("creation err");
                        res.send(err);
                    }
                    else{
                        console.log("created");
                        res.send(todo);
                    }
                });
            }
            else 
            res.send(todo);
        });
       
    });

    app.put('/api/lms', function (req, res) { 
        console.log("time",req.body.totalLostMin);
        
       var newData ={
        finishedTime : new Date()
       };
      
       if(req.body.task)  
       newData.task = req.body.task;
       if(req.body.finished)
       newData.finished = req.body.finished;

        lms.update({code:req.body.code}, {
             $inc:{totalLostMin:req.body.totalLostMin?req.body.totalLostMin:0}
            }, {}, function(err, numAffected) {
            // numAffected is the number of updated documents
            if (err)
                res.send(err);
        //console.log(numAffected)
        // if(req.body.totalLostMin)  
        // newData.totalLostMin = req.body.totalLostMin;
            lms.update({code:req.body.code}, {
                $set:newData
            }, {}, function(err, numAffected) {
            // numAffected is the number of updated documents
            if (err)
                res.send(err);
        //console.log(numAffected)
            res.send(numAffected);
            });
          });
    });

    // get for clue
    app.get('/api/clue', function (req, res) { 
               console.log("sno",req.query.sno)
        clue.findOne({
            sno:  req.query.sno,
        }, function (err, todo) {
            if (err)
                res.send(err);
           res.send(todo);
        });
    });
    // 
        // get for info
        app.get('/api/info', function (req, res) { 
            console.log("sno",req.query.sno)
     info.findOne({
         sno:  req.query.sno,
     }, function (err, todo) {
         if (err)
             res.send(err);
        res.send(todo);
     });
 });
 // 
    // app.get('*', function (req, res) {
    //     res.sendFile(__dirname + '/public/index.html'); 
    // });


};
