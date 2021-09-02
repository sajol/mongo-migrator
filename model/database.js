const mongoose = require('mongoose');
require ('./course')

mongoose.connect('mongodb://localhost:27017/courses', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('Connection successful.') }
    else { console.log('Error connecting mongodb : ' + err) }
});


