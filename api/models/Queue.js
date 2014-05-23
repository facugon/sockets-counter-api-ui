/**
 * Queue
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var Queue = {

    attributes: {
        name : {
            type : 'STRING',
            defaultsTo : 'Unamed Queue'
        },
        counter : {
            type : 'INTEGER',
            defaultsTo : 0
        }
    }

}

module.exports = Queue;
