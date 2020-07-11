    var mysql = require('mysql');

    var connection = mysql.createConnection({
        host     : 'localhost',
        user : 'root',
        password : 'password',
        database : 'lib_2_JS',
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