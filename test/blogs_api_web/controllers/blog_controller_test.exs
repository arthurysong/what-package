defmodule BlogsApiWeb.BlogControllerTest do
  use BlogsApiWeb.ConnCase

  alias BlogsApi.Resources
  alias BlogsApi.Resources.Blog

  @create_attrs %{
    likes: 42,
    name: "some name",
    views: 42
  }
  @update_attrs %{
    likes: 43,
    name: "some updated name",
    views: 43
  }
  @invalid_attrs %{likes: nil, name: nil, views: nil}

  def fixture(:blog) do
    {:ok, blog} = Resources.create_blog(@create_attrs)
    blog
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all blogs", %{conn: conn} do
      conn = get(conn, Routes.blog_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create blog" do
    test "renders blog when data is valid", %{conn: conn} do
      conn = post(conn, Routes.blog_path(conn, :create), blog: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.blog_path(conn, :show, id))

      assert %{
               "id" => id,
               "likes" => 42,
               "name" => "some name",
               "views" => 42
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.blog_path(conn, :create), blog: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update blog" do
    setup [:create_blog]

    test "renders blog when data is valid", %{conn: conn, blog: %Blog{id: id} = blog} do
      conn = put(conn, Routes.blog_path(conn, :update, blog), blog: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.blog_path(conn, :show, id))

      assert %{
               "id" => id,
               "likes" => 43,
               "name" => "some updated name",
               "views" => 43
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, blog: blog} do
      conn = put(conn, Routes.blog_path(conn, :update, blog), blog: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete blog" do
    setup [:create_blog]

    test "deletes chosen blog", %{conn: conn, blog: blog} do
      conn = delete(conn, Routes.blog_path(conn, :delete, blog))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.blog_path(conn, :show, blog))
      end
    end
  end

  defp create_blog(_) do
    blog = fixture(:blog)
    %{blog: blog}
  end
end
