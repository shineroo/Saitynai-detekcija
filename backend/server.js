// i guess server.js is a good name?
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3001;
const categoriesRouter = require("./routes/categories");
const productsRouter = require("./routes/products");
const reviewsRouter = require("./routes/reviews");

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