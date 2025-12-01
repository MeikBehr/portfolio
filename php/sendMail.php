<?php
/**
 * sendMail.php – Secure contact form backend with rate-limiting and error logging.
 * For demo/portfolio use (not production!).
 * 
 * Features:
 *  - Rate-limit: 1 request per minute per IP (file-based)
 *  - Error logging with max. log file size (1 MB)
 *  - Validation, honeypot, header injection prevention
 *  - CORS enabled for dev & prod
 */

require_once __DIR__ . '/../phpmailer/Exception.php';
require_once __DIR__ . '/../phpmailer/PHPMailer.php';
require_once __DIR__ . '/../phpmailer/SMTP.php';
require_once __DIR__ . '/mail_config.php';


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// ==== CONFIGURATION ====
$recipient = 'info@develobehr.de';     // Change to your real mailbox!
$max_log_size = 1024 * 1024;           // 1 MB = 1024*1024 bytes
$log_file = __DIR__ . '/mail_errors.log';
$rate_limit_dir = sys_get_temp_dir();  // OS temp dir, safe for file locks
$rate_limit_seconds = 60;              // 1 request per minute/IP

// ==== CORS / Preflight ====
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    exit(0);
}

// ==== Rate Limiting (per IP) ====
$ip = $_SERVER['REMOTE_ADDR'];
$rate_file = $rate_limit_dir . '/contact_' . md5($ip) . '.tmp';

if (file_exists($rate_file)) {
    $last = intval(file_get_contents($rate_file));
    $now = time();
    if (($now - $last) < $rate_limit_seconds) {
        logError("Rate limit hit for $ip");
        http_response_code(429);
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => 'Rate limit: Try again in 1 minute.']);
        exit;
    }
}
// Write current timestamp for next check
file_put_contents($rate_file, time());

// ==== Only POST allowed ====
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    logError("Invalid method from $ip: " . $_SERVER['REQUEST_METHOD']);
    header("Allow: POST, OPTIONS", true, 405);
    exit("Only POST requests allowed.");
}

// ==== Parse and Validate Input ====
$json = file_get_contents('php://input');
$params = json_decode($json);

if (
    !isset($params->email, $params->name, $params->message) ||
    !filter_var($params->email, FILTER_VALIDATE_EMAIL) ||
    strlen($params->name) > 100 || strlen($params->email) > 100 || strlen($params->message) > 2000
) {
    logError("Validation failed from $ip");
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid input']);
    exit;
}

// ==== Honeypot Anti-Spam ====
if (!empty($params->website)) {
    // Hidden "website" field filled? Likely a bot!
    logError("Honeypot triggered from $ip");
    header('Content-Type: application/json');
    echo json_encode(['success' => true]);
    exit;
}

// ==== Prepare E-Mail Data (sanitize) ====
$email = str_replace(["\r", "\n"], '', $params->email);  // header injection
$name = htmlspecialchars(strip_tags($params->name), ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars(strip_tags($params->message), ENT_QUOTES, 'UTF-8');
$subject = "Contact from $email";
$body = "From: $name <$email>\n\n" . $message;


// ==== Send Mail ====

try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host       = 'w01fb0f6.kasserver.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'info@develobehr.de';
    $mail->Password   = SMTP_PASSWORD;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom('info@develobehr.de', 'DeveloBehr Portfolio');
    $mail->addAddress($recipient);
    $mail->addReplyTo($email, $name);

    $mail->Subject = $subject;
    $mail->Body    = $body;

    $mail->send();
    $success = true;

} catch (Exception $e) {
    logError("SMTP error for $ip: " . $e->getMessage());
    $success = false;
}


// ==== JSON Response ====
header('Content-Type: application/json');
echo json_encode(['success' => $success]);

// ==== Error Logging Function ====
/**
 * Log errors to file, limiting file size.
 * Never log personal data!
 */
function logError($msg) {
    global $log_file, $max_log_size;
    // Limit log file size (truncate if needed)
    if (file_exists($log_file) && filesize($log_file) > $max_log_size) {
        // Delete or rotate log if too big
        unlink($log_file);
    }
    $line = "[" . date('Y-m-d H:i:s') . "] $msg\n";
    file_put_contents($log_file, $line, FILE_APPEND | LOCK_EX);
}
?>
