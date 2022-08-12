CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  product_id integer NOT NULL,
  quantity integer NOT NULL,
  status VARCHAR(255) NOT NULL,
  user_id integer NOT NULL
);

