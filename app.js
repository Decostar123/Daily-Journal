//jshint esversion:6
// const popup = require('node-popup');
// import {alert} from 'node-popup';

const DB =
  "mongodb+srv://Decostar:decostar@cluster0.hwjrpf2.mongodb.net/journal?retryWrites=true&w=majority";

const sessiion = require("express-session");
const flush = require("connect-flash");

const _ = require("lodash");

const express = require("express");
const bodyParser = require("body-parser");

const { check, validationResult } = require("express-validator");

// const urlencodedParser = bodyParser.urlencoded({ extended: false });

const ejs = require("ejs");
const mongoose = require("mongoose");
mongoose
  .connect(DB)
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log("no connection"));

const diarySchema = {
  title: String,
  body: String,
};
const appSchema = {
  username: String,
  pswd: String,
  email: String,
  diary: [diarySchema],
};
const Diary = mongoose.model("Diary", diarySchema);
const Adiary = mongoose.model("Adiary", appSchema);
let name = "";
let pass = "";
// this is the collection or the table
// let day = [];
const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express(); // this part is interesting

// window.onscroll = function() {myFunction()};
function myFunction() {
  if (window.pageYOffset >= sticky) {
    nbar.classList.add("sticky");
  } else {
    nbar.classList.remove("sticky");
  }
}

// related with wucess error message
app.use(
  sessiion({
    secret: "secret",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flush());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));
app.set("view engine", "ejs"); // use ejs as view engine
// this code assumes it has views folder

// let day = [];

// app.get("/", function(req, res) {
//
//  Diary.find( {} , function( err , day )
// {
//   res.render("home", {
//     paragraph: homeStartingContent,
//     day: day
//   } );
// } ) ;
//   } );
const globalArr = [];

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

app.get("/", function (req, res) {
  res.render("login", { message: req.flash("message"), newUser: "no" });
  // res.send("hi budddy ") ;
});

// name = req.body.username ;
//    pass= req.body.pwd  ;
//    const val = req.body.btn ;
//   if( val == "signup1")
//   {

//     console.log(" inside the signup ");

//     req.flash("message" , "") ;

//     res.render("login" , { message : req.flash("message") , newUser : "yes" } ) ;

//   }
//   else if( val == "signup2")
//   {
//     const mailID = req.body.mail ;

//     if(name == "" || pass == "")
//     {
//       req.flash("message" , "empty name or password......") ;
//       res.render("login" , { meassage : req.flash("message") , newUser:"yes" });
//     }
//     else
//     {

//       Adiary.findOne( {username :name , pswd :pass } , {} , function(request , response)
//      {
//         if( response)
//         {
//           req.flash("message" , "already user exist ......") ;
//           res.render("login" , { meassage : req.flash("message") , newUser:"yes" });
//         }
//         else
//         {
//           const temp=[] ;
//           const dd = new Adiary({
//           username :  name ,
//           pswd : pass ,
//           email : mailID ,
//           diary : temp
//             }) ;
//             dd.save() ;
//             req.flash("message" , "") ;

//             res.render("login" , { message : req.flash("message") , newUser : "no" } ) ;

//         }

//      }
//       ) ;

//     }

//   }
//   else
//   {

//     if(name=="" || pass == "")
//     {
//        req.flash("message" , "empty name or email......") ;
//       res.redirect("/");
//     }
//    Adiary.findOne( {username :name , pswd :pass } , {} , function(request , response)
//    {
//     //    if(val=="login")
//     //  {
//        if(!response)
//        {
//          req.flash("message" , "invalid username or email ......") ;
//          res.redirect("/");
//        }
//        else
//        {
//         // const Dary = mongoose.model("Diary" , diarySchema );
//         // const ADary = mo
//         // globalArr = response.diary ;
//             res.render("home" , {
//               paragraph: homeStartingContent,
//               day :response.diary
//             }) ;
//         }

//       } ) ;

//   }

app.post("/", function (req, res) {
  // btnValue = req.body.btn ;
  name = req.body.username;
  pass = req.body.pwd;
  const val = req.body.btn;
  if (val == "signup1") {
    console.log(" inside the signup ");

    req.flash("message", "");

    res.render("login", { message: req.flash("message"), newUser: "yes" });
  } else if (val == "signup2") {
    const mailID = req.body.mail;

    if (name == "" || pass == "") {
      console.log(" hi inside the empty area ");
      req.flash("message", "empty name or password......");
      // res.render("login" , { message : req.flash("message") , newUser:"yes" });
      res.render("login", { message: req.flash("message"), newUser: "yes" });
    } else {
      Adiary.findOne(
        { username: name, pswd: pass },
        {},
        function (request, response) {
          if (response) {
            req.flash("message", "already user exist ......");
            res.render("login", {
              message: req.flash("message"),
              newUser: "yes",
            });
          } else {
            const temp = [];
            const dd = new Adiary({
              username: name,
              pswd: pass,
              email: mailID,
              diary: temp,
            });
            dd.save();
            req.flash("message", "");

            res.render("login", {
              message: req.flash("message"),
              newUser: "no",
            });
          }
        }
      );
    }
  } else {
    if (name == "" || pass == "") {
      req.flash("message", "empty name or email......");
      res.redirect("/");
    } else {
      Adiary.findOne(
        { username: name, pswd: pass },
        {},
        function (request, response) {
          //    if(val=="login")
          //  {
          if (!response) {
            req.flash("message", "invalid username or email ......");
            res.redirect("/");
          } else {
            // const Dary = mongoose.model("Diary" , diarySchema );
            // const ADary = mo
            // globalArr = response.diary ;
            res.render("home", {
              paragraph: homeStartingContent,
              day: response.diary,
            });
          }
        }
      );
    }
  }
});

app.get("/home", function (req, res) {
  //  Diary.find( {} , function( err , day )
  // {
  //   res.render("home", {
  //     paragraph: homeStartingContent,
  //     day: day
  //   } );
  // } ) ;

  Adiary.findOne(
    { username: name, pswd: pass },
    {},
    function (request, response) {
      res.render("home", {
        paragraph: homeStartingContent,
        day: response.diary,
      });
    }
  );
});

app.post("/home", function (req, res) {
  // console.log(req);
  // console.log(" trying this stuff ")
  // res.render("home" , {paragraph:homeStartingContent});
  console.log(" he buddy ");
  res.redirect("/compose");
});

app.get("/contact", function (req, res) {
  res.render("contact", {
    contact: aboutContent,
  });
});
app.get("/about", function (req, res) {
  res.render("about", {
    about: contactContent,
  });
});
app.get("/compose", function (req, res) {
  console.log("Sending...");
  res.render("compose", { heading: "", middle: "", ID: "--" });
});

app.post("/compose", function (req, res) {
  // console.log(" he buddy !!")  ;
  // console.log(req.body.postTitle);
  // var jobject = {
  //   title: req.body.postTitle,
  //   content: req.body.postBody
  // }
  // day.push(jobject);
  const bodyPart = req.body.postBody;
  const heading = req.body.postTitle;
  const ID = req.body.btn;
  console.log("Inside the app.js  id--" + ID);
  const temp = new Diary({ title: heading, body: bodyPart });
  // const key =
  // these are the two steps for inserting data into database

  Adiary.findOne(
    { username: name, pswd: pass },
    {},
    function (request, response) {
      if (ID === "--") {
        response.diary.push(temp);
        // trail.save() ;
        response.save();
        res.redirect("/home");
        //   temp.save( function(err)
        // {
        //   if( !err)
        //   {
        //       res.redirect("/home");
        //   }
        // } );
      } else {
        console.log("AAAAAAAAAAA");
        console.log(ID);
        response.diary.forEach(function (ele1, ele2) {
          if (ele1._id == ID) {
            // console.log("BBBBB") ;
            // ele1.title = heading   ;
            // ele1.body =  bodyPart;
            response.diary[ele2].title = heading;
            response.diary[ele2].body = bodyPart;
            console.log("hhhhh  " + heading + "--" + ele2);
            // break ;
          }
        });
        console.log(response.diary);
        response.save();
        res.redirect("/home");
      }
    }
  );
  //   if(ID === "--")
  //   {
  //
  //     temp.save( function(err)
  //   {
  //     if( !err)
  //     {
  //         res.redirect("/home");
  //     }
  //   } );
  // }else{
  //     // Diary.findOneAndReplace({_id :ID } , {temp} , { upsert: true } )  ;
  //     // temp.save();
  //     // res.redirect("/home");
  // console.log("changed hesdig is  " + bodyPart  );
  //
  //
  //
  //
  // Diary.updateOne( {_id : ID } , {
  //       $set : { title: heading , body : bodyPart }
  //     } , function(err , res)
  //     {
  //       }
  //   );
  //   res.redirect("/home") ;
  //
  // // const updateDocument = async () =>{
  // //   try{
  // //     const result = await Diary.updateOne( {_id : ID } , {
  // //       $set : { title: heading , body : bodyPart }
  // //
  // //     }
  // //
  // //   );
  //   // console.log(result);
  // //   result.save(function(err)
  // // {
  // //   if( !err)
  // //   {
  // //       res.redirect("/home");
  // //   };
  //
  //
  //
  // // });
  // //   }
  // //   catch(err){
  // //     console.log(err) ;
  // //   }
  // //
  // // }
  // // res.redirect("/home") ;
  // // updateDocument.save();
  // // console.log(updateDocument);
  //   //   Diary.replaceOne( {_id :ID } , {temp}  , function(err)
  //   // {
  //   //   if( !err)
  //   //   {
  //   //       res.redirect("/home");
  //   //   }
  //   // }  ) ;
  //   //   res.redirect("/home");
  //
  //   //   temp.save( function(err)
  //   // {
  //   //   if( !err)
  //   //   {
  //   //       res.redirect("/home");
  //   //   }
  //   // } );
  // }

  // res.render("compose")
  // res.end() ;
});
// DDYYNNAAMMIICC    url   thing i cn access has colon  ':'   in front of it
app.get("/posts/:postID", function (req, res) {
  // the below statemnt give acces to all the parameters having : in front of it
  // console.log(req.params.topic);
  // var a = _.lowerCase( req.params.postID);
  // var count = 0 ;
  const ID = req.params.postID;
  console.log(" hi !! Trying to fix it  ");
  // console.log("The id is " + ID);
  // Adiary.findOne( {username :name , pswd :mail } , {} , function(request , response) {
  //       if(response)
  //       {
  //         response.diary.forEach( function(ele1 , ele2 )
  //       {
  //         if(ele1._id === ID )
  //         {
  //           res.render(  "post" , { heading : ele1.title , middle: ele1.body,   _id : ID  } ) ;
  //         }
  //       } )
  //       }
  //
  // }  )

  Adiary.findOne(
    { username: name, pswd: pass },
    {},
    function (request, response) {
      if (response) {
        console.log(" name " + name);
        console.log(" --------" + ID);
        // console.log( response.diary );
        response.diary.forEach(function (ele1, ele2) {
          if (ele1._id == ID) {
            res.render("post", {
              heading: ele1.title,
              middle: ele1.body,
              _id: ID,
            });
          }
          console.log(ele1._id);
        });
      }
    }
  );
});

// Diary.findOne( {_id : ID } , function( err , d )
// {
// //   day.forEach( function(d)
// // {
// //   var ttl = _.lowerCase(d.title);
// //
// //   if( ttl == a )
// //   {
// if( !err)
// {
//   // console.log("match found for  -- " +d   );
//   res.render(  "post" , { heading : d.title , middle: d.body,   _id : ID  } ) ;
// }else
// {
//   console.log("Again the id i got was " + ID) ;
// }

// }
// }
// )

// for(var i = 0 ; i <day.length ; i++)
// {
//   if( a === day[i].title)
//   {
//     count = count +1 ;
//     break ;
//   }
// }
// if(count ===  0 )
// {
//   console.log("failure");
// }else
// {
//   console.log("success") ;
// }
// }  )

app.post("/delete", function (req, res) {
  const checkedId = req.body.btn1;
  console.log(checkedId);

  Adiary.findOne(
    { username: name, pswd: pass },
    {},
    function (request, response) {
      var ind = -1;
      if (response) {
        response.diary.forEach(function (ele1, ele2) {
          if (ele1._id == checkedId) {
            // res.render(  "post" , { heading : ele1.title , middle: ele1.body,   _id : ID  } ) ;
            ind = ele2;
            // break ;
          }
          // console.log(ele1._id ) ;
        });
        if (ind !== -1) {
          response.diary.splice(ind, 1);
          response.save();
          res.redirect("/home");
        }
        // console.log(ind);
      }
    }
  );

  // Diary.deleteOne( {_id :checkedId }, function(err){      } ) ;
  // console.log( Diary.find() );
  // res.redirect("/home");
});

app.get("/search", function (req, res) {});
// function myFunction()
// {
//   console.log(" hi in the ley press down ") ;
// }
app.post("/search", function (req, res) {
  const searchKey = req.body.search_key;
  console.log(searchKey);
  //  const arr = []  ;
  // console
  // console.log("aaaa")  ;
  // console.log(name+"--"+mail ) ;
  Adiary.findOne(
    { username: name, pswd: pass },
    {},
    function (request, response) {
      if (response) {
        // if(searchKey == "")
        // {
        //   res.render("home" , {paragraph:homeStartingContent , day : response.diary });
        //   return ;
        // }
        // else
        // {
        // console.log("hi") ;
        const arr = response.diary.filter(function (ele1, ele2) {
          const num = ele1.title.search(searchKey);
          return num > -1;
        });
        // console.log( arr) ;
        res.render("home", { paragraph: homeStartingContent, day: arr });

        // }
      } else {
        console.log("hello");
      }
    }
  );
});

app.post("/edit", function (req, res) {
  // console.log("came into edit ") ;
  // console.log(req.body.xyx)  ;
  // console.log(req.body.h1)  ;
  // console.log(res.body.xyx)  ;
  // console.log(res.body.h1)  ;
  const ID = req.body.btn1;

  // console.log("The id is " + ID);

  Adiary.findOne(
    { username: name, pswd: pass },
    {},
    function (request, response) {
      response.diary.forEach(function (ele1, ele2) {
        if (ele1._id == ID) {
          res.render("compose", {
            heading: ele1.title,
            middle: ele1.body,
            ID: ID,
          });
        }
      });
    }
  );

  //   Diary.findOne( {_id : ID } , function( err , d )
  //   {
  //   //   day.forEach( function(d)
  //   // {
  //   //   var ttl = _.lowerCase(d.title);
  //   //
  //   //   if( ttl == a )
  //   //   {
  //   if( !err)
  //   {
  //     // console.log("match found for  -- " +d   );
  //     res.render(  "compose" , { heading : d.title , middle: d.body,    ID : ID  } ) ;
  //   }else
  //   {
  //     console.log("Again the id i got was " + ID) ;
  //   }
  //
  // })  ;
});
