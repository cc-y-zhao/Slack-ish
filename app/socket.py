from flask import Flask, request
from flask_socketio import SocketIO, emit, join_room, leave_room, send
import os

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
socketio = SocketIO(cors_allowed_origins=origins,
                    logger=True, engineio_logger=True)
# socketio = SocketIO(cors_allowed_origins=origins)


# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True)
