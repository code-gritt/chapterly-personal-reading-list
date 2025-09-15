module Mutations
    class DeleteBook < BaseMutation
      argument :input, Types::DeleteBookInput, required: true
  
      field :book, Types::BookType, null: true
      field :errors, [String], null: false
  
      def resolve(input:)
        user = context[:current_user]
        return { book: nil, errors: ['User not authenticated'] } unless user
  
        book = user.books.find_by(id: input[:id])
        return { book: nil, errors: ['Book not found'] } unless book
  
        if book.destroy
          { book: book, errors: [] }
        else
          { book: nil, errors: book.errors.full_messages }
        end
      end
    end
  end