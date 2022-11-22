const express = require('express');
const app = express();
const mongoose = require('mongoose');



app.listen(3000, ()=> {
    console.log('listening...');
});

const SurfSchema = require('./models/SSSchema.js')
const Surf = require('./models/SurfSpots.js')



//ROUTES

//HOMEPAGE

app.get('/surfspots', (req, res) => {
    // res.send('SoCal Surfing whaddup grommets')
    //The above was only a test
    SurfSchema.find({}, (err, allSpots) => {
        res.render('index.ejs', {
            surfSpots: allSpots
            //before colon is name of array as specified in index.ejs
            //after colon is the arbitrary parameter you assigned to represent all the surf spots
    })
    })
})

//ADD A SPOT ROUTE
app.get('/surfspots/new', (req, res) => {
    Surf.create(req.body, (err, newSpot) => {
        res.redirect('/surfspots')
    })
})

//SHOW ROUTE
app.get('/surfspots/:id', (req, res) => {
    Surf.findById(req.params.id, (err, foundSpot) => {
        res.render('show.ejs', {
            foundSpot
        })
    })
})


//SEED
app.get('/surfspots/seed', (req, res) => {
    SurfSchema.create(Surf, (err, data) => {
        console.log('surf spots seeded')
        res.redirect('/surfspots')
    })
})

//CONNECTING MONGOOSE
const db = mongoose.connection
mongoose.connect('mongodb://localhost:27017/surfspots', () => {
  console.log('mongod is in the building')
})

//ERROR MESSAGING
db.on('error', err => console.log(err.message))
db.on('connected', () => console.log('mongo connected', 'mongodb://localhost:27017/surfspots'))
db.on('disconnected', () => console.log('mongo disconnected'))