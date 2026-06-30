CREATE DATABASE IF NOT EXISTS rallycourt_db;
USE rallycourt_db;

DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS courts;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type ENUM('indoor', 'outdoor') NOT NULL,
  location VARCHAR(150) NOT NULL,
  price_per_hour INT NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  status ENUM('available', 'maintenance') DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  court_id INT NOT NULL,
  customer_name VARCHAR(100) NOT NULL,
  customer_email VARCHAR(100) NOT NULL,
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  total_price INT NOT NULL,
  status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (court_id) REFERENCES courts(id) ON DELETE CASCADE
);

INSERT INTO users (name, email, password, role) VALUES
('Admin RallyCourt', 'admin@rallycourt.test', 'admin123', 'admin'),
('User Demo', 'user@rallycourt.test', 'user123', 'user');

INSERT INTO courts 
(name, type, location, price_per_hour, description, image_url, status)
VALUES
('RallyCourt Indoor A', 'indoor', 'Bandung', 150000, 'Lapangan padel indoor dengan fasilitas premium, pencahayaan modern, dan permukaan lapangan yang nyaman untuk latihan maupun match.', 'https://images.unsplash.com/photo-1761644541691-2a746c638881?auto=format&fit=crop&w=1200&q=80', 'available'),
('RallyCourt Outdoor B', 'outdoor', 'Bandung', 120000, 'Lapangan outdoor cocok untuk latihan santai, sparring bersama teman, dan community match pada sore hari.', 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1200&q=80', 'available'),
('Premium Court C', 'indoor', 'Jakarta', 200000, 'Lapangan padel premium untuk private session, coaching, dan pertandingan dengan fasilitas lengkap.', 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1200&q=80', 'available');
