// i guess server.js is a good name?
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 8080;
const categoriesRouter = require("./routes/categories");
const productsRouter = require("./routes/products");
const reviewsRouter = require("./routes/reviews");
const hierarchicalRouter = require("./routes/hierarchical");
const authRouter = require("./routes/auth");
const oauthRouter = require("./routes/oauth");
const requestRouter = require("./routes/request");

const jwt = require('jsonwebtoken');


app.use(express.json());
app.use(
    express.urlencoded({ 
        extended: true,
    })
);
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));


// API requests
app.use("/api/categories", categoriesRouter);
app.use("/api/products", productsRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/categories", hierarchicalRouter);
app.use("/api/oauth", oauthRouter);
app.use("/api/request", requestRouter);
app.use("/api/auth", authRouter);

app.get('/health', (req, res) => {
    res.send('Backend server is running');
});

// i have brain damage
app.get('/api/authenticated', (req, res) => {
    const token = req.headers.authorization;
    console.log("This guy wants to know if he's in")
    console.log("bro said my token is " + token)
    if (!token) {
        console.log("the fool actually forgot his token")
      return res.json({ authenticated: false });
    }
  
    try {
        const decoded = jwt.verify(token.split(" ")[1], "secret");
        console.log(`looks good. role: ${decoded.role}`)
        res.json({ authenticated: true, role: decoded.role, name: decoded.name, picture: decoded.picture });
    } catch (error) {
        console.log("what a moron. " + error)
        res.json({ authenticated: false });
    }
    
});

// error handler? (i dont get it)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});


app.listen(port, () => {
    console.log(`server running on port ${port}`);
})