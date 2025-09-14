require "active_support/core_ext/integer/time"

Rails.application.configure do
  # Reload code on every request (good for development)
  config.enable_reloading = true

  # Do not eager load code on boot
  config.eager_load = false

  # Show full error reports
  config.consider_all_requests_local = true

  # Enable server timing
  config.server_timing = true

  # Caching
  if Rails.root.join("tmp/caching-dev.txt").exist?
    config.public_file_server.headers = { "cache-control" => "public, max-age=#{2.days.to_i}" }
    config.cache_store = :memory_store
  else
    config.action_controller.perform_caching = false
    config.cache_store = :null_store
  end

  # Store uploaded files locally
  config.active_storage.service = :local

  # Mailer: required for Devise (password reset, confirmation)
  config.action_mailer.raise_delivery_errors = false
  config.action_mailer.perform_caching = false
  config.action_mailer.default_url_options = { host: "localhost", port: 3000 }

  # Logs & Active Record
  config.active_support.deprecation = :log
  config.active_record.migration_error = :page_load
  config.active_record.verbose_query_logs = true
  config.active_record.query_log_tags_enabled = true

  # Active Job logs
  config.active_job.verbose_enqueue_logs = true

  # Raise error on missing callback actions
  config.action_controller.raise_on_missing_callback_actions = true

  # Optional: highlight rendered views (for debugging)
  config.action_view.annotate_rendered_view_with_filenames = true
end
