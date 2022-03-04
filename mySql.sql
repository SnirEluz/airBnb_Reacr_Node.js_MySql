create database airbnb;

USE server;

create table users (
     id int auto_increment,
     firstName varchar(3000),
     lastName varchar(3000),
     userName varchar(3000),
     passWord int,
     role varchar(3000) default "user",
     primary key(id)
);

create table vacations (
     id int auto_increment,
     info varchar(3000),
     destination varchar(3000),
     image varchar(3000),
	startDate varchar(3000),
     endDate varchar(3000),
     price varchar(3000),
     followers int default 0,
     primary key(id)
);

create table followers (
     id int auto_increment,
     userName varchar(3000),
     userId int,
     vacationsId int,
     primary key(id),
     foreign key(vacationsId) references vacations(id)
);


"Insert Followers"
insert into followers(userName, userId, vacationsId)
values ("snireluz", 12, 1)

"Insert user"
INSERT INTO users (firstName, lastName, userName, passWord)
VALUES("John","Johana","john",1)

"Insert Admin"
INSERT INTO users (firstName, lastName, userName, passWord, role)
VALUES("Admin","Admin","admin",1,"admin")


