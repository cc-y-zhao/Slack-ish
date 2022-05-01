from flask_socketio import SocketIO

# create your SocketIO instance
socketio = SocketIO()


# socketio = SocketIO(cors_allowed_origins=[
#         "http://slack-ish.herokuapp.com",
#         "https://slack-ish.herokuapp.com"
#     ])


if os.environ.get("FLASK_ENV") == "production":
  origins = [
    "http://slack-ish.herokuapp.com",
    "https://slack-ish.herokuapp.com"
  ]
else:
  origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)


# handle chat messages
@socketio.on("chat")
def handle_chat(data):
  emit("chat", data, broadcast=True)
