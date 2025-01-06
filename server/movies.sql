DROP TABLE IF EXISTS movies;
CREATE TABLE IF NOT EXISTS movies(
  id         INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  movieName  VARCHAR(50) NOT NULL,
  genre      VARCHAR(20) NOT NULL,
  rating     FLOAT NOT NULL CHECK(rating BETWEEN 0 AND 10)
);

INSERT INTO movies(movieName, genre, rating) VALUES ("Inception", "Sci-Fi", 8.8);
INSERT INTO movies(movieName, genre, rating) VALUES ("The Godfather", "Crime", 9.2);
INSERT INTO movies(movieName, genre, rating) VALUES ("Pulp Fiction", "Drama", 8.9);
INSERT INTO movies(movieName, genre, rating) VALUES ("The Lord of the Rings: The Fellowship of the Ring", "Fantasy", 8.9);
INSERT INTO movies(movieName, genre, rating) VALUES ("The Lord of the Rings: The Two Towers", "Fantasy", 8.8);
INSERT INTO movies(movieName, genre, rating) VALUES ("The Lord of the Rings: The Return of the King", "Fantasy", 9.0);
INSERT INTO movies(movieName, genre, rating) VALUES ("Monty Python and the Holy Grail", "Komedi", 8.2);
INSERT INTO movies(movieName, genre, rating) VALUES ("Life of Brian", "Komedi", 8.0);
INSERT INTO movies(movieName, genre, rating) VALUES ("Mad Max: Fury Road", "Action", 8.1);
INSERT INTO movies(movieName, genre, rating) VALUES ("The Exorcist", "Skräck", 8.1);

SELECT * FROM movies;
