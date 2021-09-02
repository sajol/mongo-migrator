module.exports = {
    async up(db, client) {
        const courses = [
            {
                "code": "CSE707",
                "name": "Distributed Computing"
            },
            {
                "code": "CSE710",
                "name": "Advanced Artificial Intelligence"
            },
            {
                "code": "CSE716",
                "name": "Advanced Database System"
            }
        ];
        await db.collection('courses').insertMany(courses);
    },

    async down(db, client) {
        await db.collection('courses').deleteMany({or: [{"code": "CSE707"}, {"code": "CSE710"}, {"code": "CSE716"}]});
    }
};
