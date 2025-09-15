require 'googleauth'

module Mutations
  class GoogleOAuth < BaseMutation
    argument :input, Types::GoogleOAuthInput, required: true

    field :user, Types::UserType, null: true
    field :token, String, null: true
    field :errors, [String], null: false

    def resolve(input:)
      id_token = input[:id_token]

      # Verify ID token with Google
      begin
        verifier = Google::Auth::IDTokens.verify_oidc(id_token, audience: "548839657777-ikmkge4he6kdmjrnf6rotd53doi5r9kr.apps.googleusercontent.com")
        return { user: nil, token: nil, errors: ['Invalid Google token'] } unless verifier

        email = verifier['email']
        username = verifier['name'] || email.split('@').first
        user = User.find_or_create_by(email: email) do |u|
          u.username = username
          u.credits = 100  # Default credits for new users
          u.password = SecureRandom.hex(20)  # Dummy password for Devise
        end

        # Generate app token
        token = Base64.encode64(user.email)
        { user: user, token: token, errors: [] }
      rescue => e
        { user: nil, token: nil, errors: [e.message] }
      end
    end
  end
end