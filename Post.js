const express=require("express")
const app=express();
const mongoose=require("mongoose")
const cors= require("cors")
port = process.env.PORT||4000;

// create schema 
const postSchema=new mongoose.Schema({
    author:String,
    location:String,
    description:String,
    image:String,
    date:String

});
//create collection named posts
const postModal =mongoose.model("instaposts",postSchema);


// connect with db
mongoose.connect("mongodb+srv://root1:10xacademy@cluster0.w33wai5.mongodb.net/?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("successfully connected to db");
  },
  (err) => {
    console.log(err);
  }
);

app.listen(port, (err) => {
    if (!err) {
      console.log(`server started at port ${port}`);
    } else {
      console.log(err);
    }
  });  

  //body parser middleware
app.use(express.json({limit: "30mb",extended:true}));
app.use(express.urlencoded({extended:false}));
app.use(cors())

  app.get("/",(req,res)=>{
    res.send("instaclone backend")
  })

  app.post('/new',(req,res)=>{
    const date = new Date
      let finalDate = date + ""
      finalDate = finalDate.split(" ");
      finalDate = finalDate.splice(1, 3).join(" ");
    postModal.create({
      image:req.body.image,
      author:req.body.author,
      location:req.body.location,
      description:req.body.description,
      date:finalDate
  
    }).then(()=>{ res.send("file and data uploaded successfully")}).catch((err)=>{
      console.log(err.message)
    })
   
  })

  app.get("/all", (req,res) => {
    postModal.find().then((data) => {
      res.send({data : data})
    }).catch((err) => {
      console.log(err)
    })
  })
  