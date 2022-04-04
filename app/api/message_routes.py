from app.api.auth_routes import validation_errors_to_error_messages
from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Message, db
# from app.models import Channel, db, channel_users
# from app.forms import ChannelForm

message_routes = Blueprint('messages', __name__)

# GET Route
# GET a message that cecilia sent to sharon
@message_routes.route('/<int:channel_id>')
def get_channels():
    channels = Channel.query.all()
    # channel_users = channel_users.query.all()

    # return_value = {'channels': [channel.to_dict() for channel in channels]}
    # print('return_value in channel_routes-------', return_value)
    return {'channels': [channel.to_dict() for channel in channels]}
