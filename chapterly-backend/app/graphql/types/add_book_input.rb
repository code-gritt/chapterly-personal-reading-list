module Types
    class AddBookInput < Types::BaseInputObject
      argument :title, String, required: true
      argument :author, String, required: true
    end
  end