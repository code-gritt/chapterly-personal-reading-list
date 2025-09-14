require "active_support/core_ext/integer/time"

Rails.application.configure do
  # Code is eager loaded for performance
  config.eager_load = true
  config.enable_reloading = false

  # Full error reports disabled
  config.consider_all_requests_local = false

  # Serve static assets with far-future caching
  config.public_file_server.headers = { "cache-control" => "public, max-age=#{1.year.to_i}" }

  # Store uploaded files locally (or configure cloud storage)
  config.active_storage.service = :local

  # Force SSL (HTTPS) and assume SSL proxy if behind load balancer
  config.force_ssl = true
  config.assume_ssl = true

  # Logging
  config.log_tags = [:request_id]
  config.logger = ActiveSupport::TaggedLogging.logger(STDOUT)
  config.log_level = ENV.fetch("RAILS_LOG_LEVEL", "info")

  # Suppress health check logs
  config.silence_healthcheck_path = "/up"

  # Disable deprecation logs in production
  config.active_support.report_deprecations = false

  # Mailer settings (required for Devise)
  config.action_mailer.default_url_options = { host: "example.com" }

  # I18n fallback
  config.i18n.fallbacks = true

  # Prevent dumping schema after migrations
  config.active_record.dump_schema_after_migration = false

  # Limit attributes displayed in production logs
  config.active_record.attributes_for_inspect = [:id]
end
