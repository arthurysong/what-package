defmodule BlogsApiWeb.BlogView do
  use BlogsApiWeb, :view
  alias BlogsApiWeb.BlogView

  def render("index.json", %{blogs: blogs}) do
    %{data: render_many(blogs, BlogView, "blog.json")}
  end

  def render("show.json", %{blog: blog}) do
    %{data: render_one(blog, BlogView, "blog.json")}
  end

  def render("blog.json", %{blog: blog}) do
    %{id: blog.id,
      name: blog.name,
      likes: blog.likes,
      views: blog.views}
  end
end
