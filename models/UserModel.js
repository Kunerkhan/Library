let mysql = require("../db");

class User {
    constructor(id, name, password, role)
    {
        this.id = id;
        this.name = name;
        this.password = password;
        this.role = role;
    }

    getAllUSerBooks(result) {
        mysql.query("Select * from UserBooks where user_id ? ". id, (err, res) => {
            if(err)
            {
                console.log(err)
            }
            else{
                result(null, res);
            }
        })
    }

    addBook(book, result)
    {
        sql.query("INSERT INTO UserBooks  where userId ? set ?", id, book, function (err, res) {
                
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                console.log(res.insertId);
                result(null, res.insertId);
            }
        });
    }
}