CREATE TABLE express_schema.post (
    id SERIAL PRIMARY KEY,
    text VARCHAR(30000),
    title VARCHAR(100),
    date DATE,
    author VARCHAR(100)
);


CREATE TABLE express_schema.contact (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    link VARCHAR(255)
);

