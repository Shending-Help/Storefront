CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id integer NOT NULL,
  product_id integer NOT NULL,
  quantity integer NOT NULL
);