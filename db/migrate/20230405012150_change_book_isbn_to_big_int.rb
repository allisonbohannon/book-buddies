class ChangeBookIsbnToBigInt < ActiveRecord::Migration[6.1]
  def change 
    change_column :books, :isbn, :bigint
  end
end
