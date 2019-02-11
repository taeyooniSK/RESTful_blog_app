const bodyParser = require("body-parser"),
        mongoose = require("mongoose"),      
         express = require("express"),
             app = express();
      


mongoose.connect("mongodb://localhost/restful_blog_app", {useNewUrlParser: true});
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.listen(3000, (err) => {
    if (err) console.log(err);
    console.log("Server is listening to 3000!");
})

