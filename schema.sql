CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
message text,
username varchar(30)
);

CREATE TABLE users (
username text
);

CREATE TABLE rooms (
name varchar(30)
);

/* You can also create more tables, if you need them... */

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/