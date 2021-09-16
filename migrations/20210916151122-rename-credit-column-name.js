module.exports = {
    async up(db, client) {
        db.collection('courses').updateMany({}, {$rename: {credit: 'course_credit'}})
    },

    async down(db, client) {
        db.collection('courses').updateMany({}, {$rename: {course_credit: 'credit'}})
    }
};
