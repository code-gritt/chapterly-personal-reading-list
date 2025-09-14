# frozen_string_literal: true

module Mutations
    class Register < BaseMutation
      # Accept plain arguments
      argument :email, String, required: true
      argument :password, String, required: true
      argument :username, String, required: true
  
      # Return fields
      field :user, Types::UserType, null: true
      field :token, String, null: true
      field :errors, [String], null: false
  
      def resolve(email:, password:, username:)
        user = User.new(email: email, password: password, username: username, credits: 100)
  
        if user.save
          token = Base64.encode64(user.email)
          { user: user, token: token, errors: [] }
        else
          { user: nil, token: nil, errors: user.errors.full_messages }
        end
      end
    end
  end
  