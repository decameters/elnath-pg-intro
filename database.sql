CREATE TABLE shoes (
	id SERIAL PRIMARY KEY,
	name VARCHAR(80),
	cost INTEGER
);

INSERT INTO shoes (name, cost)
VALUES ('Frye Boots', 350),
('Yeezys', 220),
('Space Boots', 10);