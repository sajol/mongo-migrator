const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Course = mongoose.model('Course');

router.get('/', (req, res) => {
    res.render("course/upsert", {
        viewTitle: "Add Course"
    });
});

router.post('/', (req, res) => {
    upsertRecord(req, res);
});

function upsertRecord(req, res) {
    let options = {upsert: true, new: true};
    Course.findOneAndUpdate({code: req.body.code}, req.body, options, (err, doc) => {
        if (!err) {
            res.redirect('course/list');
        } else {
            if (err.name === 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("course/upsert", {
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
            res.render("course/upsert", {
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
