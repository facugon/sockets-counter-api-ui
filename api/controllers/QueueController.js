/**
* QueueController
*
* @module      :: Controller
* @description	:: A set of functions called `actions`.
*
*                 Actions contain code telling Sails how to respond to a certain type of request.
*                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
*
*                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
*                 and/or override them with custom routes (`config/routes.js`)
*
*                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
*
* @docs        :: http://sailsjs.org/#!documentation/controllers
*/

var QueueController = {


    /**
    * Action blueprints:
    *    `/queue/current`
    */
    current: function (req, res) {

        Queue.findOne({ name : req.param('name') }, function(err, queue){
            if (err) return next(err);

            return res.json(queue.counter);
        });
    },


    /**
    * Action blueprints:
    *    `/queue/next`
    */
    next: function (req, res) {

        Queue.findOne({ name : req.param('name') }, function(err, queue){
            if (err) return next(err);

            return res.json(queue.counter + 1);
        });
    },


    /**
    * Action blueprints:
    *    `/queue/restart`
    */
    restart: function (req, res) {

        Queue.findOne({ name : req.param('name') }, function(err, queue){
            if (err) return next(err);

            queue.counter = 0;
            queue.save(function(err){
                Queue.publishUpdate(queue.id,{ queue: queue });
                // Send a JSON response
                return res.json(queue.counter);
            });
        });
    },


    /**
    * Action blueprints:
    *    `/queue/increase`
    */
    increase: function (req, res) {

        Queue.findOne({ name : req.param('name') }, function(err, queue){
            if (err) return next(err);

            queue.counter++;
            queue.save(function(err){
                Queue.publishUpdate(queue.id,{ queue: queue });
                // Send a JSON response
                return res.json(queue.counter);
            });
        });
    },

    
    subscribe: function(req, res) {

        Queue.findOne({name: req.param('name')},function(err,queue){
            if (err) return next(err);

            //Queue.subscribe(req.socket);
            Queue.subscribe(req.socket, [queue]);

            res.send(queue,200);
        });
    },


    /**
    * Overrides for the settings in `config/controllers.js`
    * (specific to QueueController)
    */
    _config: {}

}

module.exports = QueueController ;
