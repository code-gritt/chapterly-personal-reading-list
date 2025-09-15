module Mutations
    class MarkBookComplete < BaseMutation
      argument :input, Types::MarkBookCompleteInput, required: true
  
      field :book, Types::BookType, null: true
      field :errors, [String], null: false
  
      def resolve(input:)
        user = context[:current_user]
        return { book: nil, errors: ['User not authenticated'] } unless user
  
        book = user.books.find_by(id: input[:id])
        return { book: nil, errors: ['Book not found'] } unless book
  
        if book.completed
          return { book: book, errors: ['Book already completed'] }
        end
  
        book.update(completed: true)
        user.update(credits: user.credits + 20)
        { book: book, errors: [] }
      end
    end
  end