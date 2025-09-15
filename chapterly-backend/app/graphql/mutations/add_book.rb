module Mutations
    class AddBook < BaseMutation
      argument :input, Types::AddBookInput, required: true
  
      field :book, Types::BookType, null: true
      field :errors, [String], null: false
  
      def resolve(input:)
        user = context[:current_user]
        return { book: nil, errors: ['User not authenticated'] } unless user
  
        if user.credits < 10
          return { book: nil, errors: ['Insufficient credits'] }
        end
  
        book = user.books.new(
          title: input[:title],
          author: input[:author],
          completed: false
        )
  
        if book.save
          user.update(credits: user.credits - 10)
          { book: book, errors: [] }
        else
          { book: nil, errors: book.errors.full_messages }
        end
      end
    end
  end