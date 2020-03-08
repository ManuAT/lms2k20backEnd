var mongoose = require('mongoose');

module.exports = mongoose.model('info', {
    sno :{
        type: Number,
        default : 0
    },
    info :{
        type : String,
        default : ""
    }

});