module Types
  class MutationType < Types::BaseObject
    field :register, mutation: Mutations::Register
    field :login, mutation: Mutations::Login
    field :add_book, mutation: Mutations::AddBook
    field :mark_book_complete, mutation: Mutations::MarkBookComplete
  end
end