var mongoose = require('mongoose');

module.exports = mongoose.model('Announcement', {
    author: String,
    date: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String,
        default: ''
    }
});