module Types
  class MutationType < Types::BaseObject
    field :register, mutation: Mutations::Register
    field :login, mutation: Mutations::Login
    field :google_o_auth, mutation: Mutations::GoogleOAuth
  end
end
