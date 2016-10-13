var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var Announcement = require('./server/models/announcement');
var User = require('./server/models/user');
var basicAuth = require('basic-auth-connect');

mongoose.connect('mongodb://localhost:27017/announcements');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());


app.get('/api/users/current', function (req, res) {
    
    res.json({
        'username': req.user.username 
    });
});

app.get('/api/announcements', function (req, res) {

    Announcement.find(function (err, announcements) {

        if (err)
            res.send(err);
        else
            res.json(announcements);
    });
});

app.post('/api/announcements', function (req, res) {

    Announcement.create({
        text: req.body.text,
        author: req.user.username
    }, function (err, announcement) {

        if (err)
            res.send(err);
        else
            Announcement.find(function (err, announcements) {

                if (err)
                    res.send(err);
                else
                    res.status(201).json(announcements);
            });
    });
});

app.delete('/api/announcements/:announcement_id', function (req, res) {

    Announcement.remove({
        _id: req.params.announcement_id,
        author: req.user.username
    }, function (err, announcement) {

        console.log(announcement);
        if (err)
            res.send(err);
        else
            Announcement.find(function (err, announcements) {

                if (err)
                    res.send(err);
                res.json(announcements);
            });
    });
});

app.get('*', function (req, res) {
    res.sendFile('./public/index.html');
});

app.listen(8080);
console.log("App listening on port 8080");