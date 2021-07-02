require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const authenticateUser = require("./middlewares/authenticateUser");
const { Db } = require("mongodb");
const User = require("./models/User");
const app = express();
const PORT = process.env.PORT || 4000;

// Database connection
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', ()=> console.log("connected to the database"));

//middlewares

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(
    session({
        secret: 'my secret key',
        saveUninitialized: true,
        resave: false
    })
);

app.use((req, res, next)=> {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});
app.use(express.static("uploads"));


// Set template set
app.set('view engine', 'ejs');

// routes
app
  .get("/", (req, res) => {
    res.render("index");
  })
  .get("/login", (req, res) => {
    res.render("login");
  })
  .get("/register", (req, res) => {
    res.render("register");
  })

  .get("/home", authenticateUser, (req, res) => {
    res.render("home", { user: req.session.user });
  });

  // route for handling post requirests
app
.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // check for missing filds
  if (!email || !password) {
    res.send("Please enter all the fields");
    return;
  }

  const doesUserExits = await User.findOne({ email });

  if (!doesUserExits) {
    res.send("invalid username or password");
    return;
  }

  const doesPasswordMatch = await bcrypt.compare(
    password,
    doesUserExits.password
  );

  if (!doesPasswordMatch) {
    res.send("invalid useranme or password");
    return;
  }

  // else he\s logged in
  req.session.user = {
    email,
  };

  res.redirect("/home");
})
.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // check for missing filds
  if (!email || !password) {
    res.send("Please enter all the fields");
    return;
  }

  const doesUserExitsAlreay = await User.findOne({ email });

  if (doesUserExitsAlreay) {
    res.send("A user with that email already exits please try another one!");
    return;
  }

  // lets hash the password
  const hashedPassword = await bcrypt.hash(password, 12);
  const latestUser = new User({ email, password: hashedPassword });

  latestUser
    .save()
    .then(() => {
      res.send("registered account!");
      return;
    })
    .catch((err) => console.log(err));
});

//logout
app.get("/logout", authenticateUser, (req, res) => {
req.session.user = null;
res.redirect("/login");
});

app.use("", require("./routes/routes"));

app.listen(PORT, ()=> {
    console.log("Server started at http://localhost:5000");
});