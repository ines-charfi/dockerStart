<?php
require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;

function sendReminder($to, $subject, $message) {
  $mail = new PHPMailer();
  $mail->isSMTP();
  $mail->Host = 'smtp.example.com';
  $mail->SMTPAuth = true;
  $mail->Username = 'contact@laplateforme.io';
  $mail->Password = 'password';
  $mail->setFrom('contact@laplateforme.io', 'La Plateforme');
  $mail->addAddress($to);
  $mail->Subject = $subject;
  $mail->Body = $message;
  return $mail->send();
}
