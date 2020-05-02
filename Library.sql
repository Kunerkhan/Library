use petprojects;

create table Roles(
	role_id int auto_increment primary key,
    role_name varchar(20)
);

create table Users(
	user_id int auto_increment primary key,
	user_name varchar(20),
    user_password int,
    user_role int,
	foreign key(user_role) references Roles(role_id)
    on Delete Cascade 
    on Update Cascade
);

create table Permisions(
	permision_code int auto_increment primary key,
	permision_name varchar(20)
);

create table UserPermisions (
	code int auto_increment primary key,
    user_id int,
    permision_code int,
    foreign key(user_id) references Users(user_id)
    on Delete Cascade 
    on Update Cascade,
	foreign key(permision_code) references Permisions(permision_code)
    on Delete Cascade 
    on Update Cascade
);

create table Author(
	author_id int auto_increment primary key,
    author_name varchar(50)
);

create table Book(
	book_id int auto_increment primary key,
    book_name varchar(50)
);

create table Library (
	library_code int auto_increment primary key,
    author_id int,
    book_id int,
	foreign key(author_id) references Author(author_id)
    on Delete Cascade 
    on Update Cascade,
	foreign key(book_id) references Book(book_id)
    on Delete Cascade 
    on Update Cascade
);

create table Booking (
    date_of_issue date,
    date_of_return date,
    status_in boolean,
    user_id int,
    library_code int,
    foreign key(library_code) references Library(library_code)
    on Delete Cascade 
    on Update Cascade,
	foreign key(user_id) references Users(user_id)
    on Delete Cascade 
    on Update Cascade
);