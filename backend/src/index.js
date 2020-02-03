require("dotenv").config({ path: "variables.env" });
const createServer = require("./createServer");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const db = require("./db");
const server = createServer();

server.use(cookieParser());

// pull the jwt token from cookies if it exists and verify it

server.use(async (req, res, next) => {
  const token = req.cookies.token || req.get("token");
  if (token) {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = id;
  }
  next();
});

server.use(async (req, res, next) => {
  if (!req.userId) {
    return next();
  }
  const user = await db.query.user(
    { where: { id: req.userId } },
    "{email, id, name, permissions}"
  );
  req.user = user;
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  props =>
    console.log(`GQL Server is running on http://localhost:${props.port}`)
);
