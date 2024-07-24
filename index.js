import express from "express";
import bodyParser from "body-parser";


const app=express();
const port=3000;

app.set('view engine','ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

let posts=[];
app.get("/",(req,res)=>{
    res.render("index",{ posts });
});
app.get("/new",(req,res)=>{
    res.render("posts");
});

app.post("/new",(req,res)=>{
    const {title,content}=req.body;
    posts.push({ title, content });
    res.redirect("/");
});

app.get("/posts/:id",(req,res)=>{
    const postId=req.params.id;
    const post=posts[postId];
    if(post){
        res.render("post",{ post });
    }else{
        res.status(404).send('Post not found');
    }
});

app.listen(port,()=>{
    console.log(`server running on port ${port}.`);
});