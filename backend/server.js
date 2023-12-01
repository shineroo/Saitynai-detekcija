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
const oauthRouter = require("./routes/oauth");
const requestRouter = require("./routes/request");

app.use(express.json());
app.use(
    express.urlencoded({ 
        extended: true,
    })
);
app.use(cors());


// API requests
app.use("/api/categories", categoriesRouter);
app.use("/api/products", productsRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/category", hierarchicalRouter);
app.use("/api/oauth", oauthRouter);
app.use("/api/request", requestRouter);

app.get('/health', (req, res) => {
    res.send('Backend server is running');
});

app.get('/', (req, res) => {
    res.send('Hello:]');
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