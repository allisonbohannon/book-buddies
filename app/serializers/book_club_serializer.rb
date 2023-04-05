class BookClubSerializer < ActiveModel::Serializer
  attributes :id, :zip_three, :status
  has_one :book
  has_one :user
end
