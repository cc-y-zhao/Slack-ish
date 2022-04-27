from pyexpat.errors import messages
from this import d
from app.api.auth_routes import validation_errors_to_error_messages
from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Channel, User, channel_users
from sqlalchemy import join
import datetime
from sqlalchemy import DateTime
from sqlalchemy.sql import func
from sqlalchemy import or_

search_routes = Blueprint('search', __name__)

# GET Route (all users)


@search_routes.route('/')
@login_required
def get_users():

    users = User.query.all()

    return {'users': [user.to_dict() for user in users]}

# GET search result for users


@search_routes.route('/users', methods=["GET"])
# @login_required
def get_users_results():
    users = User.query.all()
    query = request.args.get('searchInput')

    found_users = []

    for user in users:
        fullname = f'{user.first_name} {user.last_name}'.lower()
        if user != current_user and fullname.find(query.lower()) >= 0:
            found_users.append(user.to_dict())

    return {'users_results': found_users}

# GET search result for users in a specific channel

@search_routes.route('/users-in-channel/', methods=["GET"])
@login_required
def get_channel_users():

    search_input = request.args.get('searchInput')
    channel_id = request.args.get('channelId')

    channel = Channel.query.get(channel_id)
    channel_users = channel.users

    results = User.query.filter(User.email.not_in(
        [user.email for user in channel_users])).all()

    found_users = []

    for user in results:
        fullname = f'{user.first_name} {user.last_name}'.lower()
        if user != current_user and fullname.find(search_input.lower()) >= 0:
            found_users.append(user.to_dict())

    return {'users_results': found_users}
