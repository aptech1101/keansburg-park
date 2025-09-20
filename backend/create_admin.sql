-- Create admin user for testing
INSERT INTO users (username, full_name, email, password_hash, role) 
VALUES ('admin', 'Admin User', 'admin@keansburg.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Password is: password
