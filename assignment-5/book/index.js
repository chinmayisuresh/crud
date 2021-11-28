const express=require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const connect = () => {
    return mongoose.connect("mongodb://localhost:27017/store" ,{useNewUrlParser: true , useUnifiedTopology: true});
}


const bookSchema = new mongoose.Schema({

    book_name:{type:String , required:true},
    section_id: { type:mongoose.Schema.Types.ObjectId ,ref:"section", required:true},
    author_id:[{type:mongoose.Schema.Types.ObjectId ,ref:"author", required:true}],
    check:{type:String,required:true},
    body:{type:String , required:true},
},
{
    versionKey:false,
    timestamps:true
}
)

const Book = mongoose.model("book",bookSchema);


const sectionSchema = new mongoose.Schema({

    section_name:{type:String , required:true},
    
},
{
    versionKey:false,
    timestamps:true
}
)
const Section = mongoose.model("section",sectionSchema);


const authorSchema = new mongoose.Schema({

    first_name:{type:String , required:true},
    last_name:{type:String,required:true},
    
},
{
    versionKey:false,
    timestamps:true
}
)
const Author = mongoose.model("author",authorSchema);


//section crud
app.post("/sections" , async (req,res) =>{

    try{
    const section = await Section.create(req.body);
   
    return res.status(200).send(section);
    }catch(e){
        return res.send(e.message);
    }
})

app.get("/sections" , async (req,res) =>{

    try{
    const section = await Section.find().lean().exec();
   
    return res.status(200).send(section);
    }catch(e){
        return res.send(e.message);
    }
})
app.get("/sections/:id" , async (req,res) =>{

    try{
    const section = await Section.findById(req.params.id).lean().exec();
   
    return res.status(200).send(section);
    }catch(e){
        return res.send(e.message);
    }
})


app.patch("/sections/:id" , async (req,res) =>{

    try{
    const section = await Section.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
   
    return res.status(200).send(section);
    }catch(e){
        return res.send(e.message);
    }
})


app.delete("/sections/:id" , async (req,res) =>{

    try{
    const section = await Section.findByIdAndDelete(req.params.id).lean().exec();
   
    return res.status(200).send(section);
    }catch(e){
        return res.send(e.message);
    }
})


//author crud

app.post("/authors" , async (req,res) =>{

    try{
    const author = await Author.create(req.body);
   
    return res.status(200).send(author);
    }catch(e){
        return res.send(e.message);
    }
})

app.get("/authors" , async (req,res) =>{

    try{
    const author = await Author.find().lean().exec();
   
    return res.status(200).send(author);
    }catch(e){
        return res.send(e.message);
    }
})
app.get("/authors/:id" , async (req,res) =>{

    try{
    const authors = await Author.findById(req.params.id).lean().exec();
   
    return res.status(200).send(authors);
    }catch(e){
        return res.send(e.message);
    }
})


app.patch("/authors/:id" , async (req,res) =>{

    try{
    const author = await Author.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
   
    return res.status(200).send(author);
    }catch(e){
        return res.send(e.message);
    }
})


app.delete("/authors/:id" , async (req,res) =>{

    try{
    const author = await Author.findByIdAndDelete(req.params.id).lean().exec();
   
    return res.status(200).send(author);
    }catch(e){
        return res.send(e.message);
    }
})



//boook crud

app.post("/books" , async (req,res) =>{

    try{
    const book = await Book.create(req.body);
   
    return res.status(200).send(book);
    }catch(e){
        return res.send(e.message);
    }
})

app.get("/books" , async (req,res) =>{

    try{
    const book = await Book.find().lean().exec();
   
    return res.status(200).send(book);
    }catch(e){
        return res.send(e.message);
    }
})
app.get("/books/:id" , async (req,res) =>{

    try{
    const book = await Book.findById(req.params.id).lean().exec();
   
    return res.status(200).send(book);
    }catch(e){
        return res.send(e.message);
    }
})


app.patch("/books/:id" , async (req,res) =>{

    try{
    const book = await Book.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
   
    return res.status(200).send(book);
    }catch(e){
        return res.send(e.message);
    }
})


app.delete("/books/:id" , async (req,res) =>{

    try{
    const book = await Book.findByIdAndDelete(req.params.id).lean().exec();
   
    return res.status(200).send(book);
    }catch(e){
        return res.send(e.message);
    }
})

//assignment crud

app.get("/check" , async (req,res) =>{

    try{
    const book = await Book.find({check:"yes"}).lean().exec();
   
    return res.status(200).send(book);
    }catch(e){
        return res.send(e.message);
    }
})


app.get("/authors/:id/books" , async (req,res) =>{

    try{
        const author =  await Author.findById(req.params.id).lean().exec();
    const book = await Book.find({author_id:author._id}).populate({path:"author_id",select:"first_name"}).lean().exec();
   
    return res.status(200).send(book);
    }catch(e){
        return res.send(e.message);
    }
})

app.get("/sections/:id/books" , async (req,res) =>{

    try{
        const section =  await Section.findById(req.params.id).lean().exec();
    const book = await Book.find({section_id:section._id}).populate("section_id").populate("author_id").lean().exec();
   
    return res.status(200).send(book);
    }catch(e){
        return res.send(e.message);
    }
})

app.get("/sections/:id/books/check" , async (req,res) =>{

    try{
        const section =  await Section.findById(req.params.id).lean().exec();
    const book = await Book.find({section_id:section._id ,check:'no'}).populate("section_id").lean().exec();
   
    return res.status(200).send(book);
    }catch(e){
        return res.send(e.message);
    }
})


app.get("/authors/:id1/sections/:id2" , async (req,res) =>{

    try{
        const author =  await Author.findById(req.params.id1).lean().exec();
        const section = await Section.findById(req.params.id2).lean().exec();
    const book = await Book.find({section_id:section._id ,author_id:author._id}).populate("section_id").lean().exec();
   
    return res.status(200).send(book);
    }catch(e){
        return res.send(e.message);
    }
})















app.listen(2445, () => {
    connect();
    console.log("listening 2445")
})