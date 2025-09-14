class Book < ApplicationRecord
  belongs_to :user

  validates :title, :author, :status, presence: true
  validates :status, inclusion: { in: ["to-read", "completed"] }
end