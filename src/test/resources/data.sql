SELECT * FROM "ECHO_BOARD";
-- ALTER TABLE "ECHO_BOARD_COMMENT, ECHO_BOARD"
--     ALTER COLUMN upvote SET DEFAULT 0;

INSERT INTO "ECHO_BOARD" (title, content, author, upvote)
VALUES ('Misaligned Goals Between Sales and Product Development', 'The misalignment of goals between our sales and product development departments is a persistent challenge. Sales often pushes for new features or changes that may not align with the long-term product strategy. This disconnect can result in frequent scope changes, delays, and customer dissatisfaction.', 'Product Manager', 0);

INSERT INTO "ECHO_BOARD" (title, content, author, upvote)
VALUES ('Lack of Collaboration Between Marketing and Engineering', 'The lack of collaboration between our marketing and engineering teams has been hindering product launches. Marketing might promise features or release dates without consulting engineering, leading to unrealistic expectations and strained relationships. Improved communication and collaboration are essential to avoid such conflicts.', 'Marketing Manager', 0);

INSERT INTO "ECHO_BOARD" (title, content, author, upvote)
VALUES ('Data Sharing Challenges Between IT and Finance', 'Data sharing between our IT and finance departments has become a significant hurdle. Finance relies on timely and accurate data from IT systems for financial reporting, but IT often struggles to prioritize and deliver these requests promptly. This disconnect affects financial planning and decision-making.', 'Finance Director', 0);

INSERT INTO "ECHO_BOARD" (title, content, author, upvote)
VALUES ('Conflicting Priorities Between HR and Operations', 'HR and operations often have conflicting priorities. HR aims to enhance employee well-being, while operations focus on productivity and cost-efficiency. Balancing these competing goals can be challenging, and it requires a coordinated effort to find common ground and achieve organizational success.', 'HR Director', 0);

INSERT INTO "ECHO_BOARD" (title, content, author, upvote)
VALUES ('Communication Gaps Between Customer Support and R&D', 'Communication gaps between our customer support and research and development (R&D) teams have led to customer dissatisfaction. Customer support may not adequately convey customer feedback and issues to R&D, resulting in product improvements being delayed or overlooked. Bridging these gaps is crucial for product enhancement.', 'Customer Support Manager', 0);

INSERT INTO "ECHO_BOARD_COMMENT" (echo_board_id, id, content, author, upvote)
VALUES (1, 1,'I would like to add my opinion', 'Anon', 0)
