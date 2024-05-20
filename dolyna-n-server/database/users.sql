create TABLE users(
   _id SERIAL PRIMARY KEY,
   user_name VARCHAR(100),
   user_surname VARCHAR(100),
   user_password VARCHAR(100),
   user_email VARCHAR(100),
   user_phone VARCHAR(20),
   company_name VARCHAR(200),
   last_order JSONB
);