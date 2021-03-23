defmodule BlogsApiWeb.Router do
  use BlogsApiWeb, :router

  pipeline :api do
    plug CORSPlug, origin: "*"
    plug :accepts, ["json"]
  end

  get "/", BlogsApiWeb.BlogController, :test

  scope "/api", BlogsApiWeb do
    pipe_through :api

    resources "/blogs", BlogController, except: [:new, :edit]
    scope "/blogs" do
      post "/:id/views", BlogController, :inc_views_of_blog
      post "/:id/likes", BlogController, :inc_likes_of_blog
    end
  end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through [:fetch_session, :protect_from_forgery]
      live_dashboard "/dashboard", metrics: BlogsApiWeb.Telemetry
    end
  end
end
