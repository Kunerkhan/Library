class LibraryModel {

    constructor(bookName, bookAuthor)
    {
        this.bookName = bookName;
        this.bookAuthor = bookAuthor;
    }

    getAllBooks(result) {
        mysql.query("Select * from Library", (err, res) => {
            if(err)
            {
                console.log(err)
            }
            else{
                result(null, res);
            }
        })
    }

}