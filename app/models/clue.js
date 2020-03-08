var mongoose = require('mongoose');

module.exports = mongoose.model('clue', {
    sno :{
        type: Number,
        default : 0
    },
    clue :{
        type : String,
        default : ""
    }

});