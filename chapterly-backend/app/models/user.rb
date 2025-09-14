class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :rememberable, :validatable, :trackable

  # Associations
  has_many :books, dependent: :destroy

  # Validations
  validates :username, presence: true, uniqueness: true
end