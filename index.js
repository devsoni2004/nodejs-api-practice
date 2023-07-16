const express = require("express");
var cookieParser = require("cookie-parser");

const app = express();

const DB = {
  table_ids: { users: 1 },
  users: {},
};

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json()); // middleware
app.use(cookieParser());

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/:page", (req, res) => {
  const page = req.params.page;
  // Get User Restricted Pages [p2]
  const restrictedPages = ["p2"];
  if (restrictedPages) res.render(`pages/${page}`);
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    DB.users[DB.table_ids.users] = { name, email, password };
    console.log(JSON.stringify(DB, null, 2));
    DB.table_ids.users += 1;
    // res.redirect("/login");
    res.status(200).json(DB);
  } catch (err) {
    console.log(err);
    res.send(500).send(err);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username, password: password });
    if (user) {
      return res.status(200).json({ User: user });
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

app.get("/home", async (req, res) => {
  const cookies = req.cookies;
  if (cookies.token && isValid(token)) {
    res.render("home");
  } else {
    res.redirect("login");
  }
});

app.listen(3000, async () => {
  try {
    // Initiate DB
  } catch (error) {
    console.log(error);
  }
  console.log("Server is Running on port 3000");
});
