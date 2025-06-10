-- Création de la base de données (à exécuter une seule fois)
CREATE DATABASE IF NOT EXISTS laplateforme_jpo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE laplateforme_jpo;

-- Table des utilisateurs (admin, manager, employee, user)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role ENUM('admin', 'manager', 'employee', 'user') NOT NULL DEFAULT 'user'
);

-- Table des journées portes ouvertes (JPO)
CREATE TABLE jpos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255) NOT NULL,
  date DATETIME NOT NULL,
  capacity INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des inscriptions aux JPO
CREATE TABLE registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  jpo_id INT NOT NULL,
  present BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (jpo_id) REFERENCES jpos(id) ON DELETE CASCADE
);

-- Table des commentaires sur les JPO
CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  jpo_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (jpo_id) REFERENCES jpos(id) ON DELETE CASCADE
);

-- Table des réponses aux commentaires (optionnelle mais utile pour la modération)
CREATE TABLE replies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  comment_id INT NOT NULL,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
