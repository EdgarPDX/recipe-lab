DROP TABLE IF EXISTS logs;
DROP TABLE IF EXISTS recipes;

CREATE TABLE recipes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  directions TEXT[]
);

CREATE TABLE logs (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  recipe_id BIGINT NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  date_of_event TEXT NOT NULL,
  notes TEXT NOT NULL,
  rating INT NOT NULL
);

