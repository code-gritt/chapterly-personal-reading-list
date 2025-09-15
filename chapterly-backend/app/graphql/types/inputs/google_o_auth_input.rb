module Types
    module Inputs
      class GoogleOAuthInput < Types::BaseInputObject
        argument :id_token, String, required: true, description: "Google ID token from client"
      end
    end
  end
  