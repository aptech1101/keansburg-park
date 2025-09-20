-- keansburg_sql_master.sql
-- MySQL 8.x | InnoDB | utf8mb4
-- Scope: Users, Zones, Attractions, Restaurants, Gallery, Tickets, Bookings, BookingDetails, Payments, Feedbacks (simplified), Messages
-- Removed: Reviews
-- Notes: Single admin policy (no approved_by/approved_at in feedbacks); guests supported via nullable user_id + guest_token

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Database
CREATE DATABASE IF NOT EXISTS `keansburg`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;
USE `keansburg`;

-- Drop in FK-safe order (children -> parents)
DROP TABLE IF EXISTS `messages`;
DROP TABLE IF EXISTS `feedbacks`;
DROP TABLE IF EXISTS `bookingdetails`;
DROP TABLE IF EXISTS `payments`;
DROP TABLE IF EXISTS `bookings`;
DROP TABLE IF EXISTS `attractions`;
DROP TABLE IF EXISTS `restaurants`;
DROP TABLE IF EXISTS `gallery`;
DROP TABLE IF EXISTS `tickets`;
DROP TABLE IF EXISTS `zones`;
DROP TABLE IF EXISTS `users`;

-- ============================
-- Core reference tables
-- ============================

-- Users
CREATE TABLE `users` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NULL,
  `full_name` VARCHAR(120) NOT NULL,
  `email` VARCHAR(190) NOT NULL,
  `phone` VARCHAR(30) NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('user','admin') NOT NULL DEFAULT 'user',
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_users_email` (`email`),
  UNIQUE KEY `uq_users_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Zones
CREATE TABLE `zones` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` ENUM('park','water') NOT NULL,
  `name` VARCHAR(120) NOT NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_zones_code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Attractions (per zone)
CREATE TABLE `attractions` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `zone_id` BIGINT UNSIGNED NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `description` TEXT NULL,
  `image_url` VARCHAR(255) NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `idx_attractions_zone` (`zone_id`),
  CONSTRAINT `fk_attractions_zone` FOREIGN KEY (`zone_id`) REFERENCES `zones`(`id`) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Restaurants (per zone)
CREATE TABLE `restaurants` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `zone_id` BIGINT UNSIGNED NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `description` TEXT NULL,
  `image_url` VARCHAR(255) NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `idx_restaurants_zone` (`zone_id`),
  CONSTRAINT `fk_restaurants_zone` FOREIGN KEY (`zone_id`) REFERENCES `zones`(`id`) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Gallery
CREATE TABLE `gallery` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tickets (pricing by zone)
CREATE TABLE `tickets` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `zone_id` BIGINT UNSIGNED NOT NULL,
  `weekday_price` DECIMAL(10,2) NOT NULL,
  `weekend_price` DECIMAL(10,2) NOT NULL,
  `description` TEXT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `idx_tickets_zone` (`zone_id`),
  CONSTRAINT `fk_tickets_zone` FOREIGN KEY (`zone_id`) REFERENCES `zones`(`id`) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================
-- Booking flow (Guest + User)
-- ============================

-- Bookings (unify orders/bookings; user_id nullable for guest)
CREATE TABLE `bookings` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `booking_code` VARCHAR(20) NOT NULL,
  `user_id` BIGINT UNSIGNED NULL,       -- NULL for guest
  `guest_token` CHAR(36) NULL,          -- guest lookup
  `guest_name` VARCHAR(120) NULL,
  `guest_email` VARCHAR(120) NULL,
  `guest_phone` VARCHAR(30) NULL,
  `visit_date` DATE NOT NULL,
  `subtotal` DECIMAL(12,2) NOT NULL DEFAULT 0,
  `discount_total` DECIMAL(12,2) NOT NULL DEFAULT 0,
  `grand_total` DECIMAL(12,2) NOT NULL DEFAULT 0,
  `currency` CHAR(3) NOT NULL DEFAULT 'USD',
  `status` ENUM('PENDING','PAID','CANCELLED','FAILED') NOT NULL DEFAULT 'PENDING',
  `payment_method` VARCHAR(40) NULL,
  `idempotency_key` CHAR(36) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_bookings_code` (`booking_code`),
  UNIQUE KEY `uq_bookings_idem` (`idempotency_key`),
  KEY `idx_bookings_user_id` (`user_id`),
  KEY `idx_bookings_guest_token` (`guest_token`),
  KEY `idx_bookings_visit_date` (`visit_date`),
  CONSTRAINT `fk_bookings_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Booking details (per ticket type)
CREATE TABLE `bookingdetails` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `booking_id` BIGINT UNSIGNED NOT NULL,
  `ticket_id` BIGINT UNSIGNED NOT NULL,
  `using_date` DATE NOT NULL,
  `quantity` INT NOT NULL,
  `unit_price` DECIMAL(12,2) NOT NULL,
  `discount_rate` DECIMAL(5,2) NOT NULL DEFAULT 0.00,  -- percent
  `line_total` DECIMAL(12,2) NOT NULL,
  `ticket_code` VARCHAR(40) NULL,                       -- YYMMDD-SEQ if issued
  PRIMARY KEY (`id`),
  KEY `idx_bd_booking` (`booking_id`),
  KEY `idx_bd_ticket` (`ticket_id`),
  CONSTRAINT `fk_bd_booking` FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT `fk_bd_ticket` FOREIGN KEY (`ticket_id`) REFERENCES `tickets`(`id`) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Payments
CREATE TABLE `payments` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `booking_id` BIGINT UNSIGNED NOT NULL,
  `amount` DECIMAL(12,2) NOT NULL,
  `provider` VARCHAR(50) NULL,
  `paid_at` DATETIME NULL,
  `status` ENUM('INIT','SUCCESS','FAIL') NOT NULL DEFAULT 'INIT',
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_payments_booking` (`booking_id`),
  CONSTRAINT `fk_payments_booking` FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================
-- Feedback & Messages (public)
-- ============================

-- Feedbacks for both guest and user; single-admin policy => no approved_by/approved_at
CREATE TABLE `feedbacks` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `rating` TINYINT NOT NULL,
  `status` ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `created_by` BIGINT UNSIGNED NULL,              -- nullable if guest
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_feedbacks_created_by` (`created_by`),
  CONSTRAINT `fk_feedbacks_created_by` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON UPDATE CASCADE ON DELETE SET NULL,
  CONSTRAINT `chk_feedbacks_rating` CHECK (`rating` BETWEEN 1 AND 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Messages (Contact Us form) – no "Your Project" field
CREATE TABLE `messages` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(120) NOT NULL,
  `email` VARCHAR(190) NOT NULL,
  `phone` VARCHAR(30) NULL,
  `subject` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================
-- Seeds (optional)
-- ============================

INSERT INTO `zones` (`code`, `name`, `description`) VALUES
  ('park','Amusement Park','Dry rides and attractions'),
  ('water','Water Park','Water slides and pools')
ON DUPLICATE KEY UPDATE name=VALUES(name), description=VALUES(description);

INSERT INTO `tickets` (`zone_id`,`weekday_price`,`weekend_price`,`description`,`is_active`)
SELECT z.id, 10.00, 12.00, 'Baseline per ticket', 1 FROM zones z WHERE z.code IN ('park','water')
ON DUPLICATE KEY UPDATE weekday_price=VALUES(weekday_price), weekend_price=VALUES(weekend_price);

INSERT INTO `feedbacks` (`name`, `email`, `message`, `rating`, `created_by`)
VALUES
('Isabella Lopez', 'isabella@example.com', 'Fantastic Water Park with lots of attractions. Worth the visit!', 5, NULL),
('David Brown', 'david@example.com', 'Fantastic atmosphere at the Amusement Park. Will come again!', 5, NULL),
('Grace Wilson', 'grace@example.com', 'The Water Park was a perfect summer getaway. Safe and enjoyable!', 5, NULL),
('Emily Davis', 'emily@example.com', 'Best day ever at the Amusement Park, staff were friendly and helpful.', 5, NULL),
('Henry Clark', 'henry@example.com', 'Amazing Water Park experience. Kids enjoyed every moment.', 5, NULL),
('Alice Johnson', 'alice@example.com', 'Amazing experience at the Amusement Park! The rides were thrilling and well maintained.', 5, NULL),
('Jack Thompson', 'jack@example.com', 'The Water Park exceeded expectations. Great fun for the whole family.', 5, NULL),
('Brian Smith', 'brian@example.com', 'Loved the Amusement Park! Great place for families and kids.', 5, NULL),
('Frank Miller', 'frank@example.com', 'Loved the Water Park! The slides were fun and the pools were refreshing.', 5, NULL),
('Catherine Lee', 'catherine@example.com', 'The Amusement Park was clean, fun, and exciting. Highly recommended!', 5, NULL);

-- ============================
-- Restore session vars
-- ============================
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
