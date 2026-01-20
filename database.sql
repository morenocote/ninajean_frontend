-- Database Schema for Calgary Home Pro

-- Table for Users (Admin)
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Blog Posts
CREATE TABLE IF NOT EXISTS blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(150) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    image VARCHAR(255),
    date DATE NOT NULL,
    readTime VARCHAR(50),
    category VARCHAR(100),
    status ENUM('draft', 'published') DEFAULT 'published',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Quotes (Cotizaciones)
CREATE TABLE IF NOT EXISTS cotizaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(150) NOT NULL,
    city VARCHAR(100) NOT NULL,
    postalCode VARCHAR(20) NOT NULL,
    service VARCHAR(100) NOT NULL,
    propertyType VARCHAR(100) NOT NULL,
    urgency VARCHAR(50) NOT NULL,
    budget VARCHAR(100),
    contactMethod VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('pending', 'contacted', 'completed', 'finalizado') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initial admin user (password should be hashed in production, this is a placeholder)
-- Suggestion: Use 'admin123' as default password (hashed)
INSERT INTO usuarios (nombre, email, password, estado) 
VALUES ('Admin', 'admin@calgaryhomepro.ca', '$2b$10$JlmJozaAIw02P8rLcY2S7.fQ.Il5853DspCz5loaoq3kS3qTgbLta', 'activo');
