CREATE TABLE IF NOT EXISTS users(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    firstname VARCHAR(10),
    lastname VARCHAR(10),
    username VARCHAR(20) UNIQUE,
    password VARCHAR(70)
);
CREATE TABLE IF NOT EXISTS todos(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(50),
    description TEXT,
    due_date DATE,
    assigned_to BIGINT REFERENCES users(id),
    completed BOOLEAN DEFAULT false,
    owner BIGINT NOT NULL REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS sessions(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    hash_id VARCHAR(50) UNIQUE NOT NULL,
    created_at Date DEFAULT now() NOT NULL,
    exprired BOOLEAN DEFAULT false,
    owner BIGINT REFERENCES users(id)
);