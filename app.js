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


app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(err) console.log(err);

        res.render("index", {blogs});
    })
    
});


app.listen(3000, (err) => {
    if (err) console.log(err);
    console.log("Server is listening to 3000!");
})

