const express=require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const connect = () => {
    return mongoose.connect("mongodb://localhost:27017/test" ,{useNewUrlParser: true , useUnifiedTopology: true});
}

const movieSchema = new mongoose.Schema({

    movie_name:{type:String , required:true},
    movie_genre: { type:String , required:true},
    year:{type:Number , required:true},
    budget:{type:Number , required:true}
},
{
    versionKey:false,
    timestamps:true
}
)

const Movie = mongoose.model("movie",movieSchema);



app.post("/movies" , async (req,res) =>{

    try{
    const movie = await Movie.create(req.body);
   // console.log(movie);
    return res.status(200).send(movie);
    }catch(e){
        return res.send(e.message);
    }
})

app.get("/movies" , async (req,res) =>{

    try{
    const movies = await Movie.find().lean().exec();
   // console.log(movie);
    return res.status(200).send(movies);
    }catch(e){
        return res.send(e.message);
    }
})

app.get("/movies/:id" , async (req,res) =>{

    try{
    const movies = await Movie.findById(req.params.id).lean().exec();
   // console.log(movie);
    return res.status(200).send(movies);
    }catch(e){
        return res.send(e.message);
    }
})

app.patch("/movies/:id" , async (req,res) =>{

    try{
    const movies = await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true},).lean().exec();
   // console.log(movie);
    return res.status(200).send(movies);
    }catch(e){
        return res.send(e.message);
    }
})


app.delete("/movies/:id" , async (req,res) =>{

    try{
    const movies = await Movie.findByIdAndDelete(req.params.id).lean().exec();
   // console.log(movie);
    return res.status(200).send(movies);
    }catch(e){
        return res.send(e.message);
    }
})



app.listen(2444, () => {
    connect();
    console.log("listening 2444")
})