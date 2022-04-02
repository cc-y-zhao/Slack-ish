from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Channel, db

channel_routes = Blueprint('channels', __name__)

@channel_routes('/channels/<int:user_id>')
def get_channels(user_id):
    channels = Channel.query.filter(Channel.owner_id == user_id).all()
    return('channels': [channel.to_dict() for channel in channels])

# @channel_routes('/channels/<int:user_id>/<int:channel_id>')
