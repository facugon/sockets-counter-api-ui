/**
 * app.js
 *
 * This file contains some conventional defaults for working with Socket.io + Sails.
 * It is designed to get you up and running fast, but is by no means anything special.
 *
 * Feel free to change none, some, or ALL of this file to fit your needs!
 */


(function (io) {

    // as soon as this file is loaded, connect automatically, 
    var socket = io.connect();

    socket.on('connect', function socketConnected() {

        // Listen for Comet messages from Sails
        socket.on('message', function messageReceived(message) {
            $('h1 .counter').html( message.data.queue.counter );
            $('a .counter').html( message.data.queue.counter + 1 );
        });

        socket.get('/queue/subscribe?name=A',function(res){
            $('h1 .counter').html( res.counter );
            $('a .counter').html( res.counter + 1 );
        });


    });


    // Expose connected `socket` instance globally so that it's easy
    // to experiment with from the browser console while prototyping.
    window.socket = socket;


    // Simple log function to keep the example simple
    function log () {
        if (typeof console !== 'undefined') {
            console.log.apply(console, arguments);
        }
    }


})(

  // In case you're wrapping socket.io to prevent pollution of the global namespace,
  // you can replace `window.io` with your own `io` here:
  window.io

);
