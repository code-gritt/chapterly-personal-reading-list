# frozen_string_literal: true

# Be sure to restart your server when you modify this file.

# Handle Cross-Origin Resource Sharing (CORS) to accept cross-origin AJAX requests.
# For production, replace '*' with your frontend URL, e.g., 'https://myfrontend.com'

Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins '*' # Allow all origins for MVP; restrict later for security
      resource '/graphql',
        headers: :any,
        methods: [:get, :post, :options]
    end
  end
  