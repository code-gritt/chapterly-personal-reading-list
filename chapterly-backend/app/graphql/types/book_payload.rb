module Types
    class BookPayload < Types::BaseObject
      field :book, Types::BookType, null: true
      field :errors, [String], null: false
    end
  end