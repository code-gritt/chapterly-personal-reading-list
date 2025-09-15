require 'googleauth'

module Mutations
  class GoogleOAuth < BaseMutation
    argument :input, Types::Inputs::GoogleOAuthInput, required: true

    field :user, Types::UserType, null: true
    field :token, String, null: true
    field :errors, [String], null: false

    def resolve(input:)
      id_token = input[:id_token]

      begin
        # Hardcoded client ID (you can move to ENV later)
        client_id = "548839657777-ikmkge4he6kdmjrnf6rotd53doi5r9kr.apps.googleusercontent.com"

        payload = Google::Auth::IDTokens.verify_oidc(id_token, audience: client_id)
        return { user: nil, token: nil, errors: ["Invalid Google token"] } unless payload

        email = payload["email"]
        username = payload["name"] || email.split("@").first

        user = User.find_or_create_by!(email: email) do |u|
          u.username = username
          u.credits = 100
          u.password = SecureRandom.hex(20) # Devise dummy password
        end

        # Example token (replace with JWT in real app)
        token = Base64.strict_encode64(user.email)

        { user: user, token: token, errors: [] }
      rescue => e
        Rails.logger.error("Google OAuth failed: #{e.message}\n#{e.backtrace.join("\n")}")
        { user: nil, token: nil, errors: ["Google OAuth failed: #{e.message}"] }
      end
    end
  end
end
