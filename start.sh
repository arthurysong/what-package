echo Hi
source .env
PORT=4001 MIX_ENV=prod elixir --erl "-detached" -S mix phx.server