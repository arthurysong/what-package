defmodule BlogsApiWeb.BlogController do
  use BlogsApiWeb, :controller

  alias BlogsApi.Resources
  alias BlogsApi.Resources.Blog

  action_fallback BlogsApiWeb.FallbackController

  def index(conn, _params) do
    blogs = Resources.list_blogs()
    render(conn, "index.json", blogs: blogs)
  end

  def create(conn, %{"blog" => blog_params}) do
    with {:ok, %Blog{} = blog} <- Resources.create_blog(blog_params) do
      conn
      |> put_status(:created)
      # |> put_resp_header("location", Routes.blog_path(conn, :show, blog))
      |> render("show.json", blog: blog)
    end
  end

  def show(conn, %{"id" => id}) do
    blog = Resources.get_blog!(id)
    render(conn, "show.json", blog: blog)
  end

  def update(conn, %{"id" => id, "blog" => blog_params}) do
    blog = Resources.get_blog!(id)

    with {:ok, %Blog{} = blog} <- Resources.update_blog(blog, blog_params) do
      render(conn, "show.json", blog: blog)
    end
  end

  def delete(
    conn,
    # This is just destructuring the argument
    # This second argument is a map with key id.
    # the value of "id" gets assigned to the variable id
    %{"id" => id}) do
    blog = Resources.get_blog!(id)

    with {:ok, %Blog{}} <- Resources.delete_blog(blog) do
      send_resp(conn, :no_content, "")
    end
  end

  def inc_view_of_blog(conn, id) do
    blog = Resources.get_blog!(id)

    # With are basically case statements or if statements
    # if Resources.inc_view(id)'s return matches the tuple we supplied we continue on with the do clause
    with {:ok, %Blog{}} <- Resources.inc_view(id) do
      render(conn, "show.json", blog: blog)
    end
  end
end
