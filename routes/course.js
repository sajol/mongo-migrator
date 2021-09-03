const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Course = mongoose.model('Course');

router.get('/', (req, res) => {
    res.render("course/addOrEdit", {
        viewTitle: "Add Course"
    });
});

router.post('/', (req, res) => {
    if (req.body.code === '') {
        insertRecord(req, res);
    } else {
        updateRecord(req, res);
    }
});


function insertRecord(req, res) {
    const course = new Course();
    course.code = req.body.code;
    course.name = req.body.name;
    course.save((err, doc) => {
        if (!err) {
            res.redirect('course/list');
            console.log(doc);
        } else {
            if (err.name === 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("course/addOrEdit", {
                    viewTitle: "Add Course",
                    employee: req.body
                });
            } else
                console.log('Error while adding course : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Course.findOneAndUpdate({code: req.body.code}, req.body, {new: true}, (err, doc) => {
        if (!err) {
            res.redirect('course/list');
        } else {
            if (err.name === 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("course/addOrEdit", {
                    viewTitle: 'Update Course',
                    employee: req.body
                });
            } else {
                console.log('Error while updating course : ' + err);
            }
        }
    });
}


router.get('/list', (req, res) => {
    Course.find((err, docs) => {
        if (!err) {
            res.render("course/list", {
                list: docs
            });
        } else {
            console.log('Error while retrieving course list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            case 'code':
                body['codeError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:code', (req, res) => {
    Course.findOne({code: req.params.code}, (err, doc) => {
        if (!err) {
            res.render("course/addOrEdit", {
                viewTitle: "Update Course",
                course: doc
            });
        }
    });
});

router.get('/delete/:code', (req, res) => {
    Course.deleteOne({code: req.params.code}, (err, doc) => {
        if (!err) {
            res.redirect('/course/list');
        } else {
            console.log('Error while deleting course :' + err);
        }
    });
});

module.exports = router;
