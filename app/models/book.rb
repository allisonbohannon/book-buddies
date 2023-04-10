class Book < ApplicationRecord
    has_many :book_clubs, dependent: :destroy  
end
