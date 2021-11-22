DROP DATABASE IF EXISTS banana;
CREATE DATABASE banana;

USE banana;

DROP TABLE IF EXISTS person;

CREATE TABLE person(
    person_id INTEGER NOT NULL
    AUTO_INCREMENT PRIMARY KEY
    COMMENT 'The unique id of a person',
    firstname VARCHAR(20) NOT NULL
    COMMENT 'The firstname of a person',
    lastname VARCHAR(20) NOT NULL
    COMMENT 'The lastname of a person'
);