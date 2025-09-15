module Types
    class MarkBookCompleteInput < Types::BaseInputObject
      argument :id, ID, required: true
    end
  end