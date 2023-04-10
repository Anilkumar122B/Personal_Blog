const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ =require("lodash");
const mongoose = require("mongoose");
const app = express();
let posts =[];
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/blogDB', {
  useNewUrlParser: true
});
const itemsSchema = new mongoose.Schema({
  name : String,
  data : String
});
const Item = mongoose.model("Item" , itemsSchema);

const homeStartingContent = "M.S. Dhoni, in full Mahendra Singh Dhoni, (born July 7, 1981, Ranchi, Bihar [now Jharkhand] state, India), Indian cricketer whose rise to prominence in the early 21st century culminated in his captaincy of the Indian national team that won the one-day Cricket World Cup in 2011.Dhoni made his international debut in 2004. His talent with the bat came to the fore in an innings of 148 runs against Pakistan in his fifth international match. Within a year he joined the India Test team, where he quickly established himself with a century (100 or more runs in a single innings) against Pakistan. Despite his inexperience, Dhoni took over the captaincy of the one-day side in 2007 and led India to the Twenty20 (T20) world title.";
const aboutContent ="Dhoni was honoured for his play with the ICC One Day International Player of the Year Award in 2008 and 2009. In the 2011 one-day World Cup, Dhoni’s dashing innings of 91 not out—in front of a home crowd in Mumbai—paved the way for India’s victory over Sri Lanka in the final. He also led India to an appearance in the semifinals of the 2015 Cricket World Cup. Dhoni stopped serving as India’s captain in 2017, having led his country in 331 international matches, the most for a captain in the sport’s history. Three years later he retired from international competition.";
const contactContent = " The explosion of T20 cricket on the Indian subcontinent paved the way for the formation of the Indian Premier League (IPL) in 2008. In the league’s inaugural season, Dhoni signed with the Chennai Super Kings for $1.5 million, which at the time was the largest contract in the IPL. He subsequently led the team to two consecutive titles (2010, 2011). The Super Kings franchise earned a two-season suspension from the IRL in 2016 for its role in a match-fixing scandal, and Dhoni then joined the Rising Pune Supergiant. In 2018 he returned to the Chennai Super Kings, and the team won the IPL championship that year and in 2021 ";

app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
  res.render("home",{
    startingContent:homeStartingContent,
    posts :posts
  })
})
app.get("/about",function(req,res){
  res.render("about",{
    startingContent:aboutContent
  })
})
app.get("/contact",function(req,res){
  res.render("contact",{
    startingContent:contactContent
  })
})
app.get("/compose",function(req,res){
  res.render("compose")
  })

app.get("/posts/:politics",function(req,res){
    const request = _.lowerCase(req.params.politics);
    posts.forEach(function(post){
      const requestedTitle = _.lowerCase(post.title);
      if(requestedTitle === request){
        res.render("posts",{
          nextPage:post.title,
          nextBody:post.body
        })
      }else{
        res.render("sorry")
      }
    })


})

app.post("/compose",function(req,res){
  let data = {
    title : req.body.newTitle,
    body : req.body.newBody
  };
  const post =  new Item ({
    name : req.body.newTitle,
    data : req.body.newBody
  })
  post.save();
  posts.push(data);
  res.redirect("/");
})

app.listen(3000,function(){
  console.log("port is working");
})
