-- CREATE DATABASE t_g_twitter;

USE t_g_twitter;

-- CREATE TABLE users
-- (username varchar(15),
--  first varchar(15),
--  last varchar(15),
--  createdAt date,
--  email varchar(10),
--  password varchar(15));

-- CREATE TABLE tweets
-- (user INT,
--  tweet text);

-- CREATE TABLE followed_following_relationship
-- (followed INT,
--  following INT);

-- CREATE TABLE hashtags
-- (hashtag text);

-- CREATE TABLE tweet_hashtag_relationship
-- (tweet_ID INT,
--  hashtag_ID INT);

INSERT into users
(username, first, last, createdAt, email, password)
values ('Jonie-W-W', 'Jonie', 'Weber-Williams', '20100301', 'g@j.com', 'password');