module Types
    class BookType < Types::BaseObject
      field :id, ID, null: false
      field :title, String, null: false
      field :author, String, null: false
      field :completed, Boolean, null: false
      field :user, Types::UserType, null: false
      field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    end
  end