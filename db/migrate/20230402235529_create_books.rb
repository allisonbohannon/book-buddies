class CreateBooks < ActiveRecord::Migration[6.1]
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.integer :published_date
      t.string :subject
      t.integer :pages
      t.integer :average_rating
      t.integer :total_ratings
      t.string :cover_url

      t.timestamps
    end
  end
end
