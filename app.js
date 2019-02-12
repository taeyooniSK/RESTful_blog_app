const bodyParser = require("body-parser"),
 methodOverride = require("method-override"),
 expressSanitizer = require("express-sanitizer"),
 mongoose = require("mongoose"),      
 express = require("express"),
 app = express();
      


mongoose.connect("mongodb://localhost/restful_blog_app", {useNewUrlParser: true});
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method")); // 내가 원하는 단어로 써도 되긴하지만 이게 가장 보편적

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
    console.log(req.body);
    req.body.blog.body = req.sanitize(req.body.blog.body);
    console.log("==================");
    console.log(req.body);
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

// EDIT ROUTE   

app.get("/blogs/:id/edit", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) res.redirect("/blogs");
        res.render("edit", {blog : foundBlog});
    });
    
});


// UPDATE ROUTE 
app.put("/blogs/:id", (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if (err) res.redirect("/blogs");
        res.redirect(`/blogs/${req.params.id}`);
    });
});

//DESTORY ROUTE
app.delete("/blogs/:id", (req, res) => {
    // destroy blog
    Blog.findByIdAndRemove(req.params.id, err => {
        if(err) res.redirect("/blogs");
        res.redirect("/blogs");
    })
    // redirect somewhere
});

app.listen(3000, (err) => {
    if (err) console.log(err);
    console.log("Server is listening to 3000!");
})

