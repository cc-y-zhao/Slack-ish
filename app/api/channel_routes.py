from pyexpat.errors import messages
from app.api.auth_routes import validation_errors_to_error_messages
from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Channel, User, Message, db
from app.forms import ChannelForm
from sqlalchemy import join
import datetime
from sqlalchemy import DateTime
from sqlalchemy.sql import func

channel_routes = Blueprint('channels', __name__)

# GET logged in user's channels


@channel_routes.route('/all')
@login_required
def get_session_user_channels():
    channels = current_user.channels
    channels_dicted = []

    for channel in channels:
        users_ids = []
        channel_dicted = channel.to_dict()
        users_in_channel = channel_dicted['users_in_channel']
        for user in users_in_channel:
            users_ids.append(user['id'])
            channel_dicted['users_ids'] = users_ids
        channels_dicted.append(channel_dicted)

    return {'channels': channels_dicted}

# GET Route


@channel_routes.route('/<int:channel_id>')
@login_required
def get_one_channel(channel_id):
    channel = db.session.query(Channel).get(channel_id)
    all_messages_query = db.session.query(Message).filter(
        Message.channel_id == channel_id).all()
    all_messages = [message.to_dict() for message in all_messages_query]

    messages = {}

    for message in all_messages:
        messages[message['id']] = message

    users_ids = []
    users_in_channel_no_dict = channel.to_dict()
    users_in_channel = users_in_channel_no_dict['users_in_channel']

    for user in users_in_channel:
        users_ids.append(user['id'])

    user_list = []
    for message in all_messages:
        user_before_to_dict = db.session.query(
            User).filter(User.id == message['user_id']).one()
        user = user_before_to_dict.to_dict()

        name = user['first_name'] + ' ' + user['last_name']
        message['name'] = name
        message['image_url'] = user['image_url']

        user_list.append(user)

    single_channel = channel.to_dict()
    single_channel['messages'] = messages
    single_channel["all_messages"] = all_messages
    single_channel["users"] = user_list
    single_channel['users_ids'] = users_ids
    # IMPORTANT##########: SINGLE_CHANNEL['USERS] IS A LIST OF USER NAMES FOR PEOPLE WHO SENT MESSAGES
    # IMPORTANT##########: SINGLE_CHANNEL['USERS_IN_CHANNEL] IS LIST OF USERS IN THE CHANNEL!!!

    return single_channel

# POST Route


@channel_routes.route('/', methods=["POST"])
@login_required
def add_channel():
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_channel = Channel(
            owner_id=request.json['owner_id'],
            title=request.json['title'],
            is_dm=request.json['is_dm'],
            description=request.json['description'],
            time_created=datetime.datetime.now(),
            # time_created=DateTime(timezone=True), server_default=func.now(),
            # time_created=datetime.time(),
            # time_updated=datetime.now()
        )
        db.session.add(new_channel)

        current_user.channels.append(new_channel)

        db.session.commit()

        channel_dicted = new_channel.to_dict()
        channel_dicted['users_ids'] = [current_user.id]
        return channel_dicted

    return {"errors": validation_errors_to_error_messages(form.errors)}


# POST Route (to create a DM)

@channel_routes.route('/<int:session_user_id>/<int:search_user_id>', methods=["POST"])
@login_required
def add_direct_message(session_user_id, search_user_id):

    session_user = User.query.get(session_user_id)
    search_user = User.query.get(search_user_id)

    dm_channels = Channel.query.filter(Channel.is_dm == True).all()

    channel_arr = [c for c in dm_channels]

    param_ids = [session_user.id, search_user.id]

    for channel in channel_arr:
        users = channel.users  # this is an array: [<User 10>, <User 13>]

        user_ids = []

        for user in users:
            user_ids.append(user.id)

        flipped_ids = []
        flipped_ids.append(user_ids[1])
        flipped_ids.append(user_ids[0])

        if param_ids == user_ids or param_ids == flipped_ids:
            return channel.to_dict()

    session_user_full_name = f'{session_user.first_name.capitalize()} {session_user.last_name.capitalize()}'
    search_user_full_name = f'{search_user.first_name.capitalize()} {search_user.last_name.capitalize()}'

    new_channel = Channel(
        title=f'{session_user_full_name}, {search_user_full_name}',
        is_dm=True,
        time_created=datetime.datetime.utcnow(),
        # time_created=DateTime(timezone=True), server_default=func.now(),
        # time_created=datetime.time(),
        # time_updated=datetime.now()
    )

    db.session.add(new_channel)

    session_user.channels.append(new_channel)
    search_user.channels.append(new_channel)

    db.session.commit()
    return new_channel.to_dict()

# POST Route to add a user to a channel
#####################################################


@channel_routes.route('add_user/<int:channel_id>/<int:user_id>', methods=["POST"])
@login_required
def add_user_channel(channel_id, user_id):

    channel = Channel.query.get(channel_id)
    user = User.query.get(user_id)

    user.channels.append(channel)

    db.session.commit()
    return channel.to_dict()


# PUT Route
@channel_routes.route('/<int:channel_id>', methods=["PUT"])
@login_required
def edit_channel(channel_id):
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    data = form.data

    if form.validate_on_submit():
        channel = Channel.query.get(channel_id)
        channel.title = data['title']
        channel.description = data['description']

        db.session.commit()

        users_ids = []
        channel_dicted = channel.to_dict()
        users_in_channel = channel_dicted['users_in_channel']

        for user in users_in_channel:
            users_ids.append(user['id'])
        channel_dicted['users_ids'] = users_ids

        return channel_dicted

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
