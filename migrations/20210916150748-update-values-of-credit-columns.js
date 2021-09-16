module.exports = {
  async up(db, client) {
      return db.collection('courses').updateMany({}, {$set: {credit: 3}})
  },

  async down(db, client) {
      return db.collection('courses').updateMany({}, {$set: {credit: null}})
  }
};
