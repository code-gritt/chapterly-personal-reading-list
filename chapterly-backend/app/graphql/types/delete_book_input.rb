module Types
    class DeleteBookInput < Types::BaseInputObject
      argument :id, ID, required: true
    end
  end