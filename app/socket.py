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
# @socketio.on("chat")
# def handle_chat(data):
#     emit("chat", data, broadcast=True)

@socketio.on('connect')
def on_connect():
    print('user connected')
    retrieve_active_users()


def retrieve_active_users():
    emit('retrieve_active_users', broadcast=True)


@socketio.on('activate_user')
def on_active_user(data):
    user = data.get('username')
    emit('user_activated', {'user': user}, broadcast=True)


@socketio.on('deactivate_user')
def on_inactive_user(data):
    user = data.get('username')
    emit('user_deactivated', {'user': user}, broadcast=True)


@socketio.on('join_room')
def on_join(data):
    room = data['room']
    print('joinnning hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', data)
    join_room(room)
    emit('open_room', {'room': room}, broadcast=True)


@socketio.on("leave_room")
def leave(data):
    print('leaving hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', data)
    leave_room(data['room'])


@socketio.on('message')
def on_chat_sent(data):
    print('\n\n\n data issssss hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee \n\n\n', data)
    room = data['room']
    # outgoing_message =
    send({'id': data['id'], 'channel_id': data['channel_id'], 'content': data['content'], 'created_at': data['time_created'],
         'room': data['room'], 'user': data['user']}, room=data['room'],)
