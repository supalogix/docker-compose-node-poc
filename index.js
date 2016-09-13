import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

const ip = process.env["DB_PORT_27017_TCP_ADDR"];
const port = 27017;

console.log(port);
console.log(process.env);

mongoose.connect(`mongodb://${ip}:${port}/myappdatabase`);

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String
});

const User = mongoose.model('User', userSchema);

const app = express();
app.use( bodyParser.json() );
app.use( cors() );

app.get("/", (request, response) => {


  var chris = new User({
    name: 'Chris',
  });
  chris.save((error) => {
    if(error)
      console.log("error");

    console.log("saved successfully");
  });

  response.json({"key": "value"});
});

app.get("/users", (request, response) => {
  User.find({}, function(err, users) {
    if (err) throw err;

    // object of all the users
    console.log(users);
    response.json(users);
  });
});

app.listen("8080", () => {
  console.log("listening on 8080");
});
