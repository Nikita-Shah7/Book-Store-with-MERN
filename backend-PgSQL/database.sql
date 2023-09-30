CREATE DATABASE IF NOT EXISTS nik1;


-- REALTION 1 :: Book
CREATE TABLE IF NOT EXISTS "Book"(
    _id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    author VARCHAR NOT NULL,
    "publishYear" INT NOT NULL
);

INSERT INTO "Book"(title, author, "publishYear") VALUES
    ('Jog Sanjog', 'Harkishan Mehta', 1999),
    ('Mukti Bandhan', 'Harkishan Mehta', 1999),
    ('Othaar', 'Ashwini Bhatt', 1990),
    ('Fasloo', 'Ashwini Bhatt', 2001);

SELECT * FROM "Book";

DROP TABLE "Book";


-- REALTION 2 :: User
CREATE TABLE IF NOT EXISTS "User"(
    _id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL
);

INSERT INTO "User"(username, "password") VALUES
    ('mok1','mok1'),
    ('mok2','mok2');

SELECT * FROM "User";

DROP TABLE "User";


-- REALTION 3 :: Admin
CREATE TABLE IF NOT EXISTS "Admin"(
    _id SERIAL PRIMARY KEY,
    adminname VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL
);

INSERT INTO "Admin"(adminname, "password") VALUES
    ('r1','r1');

SELECT * FROM "Admin";

DROP TABLE "Admin";