require "googleauth"

module Mutations
  class GoogleOAuth < BaseMutation
    argument :input, Types::GoogleOAuthInput, required: true

    field :user, Types::UserType, null: true
    field :token, String, null: true
    field :errors, [String], null: false

    def resolve(input:)
      id_token = input[:id_token]

      begin
        # 🔑 Verify ID token with Google
        payload = Google::Auth::IDTokens.verify_oidc(
          id_token,
          audience: "548839657777-ikmkge4he6kdmjrnf6rotd53doi5r9kr.apps.googleusercontent.com"
        )

        return { user: nil, token: nil, errors: ["Invalid Google token"] } unless payload

        email = payload["email"]
        username = payload["name"] || email.split("@").first

        user = User.find_or_create_by(email: email) do |u|
          u.username = username
          u.credits = 100  # Default credits for new users
          u.password = SecureRandom.hex(20) # Random dummy password for Devise
        end

        # 🔐 Generate an app token (simple example — replace later with JWT)
        token = Base64.strict_encode64(user.email)

        { user: user, token: token, errors: [] }
      rescue => e
        { user: nil, token: nil, errors: [e.message] }
      end
    end
  end
end
