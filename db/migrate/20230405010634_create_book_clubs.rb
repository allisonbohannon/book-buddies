class CreateBookClubs < ActiveRecord::Migration[6.1]
  def change
    create_table :book_clubs do |t|
      t.belongs_to :book, null: false, foreign_key: true
      t.integer :zip_three
      t.belongs_to :user, null: false, foreign_key: true
      t.string :status

      t.timestamps
    end
  end
end
