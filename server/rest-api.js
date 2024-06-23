var express = require("express");
var cors= require('cors');
var mongoClient= require('mongodb').MongoClient;

var conString = "mongodb://127.0.0.1:27017";

var app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//server side routes

app.post("/register-user",(req,res)=>{
    
    var user= {
        Name:req.body.Name,
        Mobile:req.body.Mobile,
        Email:req.body.Email,
        UserId:req.body.UserId,
       Password:req.body.Password
    }

    mongoClient.connect(conString).then(clientObj=>{
        var database= clientObj.db("to-do");
        database.collection("users").insertOne(user).then(()=>{
            console.log('User Registered');
            res.end();
        });
    });
})

app.get("/get-users",(req,res)=>{

    mongoClient.connect(conString).then(clientObj=>{
        var database = clientObj.db("to-do");
        database.collection('users').find({}).toArray().then((documents)=>{
            res.send(documents);
            res.end();
        })
    })
})

app.post("/add-task",(req,res)=>{

    var task ={
        AppointmentId:parseInt(req.body.AppointmentId),
        Title:req.body.Title,
        Description:req.body.Description,
        Date:new Date(req.body.Date),
        UserId:req.body.UserId
    }

    mongoClient.connect(conString).then(clientObj=>{
        var database = clientObj.db("to-do");
        database.collection('appointments').insertOne(task).then(()=>{
            console.log('Task added');
            res.end();
        })
    })
})

app.get('/tasks/:userId',(req,res)=>{

    mongoClient.connect(conString).then(clientObj=>{
        
        var database= clientObj.db("to-do");
        database.collection("appointments").find({UserId:req.params.userId}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })

})

app.get('/view-task/:id',(req,res)=>{

    mongoClient.connect(conString).then(clientObj=>{
        
        var database= clientObj.db("to-do");
        database.collection("appointments").find({AppointmentId:parseInt(req.params.id)}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })

})

app.put('/edit-task/:id',(req,res)=>{

    let task={
        AppointmentId:parseInt(req.params.id),
        Title:req.body.Title,
        Description:req.body.Description,
        Date:new Date(req.body.Date),
        UserId:req.body.UserId
    }

    mongoClient.connect(conString).then(clientObj=>{
        var database = clientObj.db('to-do');
        database.collection("appointments")
        .updateOne({$and:[{AppointmentId:task.AppointmentId},{UserId:task.UserId}]},{$set:task}).then(()=>{
            console.log(`${req.body.AppointmentId} updated successfully`);
            res.end();
        })
    })
})

app.delete("/delete-task/:appointmentId",(req,res)=>{

    mongoClient.connect(conString).then(clientObj=>{
        var database = clientObj.db("to-do");
        database.collection('appointments').deleteOne({AppointmentId:parseInt(req.params.appointmentId)})
        .then(()=>{
            console.log("Task Deleted");
            res.end();
        })
    })
})
app.listen(6060,()=>{
    console.log("Server Started : http://127.0.0.1:6060")
})

