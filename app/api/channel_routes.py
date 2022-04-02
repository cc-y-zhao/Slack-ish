from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Channel, db

channel_routes = Blueprint('channels', __name__)

@channel_routes('/channels/<int:user_id>')
def get_channels(user_id):
    channels = Channel.query.filter(Channel.owner_id == user_id).all()
    return {'channels': [channel.to_dict() for channel in channels]}

# @channel_routes('/channels/<int:user_id>/<int:channel_id>')

# POST Route
@channel_routes.route('/', methods=["POST"])
@login_required
def add_channel():

    new_channel = Channel(
      owner_id = request.json['user_id'],
      title = request.json['title'],
      is_dm = request.json['is_dm'],
      description = request.json['description'],
  )
    if new_channel:
      db.session.add(new_channel)
      db.session.commit()
      return new_channel.to_dict()
    return {"errors": "Server error. Unable to make channel"}
