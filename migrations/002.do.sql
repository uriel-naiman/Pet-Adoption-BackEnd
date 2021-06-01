CREATE TABLE IF NOT EXISTS pets (
  id                     VARCHAR(36) DEFAULT (UUID()),
  pet_type               VARCHAR(36) NOT NULL,
  pet_name               VARCHAR(36) NOT NULL,
  adoption_status        VARCHAR(36) NOT NULL,
  picture                VARCHAR(255) NOT NULL DEFAULT ("1234"),
  pet_height             INT NOT NULL, 
  pet_weight             INT NOT NULL,
  color                  VARCHAR(36) NOT NULL,
  bio                    VARCHAR(255) NOT NULL,
  hypoallergenic         TINYINT,
  dietary_restrictions   VARCHAR(255) NOT NULL,
  breed                  VARCHAR(36) NOT NULL,
  created_date           DATE DEFAULT (CURRENT_DATE),
  owner_id               VARCHAR(36) DEFAULT (NULL),
  PRIMARY KEY (id)
);

INSERT INTO users (email, password_hash, first_name, last_name, phone_number, role) VALUES ('admin@admin.com', '$2y$10$kB0AcKJ0i2Tej8S9KR8DJu5ffAlLUQWcJGIqPGMFlmoLMWFrgZ.5G', 'uriel', 'naiman', '434545', 'admin');

