CREATE DATABASE IF NOT EXISTS lupi_test;

USE lupi_test;

CREATE TABLE IF NOT EXISTS wiki_posts
(
    id        INT PRIMARY KEY AUTO_INCREMENT,
    url       VARCHAR(1024) NOT NULL,
    title     TEXT          NOT NULL,
    parentUrl VARCHAR(1024),
    level INT
);