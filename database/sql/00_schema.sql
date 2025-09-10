-- 00_schema.sql
-- MySQL 8.x | InnoDB | utf8mb4
CREATE DATABASE IF NOT EXISTS `keansburg`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;
USE `keansburg`;

-- users table for auth
CREATE TABLE IF NOT EXISTS `users` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(120) NOT NULL,
  `email` VARCHAR(190) NOT NULL UNIQUE,
  `phone` VARCHAR(30) NULL,
  `gender` ENUM('male','female','other') NULL,
  `dob` DATE NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('user','admin') NOT NULL DEFAULT 'user',
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Attractions
CREATE TABLE IF NOT EXISTS `attractions` (
  `id` BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `description` TEXT,
  `zone` VARCHAR(100),
  `is_active` TINYINT(1) DEFAULT 1
) ENGINE=InnoDB;

-- Tickets (pricing can vary by type/day)
CREATE TABLE IF NOT EXISTS `tickets` (
  `id` BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(120) NOT NULL,        -- adult/child/family-weekend...
  `base_price` DECIMAL(10,2) NOT NULL,
  `notes` VARCHAR(255)
) ENGINE=InnoDB;

-- Orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `order_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `total_amount` DECIMAL(12,2) NOT NULL DEFAULT 0,
  `status` ENUM('PENDING','PAID','CANCELLED') DEFAULT 'PENDING',
  CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

-- Order items
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `order_id` BIGINT UNSIGNED NOT NULL,
  `ticket_id` BIGINT UNSIGNED NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `unit_price` DECIMAL(10,2) NOT NULL,
  CONSTRAINT `fk_items_order` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT `fk_items_ticket` FOREIGN KEY (`ticket_id`) REFERENCES `tickets`(`id`)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

-- Payments
CREATE TABLE IF NOT EXISTS `payments` (
  `id` BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `order_id` BIGINT UNSIGNED NOT NULL,
  `amount` DECIMAL(12,2) NOT NULL,
  `provider` VARCHAR(50),
  `paid_at` DATETIME,
  `status` ENUM('INIT','SUCCESS','FAIL') DEFAULT 'INIT',
  CONSTRAINT `fk_payments_order` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- Reviews
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `rating` TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  `comment` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_reviews_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;
