-- Create admin user for testing
INSERT INTO users (username, full_name, email, password_hash, role) 
VALUES ('admin', 'Admin User', 'admin@keansburg.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Password is: password


-- ================================================
-- FAKE DATASET FOR KEANSBURG (10–20 records/table)
-- ================================================

-- Users (some admins, mostly users)
INSERT INTO users (username, full_name, email, phone, password_hash, role, is_active)
VALUES
('john_doe','John Doe','john@example.com','+1234567890','hash123','user',1),
('jane_admin','Jane Admin','jane@example.com','+1987654321','hash456','admin',1),
('maria99','Maria Smith','maria@example.com',NULL,'hash789','user',1),
('tommy','Tommy Lee','tommy@example.com','+111222333','hash000','user',1),
('guest1','Guest User','guest1@example.com',NULL,'hashg1','user',0),
('lucas','Lucas Brown','lucas@example.com','+141414141','hashl1','user',1),
('emily','Emily Davis','emily@example.com','+151515151','hashe1','user',1),
('sara','Sara Johnson','sara@example.com','+161616161','hashs1','user',1),
('chris','Chris Wilson','chris@example.com','+171717171','hashc1','user',1),
('linda','Linda Martinez','linda@example.com','+181818181','hashl2','user',1);

-- Attractions (link with zones)
INSERT INTO attractions (zone_id, name, description, image_url)
VALUES
(1,'Roller Coaster','High speed thrill ride','/img/roller.jpg'),
(1,'Ferris Wheel','View the entire park','/img/ferris.jpg'),
(1,'Bumper Cars','Family fun','/img/bumper.jpg'),
(1,'Haunted House','Scary maze adventure','/img/haunted.jpg'),
(2,'Wave Pool','Relax in giant waves','/img/wave.jpg'),
(2,'Lazy River','Float through water park','/img/lazy.jpg'),
(2,'Water Slide','Fast water fun','/img/slide.jpg'),
(2,'Kids Splash','Safe water play for kids','/img/kids.jpg');

-- Restaurants
INSERT INTO restaurants (zone_id, name, description, image_url)
VALUES
(1,'Pizza Palace','Fresh pizzas','/img/pizza.jpg'),
(1,'Burger Barn','Classic burgers','/img/burger.jpg'),
(1,'Ice Cream Hut','Cold treats','/img/icecream.jpg'),
(2,'Taco Shack','Spicy tacos','/img/taco.jpg'),
(2,'BBQ Grill','Smoked BBQ meats','/img/bbq.jpg'),
(2,'Juice Bar','Fresh juices','/img/juice.jpg');

-- Gallery
INSERT INTO gallery (title, description, image_url)
VALUES
('Summer Festival','Fireworks at night','/img/festival.jpg'),
('Kids Zone','Happy children playing','/img/kidszone.jpg'),
('Food Fair','Tasty snacks','/img/foodfair.jpg'),
('Water Fun','Slides and pools','/img/waterfun.jpg'),
('Halloween Event','Spooky decorations','/img/halloween.jpg');

-- Bookings (some users, some guests)
INSERT INTO bookings (booking_code, user_id, guest_token, guest_name, guest_email, guest_phone,
  visit_date, subtotal, discount_total, grand_total, currency, status, payment_method, idempotency_key)
VALUES
('BK001',1,NULL,NULL,NULL,NULL,'2025-09-25',50,0,50,'USD','PAID','CreditCard',UUID()),
('BK002',NULL,UUID(),'Alice Guest','alice.guest@example.com','+191919191','2025-09-26',24,4,20,'USD','PENDING','PayPal',UUID()),
('BK003',2,NULL,NULL,NULL,NULL,'2025-09-27',100,10,90,'USD','PAID','CreditCard',UUID()),
('BK004',3,NULL,NULL,NULL,NULL,'2025-09-28',40,0,40,'USD','CANCELLED','Cash',UUID()),
('BK005',NULL,UUID(),'Bob Guest','bob@example.com','+202020202','2025-09-29',60,5,55,'USD','PAID','PayPal',UUID());

-- Booking Details
INSERT INTO bookingdetails (booking_id,ticket_id,using_date,quantity,unit_price,discount_rate,line_total,ticket_code)
VALUES
(1,1,'2025-09-25',2,25,0,50,'250925-001'),
(2,2,'2025-09-26',2,12,20,20,'260925-002'),
(3,1,'2025-09-27',5,20,10,90,'270925-003'),
(4,2,'2025-09-28',4,10,0,40,'280925-004'),
(5,1,'2025-09-29',3,20,8,55,'290925-005');

-- Payments
INSERT INTO payments (booking_id, amount, provider, paid_at, status)
VALUES
(1,50,'Stripe','2025-09-20 10:00:00','SUCCESS'),
(2,20,'PayPal',NULL,'INIT'),
(3,90,'Stripe','2025-09-20 11:00:00','SUCCESS'),
(4,40,'Cash','2025-09-21 14:00:00','FAIL'),
(5,55,'PayPal','2025-09-22 09:30:00','SUCCESS');

-- Feedbacks
INSERT INTO feedbacks (name,email,message,rating,status,created_by)
VALUES
('Visitor1','vis1@example.com','Great rides!',5,'approved',1),
('Visitor2','vis2@example.com','Too crowded',3,'approved',NULL),
('Visitor3','vis3@example.com','Loved the water park',4,'approved',2),
('Visitor4','vis4@example.com','Food was average',2,'pending',3),
('Visitor5','vis5@example.com','Staff were helpful',5,'approved',NULL);

-- Messages (Contact Us)
INSERT INTO messages (name,email,phone,subject,message)
VALUES
('Mark','mark@example.com','+212121212','Lost Item','I lost my sunglasses near the wave pool.'),
('Sophia','sophia@example.com',NULL,'Group Booking','How to book for 20 people?'),
('Daniel','daniel@example.com','+232323232','Job Inquiry','Are you hiring seasonal staff?'),
('Ella','ella@example.com','+242424242','Complaint','Long waiting times at the roller coaster.'),
('Henry','henry@example.com','+252525252','Suggestion','Add more vegetarian food options.');
