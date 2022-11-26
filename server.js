const express = require('express');
const app = express();
const mongoose = require('mongoose');

//MIDDLEWARE
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));



const SurfingSpot = require('./models/SSSchema.js')
// const Surf = require('./models/SurfSpots.js');
const SurfSchema = require('./models/SurfSpots.js');



// SEED
// app.get('/surfspots/seed', (req, res) => {
//     SurfingSpot.create(SurfSchema, (err, data) => {
//         console.log('surf spots seeded')
//         res.redirect('/surfspots')
//     })
// })

//GET ROUTES

//CREATE ROUTE
app.get('/surfspots/new', (req, res)=>{
    res.render('create.ejs')
})


//HOMEPAGE

app.get('/surfspots', (req, res) => {
    // res.send('SoCal Surfing whaddup grommets')
    //The above was only a test
    SurfingSpot.find({}, (err, allSpots) => {
        res.render('index.ejs', {
            spots: allSpots
            //before colon is name of array as specified in index.ejs
            //after colon is the arbitrary parameter you assigned to represent all the surf spots
        })
    })
})


//ACTION ROUTES

app.post('/surfspots/new', (req, res) => {
    SurfingSpot.create(req.body, (err, data) => {
        console.log(req.body)
        res.redirect('/surfspots')
    })
})
//when you create something you're posting into the database

// SHOW ROUTE
app.get('/surfspots/:id', (req, res) => {
    SurfingSpot.findById(req.params.id, (err, foundSpot) => {
        res.render('show.ejs', {
            spot: foundSpot
        })
    })
})

//EDIT ROUTE
app.get('/surfspots/:id/edit', (req, res) => {
    SurfingSpot.findById(req.params.id, (err, chosenSpot) => {
        res.render('edit.ejs', {
            spot: chosenSpot
        })
    })
})
//ACTION FOR THE EDIT ROUTE
app.put('/surfspots/:id', (req, res) => {
    SurfingSpot.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedSpot) => {
        res.redirect('/surfspots')
    })
})


//DELETE
app.delete('/surfspots/:id', (req, res) => {
    SurfingSpot.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/surfspots')
    })
})

//CONNECTING MONGOOSE
const db = mongoose.connection
mongoose.connect('mongodb://localhost:27017/surfspots', () => {
    console.log('mongod is in the building')
})
// SurfingSpots.countDocuments({}, (err, data) => {
//     if (err) console.log(err.message)
//     console.log(`There are ${data} spots in this database`)
// })

//ERROR MESSAGING
db.on('error', err => console.log(err.message))
db.on('connected', () => console.log('mongo connected', 'mongodb://localhost:27017/surfspots'))
db.on('disconnected', () => console.log('mongo disconnected'))

//FOR THE BROWSER
app.listen(3000, ()=> {
    console.log('listening...');
});