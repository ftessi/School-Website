CREATE DATABASE ColegioWeb;

CREATE TABLE publicacion(
    publication_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255),
    image_id VARCHAR(255),
    publication_date VARCHAR(255),
    last_edit VARCHAR(255),
    calendar_date VARCHAR(255),
);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(255),
    privileges VARCHAR(50),
    email VARCHAR(255) UNIQUE,
    refreshtoken VARCHAR(500) UNIQUE
);