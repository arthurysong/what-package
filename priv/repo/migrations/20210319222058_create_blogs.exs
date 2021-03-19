defmodule BlogsApi.Repo.Migrations.CreateBlogs do
  use Ecto.Migration

  def change do
    create table(:blogs, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :likes, :integer
      add :views, :integer

      timestamps()
    end

  end
end
