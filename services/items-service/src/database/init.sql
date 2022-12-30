-- CQL commands to initialize the Items table

-- create `store` keyspace
CREATE KEYSPACE IF NOT EXISTS store WITH REPLICATION = {'class' : 'SimpleStrategy', 'replication_factor' : 1};
-- create `items` table
CREATE TABLE IF NOT EXISTS store.items (id text PRIMARY KEY, name text, description text, price float, bought Boolean);
-- create index on `bought`
CREATE INDEX ON store.items (bought);