
module.exports.adapters = {
    'default': 'disk',
    disk:{
        module:'sails-disk'
    },
    mongo: {
        module   : 'sails-mongo',
        host     : 'localhost',
        port     : 27017,
        user     : 'queueadmin',
        password : 'AZt5g51CXKt41SVb',
        database : 'queue'
    }
};
