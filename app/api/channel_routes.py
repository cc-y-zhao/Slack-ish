from pyexpat.errors import messages
from app.api.auth_routes import validation_errors_to_error_messages
from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Channel, User, Message, db, channel_users
from app.forms import ChannelForm
from sqlalchemy import join
import datetime
from sqlalchemy import DateTime
from sqlalchemy.sql import func

channel_routes = Blueprint('channels', __name__)

# GET logged in user's channels
@channel_routes.route('/user/<int:user_id>')
@login_required
def get_session_user_channels(user_id):
    # channels = Channel.query.all()
    # user_id = 1
    # print('channels backend', type(channels))
    channel_users_query = Channel.query.join(channel_users).join(
        User).filter((channel_users.c.user_id == user_id)).all()
    # print('channels backend@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
    #       channel_users_query)

    # return_value = {'channels': [channel.to_dict() for channel in channels]}
    # print('return_value in channel_routes-------', return_value)
    return {'channels': [channel.to_dict() for channel in channel_users_query]}

# GET logged in user's DM (search)
# @channel_routes.route('/user/<int:user_id>/<int:search_user_id>')
# @login_required
# def get_session_user_DM(user_id):
#     # channels = Channel.query.all()
#     # user_id = 1
#     # print('channels backend', type(channels))
#     channel_users_query = Channel.query.join(channel_users).join(
#         User).filter((channel_users.c.user_id == user_id)).all()
#     # print('channels backend@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
#     #       channel_users_query)

#     # return_value = {'channels': [channel.to_dict() for channel in channels]}
#     # print('return_value in channel_routes-------', return_value)
#     return {'channels': [channel.to_dict() for channel in channel_users_query]}



# GET Route
@channel_routes.route('/<int:channel_id>')
@login_required
def get_one_channel(channel_id):
    # print('IM IN CHANNEL_ROUTES')
    # channel = Channel.query.get(channel_id)

    # channel = Channel.query.filter(Channel.id == channel_id)
    # .filter(Message.channel_id == channel_id).all()
    # channel = db.session.query(Channel, Message).filter(Channel.id == channel_id).filter(Message.channel_id == channel_id).all()
    channel = db.session.query(Channel).get(channel_id)
    all_messages_query = db.session.query(Message).filter(
        Message.channel_id == channel_id).all()
    all_messages = [message.to_dict() for message in all_messages_query]

    messages = {}

    for message in all_messages:
        messages[message['id']] = message

    # print('MESSAGES IN HCANNEL_ROUTES-----', messages)

    # messages['first_name] =

    user_list = []
    for message in all_messages:
        # print("MESSAGE:", message)
        user_before_to_dict = db.session.query(
            User).filter(User.id == message['user_id']).one()
        # print("USER_BEFORETODICT:-------------------", user_before_to_dict)
        user = user_before_to_dict.to_dict()
        # print("USER_TODICT:-------------------", user)

        name = user['first_name'] + ' ' + user['last_name']
        message['name'] = name

        user_list.append(user)

    single_channel = channel.to_dict()
    single_channel['messages'] = messages
    single_channel["all_messages"] = all_messages
    single_channel["users"] = user_list
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
            time_created=datetime.datetime.utcnow(),
            # time_created=DateTime(timezone=True), server_default=func.now(),
            # time_created=datetime.time(),
            # time_updated=datetime.now()
        )
        db.session.add(new_channel)

        owner = User.query.get(request.json['owner_id'])
        owner.channels.append(new_channel)

        db.session.commit()
        return new_channel.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}


# POST Route (to create a DM)

@channel_routes.route('/<int:session_user_id>/<int:search_user_id>', methods=["POST"])
# @login_required
def add_direct_message(session_user_id, search_user_id):

    session_user = User.query.get(session_user_id)
    search_user = User.query.get(search_user_id)

    session_user_full_name = f'{session_user.first_name.capitalize()} {session_user.last_name.capitalize()}'
    search_user_full_name = f'{search_user.first_name.capitalize()} {search_user.last_name.capitalize()}'

    new_channel = Channel(
        title= f'{session_user_full_name}, {search_user_full_name}',
        is_dm= True,
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



# PUT Route
@channel_routes.route('/<int:channel_id>', methods=["PUT"])
@login_required
def edit_channel(channel_id):
    # print(f'\n\n im in edit channel\n\n')
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    data = form.data

    if form.validate_on_submit():
        channel = Channel.query.get(channel_id)
        channel.title = data['title']
        channel.description = data['description']

        db.session.commit()


        return channel.to_dict()


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
