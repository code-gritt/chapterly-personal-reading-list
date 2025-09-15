require 'googleauth'

module Mutations
  class GoogleOAuth < BaseMutation
    argument :input, Types::GoogleOAuthInput, required: true

    field :user, Types::UserType, null: true
    field :token, String, null: true
    field :errors, [String], null: false

    def resolve(input:)
      id_token = input[:id_token] # Match GraphQL input field name

      begin
        unless ENV['GOOGLE_CLIENT_ID']
          Rails.logger.error("Google OAuth failed: GOOGLE_CLIENT_ID is not set")
          return { user: nil, token: nil, errors: ['Google Client ID not configured'] }
        end

        # Verify ID token with Google
        payload = Google::Auth::IDTokens.verify_oidc(
          id_token,
          audience: "548839657777-ikmkge4he6kdmjrnf6rotd53doi5r9kr.apps.googleusercontent.com"
        )

        return { user: nil, token: nil, errors: ['Invalid Google token'] } unless payload

        email = payload['email']
        username = payload['name'] || email.split('@').first

        user = User.find_or_create_by(email: email) do |u|
          u.username = username
          u.credits = 100
          u.password = SecureRandom.hex(20) # Dummy password for Devise
        end

        # Generate token (consistent with login/register)
        token = Base64.strict_encode64(user.email)

        { user: user, token: token, errors: [] }
      rescue => e
        Rails.logger.error("Google OAuth failed: #{e.message}\n#{e.backtrace.join("\n")}")
        { user: nil, token: nil, errors: ["Google OAuth failed: #{e.message}"] }
      end
    end
  end
end