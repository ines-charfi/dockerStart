<?php
const ROLE_ADMIN = 'admin';
const ROLE_MODERATOR = 'moderator';
const ROLE_USER = 'user';

function hasPermission($user, $action) {
  switch($action) {
    case 'add_jpo':
    case 'delete_jpo':
    case 'edit_jpo':
    case 'moderate_comments':
      return $user->role === ROLE_ADMIN || $user->role === ROLE_MODERATOR;
    case 'view_stats':
    case 'edit_content':
      return $user->role !== ROLE_USER; // Admin and Moderator can view stats and edit content
    case 'view_jpo':
    case 'register_jpo':
    case 'unregister_jpo':
      return $user->role === ROLE_ADMIN || $user->role === ROLE_MODERATOR || $user->role === ROLE_USER; // All roles can view and register/unregister for JPOs
    case 'view_registrations':
      return $user->role === ROLE_ADMIN; // Only Admin can view registrations
    default:
      return false;
  }
}
function isAdmin($user) {
  return $user->role === ROLE_ADMIN;
}