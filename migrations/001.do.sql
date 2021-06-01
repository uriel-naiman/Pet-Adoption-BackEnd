CREATE TABLE IF NOT EXISTS users (
  id                 VARCHAR(36) DEFAULT (UUID()),
  email              VARCHAR(255) NOT NULL,
  password_hash      VARCHAR(255) NOT NULL,
  first_name         VARCHAR(36) NOT NULL,
  last_name          VARCHAR(36) NOT NULL,
  phone_number       VARCHAR(20) NOT NULL, 
  created_date       DATE DEFAULT (CURRENT_DATE),
  role VARCHAR(10)   DEFAULT ('user'),
  PRIMARY KEY (id)
);

INSERT INTO users (email, password_hash, first_name, last_name, phone_number) VALUES ('yonatan@example.com', '$2y$10$wqePdaOMafCGIC1ZwgrQxeAh1WZN6I1.q3K32hOctgixmcVogX63S', 'yonatan', 'malichi', '0546543212');
INSERT INTO users (email, password_hash, first_name, last_name, phone_number) VALUES ('hakatan@example.com', '$2y$10$m6ljnKdsXbPb8RciABBjru57oYGJXy8HVgVNAjHiLzfju3VciiQ3.', 'hakatan', 'lenovo', '0523456788');
INSERT INTO users (email, password_hash, first_name, last_name, phone_number) VALUES ('raz@example.com', '$2y$10$RoEm9rS4QNbkD6tws2pTMuYAxY6EVFP5JNax.v4p3qEhbCDWIh3Fq', 'raz', 'naim', '0598457634');
INSERT INTO users (email, password_hash, first_name, last_name, phone_number) VALUES ('baboker@example.com', '$2y$10$vHw8m5lufWZeh7gI9SaQuu6ChlDq5twIKzY5s/MPQ2gVNsh2fRYha', 'baboker', 'helly', '0512321232');