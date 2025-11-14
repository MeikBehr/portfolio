<?php
// Secure PHP mail handler for DA portfolio/contact form.
// Not for sensitive/production data. Minimal but safe.

// CORS preflight support
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    exit(0);
}

// Allow POST only
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Allow: POST, OPTIONS", true, 405);
    exit("Only POST requests allowed.");
}

// Decode JSON payload
$json = file_get_contents('php://input');
$params = json_decode($json);

// Basic input validation
if (
    !isset($params->email, $params->name, $params->message) ||
    !filter_var($params->email, FILTER_VALIDATE_EMAIL) ||
    strlen($params->name) > 100 ||
    strlen($params->email) > 100 ||
    strlen($params->message) > 2000
) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid input']);
    exit;
}

// Prevent header injection
$email = str_replace(["\r", "\n"], '', $params->email);
$name = htmlspecialchars(strip_tags($params->name), ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars(strip_tags($params->message), ENT_QUOTES, 'UTF-8');

// Spam honeypot
if (!empty($params->website)) {
    http_response_code(200);
    echo json_encode(['success' => true]);
    exit;
}

// Prepare mail
$recipient = 'info@develobehr.de';
$subject = "Contact from $email";
$body = "From: $name <$email>\n\n" . $message;

// Mail headers
$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/plain; charset=utf-8',
    'From: noreply@develobehr.de',
    "Reply-To: $email"
];

// Send mail
$success = mail($recipient, $subject, $body, implode("\r\n", $headers));

// Output JSON response
header('Content-Type: application/json');
echo json_encode(['success' => $success]);
