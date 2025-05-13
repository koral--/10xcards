/*
  # Disable email confirmation

  This migration configures auth settings to disable email confirmation requirements.
  We use auth.config() instead of directly modifying the users table to avoid permission issues.
*/

-- Update auth config to disable email confirmation
SELECT auth.config('mailer_autoconfirm'::text, 'true'::jsonb);