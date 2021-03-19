defmodule BlogsApi.Resources.Blog do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "blogs" do
    field :likes, :integer
    field :name, :string
    field :views, :integer

    timestamps()
  end

  @doc false
  # create a valid changeset, using params...
  def changeset(blog, attrs) do
    blog
    |> cast(attrs, [:name, :likes, :views])
    |> validate_required([:name, :likes, :views])
  end
end
