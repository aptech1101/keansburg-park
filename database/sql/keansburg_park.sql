
CREATE DATABASE Keansburg_park;
USE Keansburg_park;


CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE Bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    guest_name VARCHAR(100),
    guest_email VARCHAR(100),
    guest_phone VARCHAR(20),
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_price DECIMAL(10,2), -- tổng cộng từ BookingDetails
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);


CREATE TABLE Tickets (
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    weekday_price DECIMAL(10,2) NOT NULL,
    weekend_price DECIMAL(10,2) NOT NULL,
    description TEXT
);


CREATE TABLE BookingDetails (
    booking_detail_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    ticket_id INT NOT NULL,
    using_date DATE NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,       -- giá gốc áp theo weekday/weekend
    discount_rate DECIMAL(5,2) DEFAULT 0,    -- % giảm giá
    line_total DECIMAL(10,2) NOT NULL,       -- giá cuối cùng cho dòng này
    FOREIGN KEY (booking_id) REFERENCES Bookings(booking_id),
    FOREIGN KEY (ticket_id) REFERENCES Tickets(ticket_id)
);


CREATE TABLE Payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50),   -- vd: credit card, paypal
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES Bookings(booking_id)
);


CREATE TABLE Reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    target_type ENUM('attraction','restaurant','booking') NOT NULL,
    target_id INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);


CREATE TABLE Zones (
    zone_id INT AUTO_INCREMENT PRIMARY KEY,
    zone_name VARCHAR(100) NOT NULL,
    description TEXT
);


CREATE TABLE Attractions (
    attraction_id INT AUTO_INCREMENT PRIMARY KEY,
    zone_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    FOREIGN KEY (zone_id) REFERENCES Zones(zone_id)
);


CREATE TABLE Restaurants (
    restaurant_id INT AUTO_INCREMENT PRIMARY KEY,
    zone_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    FOREIGN KEY (zone_id) REFERENCES Zones(zone_id)
);


CREATE TABLE Gallery (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    target_type ENUM('attraction','restaurant','zone') NOT NULL,
    target_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL
);
