-- Insert sample data into the EchoBoard table
INSERT INTO echo_board (id, title, content, author, upvote, created)
VALUES
    (1, 'Problem with contract', 'Contract signing software if too slow and unpredictable', 'John Smith', 10, NOW()),
    (2, 'I think my colleges hate me', 'Or maybe they are just jealous?', 'Arnold Vots', 2, NOW()),
    (3, 'Accountant Department', 'I am constantly getting a wrong salary, we need to find a way to fix it', 'Magdalene Von Brue', 5, NOW());

-- Insert sample data into the EchoBoardComment table
INSERT INTO echo_board_comment (id, echo_board_id, author, comment, upvote)
VALUES
    (1, 1, 'Mark Zukkerberg', 'Lets fix it quickly', 55),
    (2, 1, 'Mitch Way', 'For its fine.. I like to take my time', 3),
    (3, 2, 'Jessica Carpenter', 'I dont really like you', 25),
    (4, 2, 'Max Mazzers', 'You need to stop behaving the way you do', 35),
    (5, 2, 'Sussan Semolita', 'Try to be nicer to everyone', 10),
    (6, 3, 'Veronica Newton', 'That is an issue that needs to be addressed', 17);
