const bodyParser = require("body-parser"),
        mongoose = require("mongoose"),      
         express = require("express"),
             app = express();
      


mongoose.connect("mongodb://localhost/restful_blog_app", {useNewUrlParser: true});
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE/MODEL CONFIG
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
})

const Blog = mongoose.model("Blog", blogSchema);


// RESTFUL ROUTES

app.get("/", (req, res) => {
    res.redirect("/blogs");
});

//INDEX ROUTE
app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(err) console.log(err);

        res.render("index", {blogs});
    })
    
});

// NEW ROUTE
app.get("/blogs/new", (req, res) => {
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", (req, res) => {
    // create blog
    Blog.create(req.body.blog, (err, newBlog) => {
        if (err) console.log(err);

        console.log("Newly created : ")
        console.log(newBlog);
    // then, redirect to the index 
        res.redirect("/blogs");
    });
   
});


//SHOW ROUTE
app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) res.redirect("/blogs");
        // res.send("<h1>show page!</h1>")
        res.render("show", {foundBlog});
    });
    
});


app.listen(3000, (err) => {
    if (err) console.log(err);
    console.log("Server is listening to 3000!");
})

