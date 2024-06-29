const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app=express();
const PORT = 3000;

//Connect to Mongo DB
mongoose.connect('mongodb://localhost:27017/mydatabase', {useNewUrlParser: true, useUnifiedTopology: true});

//Middleware
app.use(bodyParser.json);

//Start Server
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:${PORT}");
});

const Item = require('./models/Item.js');

// CREATE
app.post('/items', async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).send(item);
    } catch (error) {
        res.status(400).send(error);
    }
});

// READ (all items)
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find({});
        res.send(items);
    } catch (error) {
        res.status(500).send(error);
    }
});

// READ (single item)
app.get('/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).send();
        }
        res.send(item);
    } catch (error) {
        res.status(500).send(error);
    }
});

// UPDATE
app.patch('/items/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) {
            return res.status(404).send();
        }
        res.send(item);
    } catch (error) {
        res.status(400).send(error);
    }
});

// DELETE
app.delete('/items/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).send();
        }
        res.send(item);
    } catch (error) {
        res.status(500).send(error);
    }
});