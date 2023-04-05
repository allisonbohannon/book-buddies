class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :published_date, :subject, :pages, :average_rating, :total_ratings, :cover_url

  has_many :book_clubs
  
end
