defmodule BlogsApi.ResourcesTest do
  use BlogsApi.DataCase

  alias BlogsApi.Resources

  describe "blogs" do
    alias BlogsApi.Resources.Blog

    @valid_attrs %{likes: 42, name: "some name", views: 42}
    @update_attrs %{likes: 43, name: "some updated name", views: 43}
    @invalid_attrs %{likes: nil, name: nil, views: nil}

    def blog_fixture(attrs \\ %{}) do
      {:ok, blog} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Resources.create_blog()

      blog
    end

    test "list_blogs/0 returns all blogs" do
      blog = blog_fixture()
      assert Resources.list_blogs() == [blog]
    end

    test "get_blog!/1 returns the blog with given id" do
      blog = blog_fixture()
      assert Resources.get_blog!(blog.id) == blog
    end

    test "create_blog/1 with valid data creates a blog" do
      assert {:ok, %Blog{} = blog} = Resources.create_blog(@valid_attrs)
      assert blog.likes == 42
      assert blog.name == "some name"
      assert blog.views == 42
    end

    test "create_blog/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Resources.create_blog(@invalid_attrs)
    end

    test "update_blog/2 with valid data updates the blog" do
      blog = blog_fixture()
      assert {:ok, %Blog{} = blog} = Resources.update_blog(blog, @update_attrs)
      assert blog.likes == 43
      assert blog.name == "some updated name"
      assert blog.views == 43
    end

    test "update_blog/2 with invalid data returns error changeset" do
      blog = blog_fixture()
      assert {:error, %Ecto.Changeset{}} = Resources.update_blog(blog, @invalid_attrs)
      assert blog == Resources.get_blog!(blog.id)
    end

    test "delete_blog/1 deletes the blog" do
      blog = blog_fixture()
      assert {:ok, %Blog{}} = Resources.delete_blog(blog)
      assert_raise Ecto.NoResultsError, fn -> Resources.get_blog!(blog.id) end
    end

    test "change_blog/1 returns a blog changeset" do
      blog = blog_fixture()
      assert %Ecto.Changeset{} = Resources.change_blog(blog)
    end
  end
end
