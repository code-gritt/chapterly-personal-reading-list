module Types
    class EditBookInput < Types::BaseInputObject
      argument :id, ID, required: true
      argument :title, String, required: true
      argument :author, String, required: true
    end
  end