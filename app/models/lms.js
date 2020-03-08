var mongoose = require('mongoose');

module.exports = mongoose.model('lms', {
    code :{
        type: Number,
        default : 0
    },
    time :{
        type: String,
        default : ""
    },
    finishedTime :{
        type: String,
        default : ""
    },
    task :{
        type: Number,
        default : 0
    },
    totalLostMin :{
        type: Number,
        default : 0
    },
    finished :{
        type : Boolean,
        default : false
    }
});

