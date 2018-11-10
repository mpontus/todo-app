/**
 * Security parameters and rules
 */
export default {
  /**
   * JWT Secret
   */
  jwt_secret: process.env.JWT_SECRET,

  /**
   * Salt rounds for password hashing
   */
  salt_rounds: 7,

  /**
   * How long until email activation code expires
   */
  email_activation_expiry: 365 * 24 * 3600,

  /**
   * How long until password reset code expires
   */
  password_recovery_expiry: 24 * 3600,
};
