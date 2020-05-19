    var mysql = require('mysql');

    var connection = mysql.createConnection({
        host     : '127.0.0.1',
        user : 'root',
        password : 'password',
        database : 'rkp',
        define: {
            timestamps: false
          }
    });

    connection.connect(function(err){
        if(!err) {
            console.log("Database is connected ... nn");
        } else {
            console.log("Error connecting database ... nn");
        }
    });

    module.export = connection;