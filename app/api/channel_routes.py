from app.api.auth_routes import validation_errors_to_error_messages
from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Channel, db, channel_users
from app.forms import ChannelForm

channel_routes = Blueprint('channels', __name__)

# GET Route


@channel_routes.route('/')
def get_channels():
    channels = Channel.query.all()
    # channel_users = channel_users.query.all()

    # return_value = {'channels': [channel.to_dict() for channel in channels]}
    # print('return_value in channel_routes-------', return_value)
    return {'channels': [channel.to_dict() for channel in channels]}

# @channel_routes('/channels/<int:user_id>/<int:channel_id>')

# POST Route


@channel_routes.route('/', methods=["POST"])
@login_required
def add_channel():

    new_channel = Channel(
        owner_id=request.json['owner_id'],
        title=request.json['title'],
        is_dm=request.json['is_dm'],
        description=request.json['description'],
    )
    if new_channel:
        db.session.add(new_channel)
        db.session.commit()
        return new_channel.to_dict()
    return {"errors": "Server error. Unable to make channel"}

# PUT Route


@channel_routes.route('/<int:channel_id>', methods=["PUT"])
@login_required
def edit_channel(channel_id):
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        channel = Channel.query.get(channel_id)
        channel.title = form.data['title']
        channel.description = form.data['description']
        channel.updated_at = datetime.now()
        db.session.commit()
        return {**channel.to_dict()}

    return {'errors': validation_errors_to_error_messages(form.errors)}

# DELETE Route


@channel_routes.route('/<int:channel_id>', methods=["DELETE"])
@login_required
def delete_channel(channel_id):
    channel = Channel.query.get(channel_id)
    deleted_channel = channel.to_dict()

    db.session.delete(channel)
    db.session.commit()

    return deleted_channel
