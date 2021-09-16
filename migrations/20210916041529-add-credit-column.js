module.exports = {
    async up(db, client) {
        return db.collection('courses').updateMany({}, {$set: {credit: null}})
    },

    async down(db, client) {
        return db.collection('courses').updateMany({}, {$unset: {credit: 1}});
    }
};
