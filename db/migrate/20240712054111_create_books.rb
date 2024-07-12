class CreateBooks < ActiveRecord::Migration[7.1]
  def change
    create_table :books do |t|
      t.text :title
      t.text :author
      t.text :description

      t.timestamps
    end
  end
end
