-- Create the echo_board table
CREATE TABLE echo_board (
                            id BIGINT NOT NULL AUTO_INCREMENT,  -- Primary Key with auto-increment
                            title VARCHAR(255),
                            content TEXT,
                            author VARCHAR(255),
                            upvote INT,
                            created TIMESTAMP,
                            PRIMARY KEY (id)
);


INSERT INTO echo_board (title, content, author, upvote, created)
VALUES ('Project Deadline Delayed',
        'We are facing challenges in meeting the project deadline due to resource constraints. Let''s discuss possible solutions.','John Doe', 8, '2023-09-21T10:00:00Z');


