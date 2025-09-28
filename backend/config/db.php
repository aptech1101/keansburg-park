<?php
declare(strict_types=1);

require_once __DIR__ . '/env.php';

class Database {
    private static ?PDO $instance = null;

    private function __construct() {}

    public static function getInstance(): PDO {
        if (self::$instance === null) {
            $host    = $_ENV['DB_HOST'] ;
            $port    = $_ENV['DB_PORT'] ;
            $dbname  = $_ENV['DB_NAME'] ;
            $user    = $_ENV['DB_USER'];
            $pass    = $_ENV['DB_PASS'] ;
            $charset = $_ENV['DB_CHARSET'];

            $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=$charset";

            try {
                self::$instance = new PDO($dsn, $user, $pass, [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_TIMEOUT            => 5,
                ]);
            } catch (Throwable $e) {
                http_response_code(500);
                echo json_encode([
                    "status" => "error",
                    "message" => "Database connection failed",
                    "error"   => $e->getMessage()
                ]);
                exit();
            }
        }
        return self::$instance;
    }
}
