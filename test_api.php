<?php
/**
 * Simple PHP script to test API endpoints
 * Usage: php test_api.php
 */

$baseUrl = 'http://localhost/keansburg-park/backend/public';

function testEndpoint($url, $name) {
    echo "\n🧪 Testing: $name\n";
    echo "URL: $url\n";
    echo str_repeat('-', 50) . "\n";
    
    $context = stream_context_create([
        'http' => [
            'method' => 'GET',
            'header' => 'Content-Type: application/json',
            'timeout' => 10
        ]
    ]);
    
    $startTime = microtime(true);
    $response = @file_get_contents($url, false, $context);
    $endTime = microtime(true);
    $responseTime = round(($endTime - $startTime) * 1000, 2);
    
    if ($response === false) {
        echo "❌ ERROR: Failed to connect to API\n";
        echo "Error: " . error_get_last()['message'] . "\n";
        return false;
    }
    
    $httpCode = 0;
    if (isset($http_response_header)) {
        foreach ($http_response_header as $header) {
            if (preg_match('/HTTP\/\d\.\d\s+(\d+)/', $header, $matches)) {
                $httpCode = (int)$matches[1];
                break;
            }
        }
    }
    
    echo "✅ SUCCESS\n";
    echo "HTTP Status: $httpCode\n";
    echo "Response Time: {$responseTime}ms\n";
    
    $data = json_decode($response, true);
    if ($data !== null) {
        echo "Response Data:\n";
        echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
    } else {
        echo "Raw Response: $response\n";
    }
    
    return true;
}

function testAllEndpoints() {
    global $baseUrl;
    
    echo "🚀 Starting API Tests for Keansburg Park\n";
    echo "Base URL: $baseUrl\n";
    echo str_repeat('=', 60) . "\n";
    
    $endpoints = [
        ['/api/ping', 'Ping Test'],
        ['/', 'Home Endpoint'],
        ['/api/users', 'Users API'],
        ['/api/tickets', 'Tickets API'],
        ['/api/reviews', 'Reviews API']
    ];
    
    $results = [];
    
    foreach ($endpoints as [$path, $name]) {
        $url = $baseUrl . $path;
        $success = testEndpoint($url, $name);
        $results[] = ['name' => $name, 'success' => $success];
    }
    
    // Summary
    echo "\n" . str_repeat('=', 60) . "\n";
    echo "📊 TEST SUMMARY\n";
    echo str_repeat('=', 60) . "\n";
    
    $passed = 0;
    $total = count($results);
    
    foreach ($results as $result) {
        $status = $result['success'] ? '✅ PASS' : '❌ FAIL';
        echo sprintf("%-20s %s\n", $result['name'], $status);
        if ($result['success']) $passed++;
    }
    
    echo str_repeat('-', 40) . "\n";
    echo "Passed: $passed/$total\n";
    echo "Success Rate: " . round(($passed / $total) * 100, 1) . "%\n";
    
    if ($passed === $total) {
        echo "\n🎉 All tests passed! API is working correctly.\n";
    } else {
        echo "\n⚠️  Some tests failed. Please check your API configuration.\n";
    }
}

// Run the tests
testAllEndpoints();
?>
