# app/graphql/mutations/google_o_auth.rb
require "googleauth"

module Mutations
  class GoogleOAuth < BaseMutation
    argument :input, Types::GoogleOAuthInput, required: true

    field :user, Types::UserType, null: true
    field :token, String, null: true
    field :errors, [String], null: false

    def resolve(input:)
      id_token = input[:id_token] # ✅ snake_case

      begin
        # ✅ Verify ID token with Google (hardcoded client_id for now)
        payload = Google::Auth::IDTokens.verify_oidc(
          id_token,
          audience: "548839657777-ikmkge4he6kdmjrnf6rotd53doi5r9kr.apps.googleusercontent.com"
        )

        return { user: nil, token: nil, errors: ["Invalid Google token"] } unless payload

        email = payload["email"]
        username = payload["name"] || email.split("@").first

        user = User.find_or_create_by(email: email) do |u|
          u.username = username
          u.credits = 100
          u.password = SecureRandom.hex(20) # dummy password
        end

        # ✅ Generate simple token (replace with JWT later if needed)
        token = Base64.strict_encode64(user.email)

        { user: user, token: token, errors: [] }
      rescue => e
        Rails.logger.error("Google OAuth failed: #{e.message}\n#{e.backtrace.join("\n")}")
        { user: nil, token: nil, errors: [e.message] }
      end
    end
  end
end
