const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    code: {
        type: String
    },
    name: {
        type: String
    }
});
mongoose.model('Course', courseSchema);
