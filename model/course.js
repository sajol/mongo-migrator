const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    id: {
        type: String,
        //required: 'This field is required.'
    },
    code: {
        type: String
    },
    name: {
        type: String
    },
    description: {
        type: String
    }
});
mongoose.model('Course', courseSchema);
