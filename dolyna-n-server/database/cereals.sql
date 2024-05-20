create TABLE cereals(
   _id SERIAL PRIMARY KEY ,
   name_ua VARCHAR(50) NOT NULL,
   name_en VARCHAR(50) NOT NULL,
   description_ua VARCHAR(255),
   description_en VARCHAR(255),
   image VARCHAR(255) NOT NULL
);