# frozen_string_literal: true

module Mutations
    class Login < BaseMutation
      # Accept plain arguments
      argument :email, String, required: true
      argument :password, String, required: true
  
      # Return fields
      field :user, Types::UserType, null: true
      field :token, String, null: true
      field :errors, [String], null: false
  
      def resolve(email:, password:)
        user = User.find_by(email: email)
  
        if user&.valid_password?(password)
          token = Base64.encode64(user.email)
          { user: user, token: token, errors: [] }
        else
          { user: nil, token: nil, errors: ["Invalid credentials"] }
        end
      end
    end
  end
  