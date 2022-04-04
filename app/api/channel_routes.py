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

@channel_routes.route('/<int:channel_id>')
def get_one_channel(channel_id):
    print('IM IN CHANNEL_ROUTES')
    channel = Channel.query.get(channel_id)
    print('single channel in channel_routes-------', channel)
    return channel.to_dict()


# POST Route


# @channel_routes.route('/', methods=["POST"])
# @login_required
# def add_channel():

#     new_channel = Channel(
#         owner_id=request.json['owner_id'],
#         title=request.json['title'],
#         is_dm=request.json['is_dm'],
#         description=request.json['description'],
#     )
#     if new_channel:
#         db.session.add(new_channel)
#         db.session.commit()
#         return new_channel.to_dict()
#     return {"errors": "Server error. Unable to make channel"}

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
            # created_at=datetime.now(),
            # updated_at=datetime.now()
        )
        db.session.add(new_channel)
        db.session.commit()
        return new_channel.to_dict()
        # return {**new_channel.to_dict()}

    return {"errors": validation_errors_to_error_messages(form.errors)}



# PUT Route
@channel_routes.route('/<int:channel_id>', methods=["PUT"])
# @login_required
def edit_channel(channel_id):
    print(f'\n\n im in edit channel\n\n')
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    data = form.data

    if form.validate_on_submit():
        channel = Channel.query.get(channel_id)
        print('channel to edit in channel routes--------', channel)
        channel.title = data['title']
        channel.description = data['description']
        # channel.is_dm=form.data['is_dm']

        # channel.updated_at = datetime.now()
        db.session.commit()
        # print('channel.to_dict()-------', {channel.to_dict()})

        return channel.to_dict()
        # return {**channel.to_dict()}

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
