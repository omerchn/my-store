-- create keyspace
CREATE KEYSPACE IF NOT EXISTS garagesale  WITH REPLICATION = {'class' : 'SimpleStrategy', 'replication_factor' : 1};
-- create table
CREATE TABLE IF NOT EXISTS garagesale.items (id text PRIMARY KEY, name text, description text, price float, bought Boolean);
-- create index
CREATE INDEX ON garagesale.items (bought);