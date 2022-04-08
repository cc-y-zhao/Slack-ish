from pyexpat.errors import messages
from this import d
from app.api.auth_routes import validation_errors_to_error_messages
from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Channel, User, Message, db, channel_users
# from app.forms import ChannelForm
from sqlalchemy import join
import datetime
from sqlalchemy import DateTime
from sqlalchemy.sql import func
from sqlalchemy import or_

search_routes = Blueprint('search', __name__)

#################################USERS######################################
#GET Route (all users)
@search_routes.route('/')
@login_required
def get_users():

    users = User.query.all()

    return {'users': [user.to_dict() for user in users]}

# GET search result for users
@search_routes.route('/users', methods=["GET"])
# @login_required
def get_users_results():

    # request_data = request.data
    # request_json = request.get_json()
    # print(f'\n\nrequest data is {request_data}\n\n')
    # print(f'\n\nrequest json is {request_json}\n\n')

    # query = request_json.get("query")
    # print(f'\n\nquery is {query}\n\n')

    # return "good"

    # from a/A:    .filter(or_(Pony.name == "Bob", Pony.name == "Blob"))

    # request_json = request.get_json()
    # searchInput is the key of the request body
    # query = request_json.get('searchInput')
    users = User.query.all()
    query = request.args.get('searchInput')

    found_users = []

    print(f'query is {query}')

    for user in users:
        fullname = f'{user.first_name} {user.last_name}'.lower()
        if fullname.find(query.lower()) >= 0:
            found_users.append(user.to_dict())

    return {'users_results': found_users}

    # Below does not return results for full name:
    # print(f'\n\nquery:\n{query}\n\n')

    # search_pattern = f'%{query}%'

    # first_name_pattern = User.first_name.ilike(search_pattern)
    # last_name_pattern = User.last_name.ilike(search_pattern)
    # users = User.query.filter(or_(first_name_pattern, last_name_pattern))


    # return {'users_results': [user.to_dict() for user in users]}



@search_routes.route('/users-in-channel/', methods=["GET"])
# @login_required
def get_channel_users_results():

    users = User.query.all()
    channel_id = request.args.get('channelId')
    channel = Channel.query.get(channel_id)
    channel_users = channel.users

    # print('\n\n CHANNEL USERS \n\n', channel_users)
    results = User.query.filter(User.email.not_in([user.email for user in channel_users])).all()

    print('\n\n RESULTS \n\n', results)
    print('\n\n NUM OF RESULTS \n\n', len(results))

    # print('\n\n channel id \n\n', channel_id)
    # print('\n\n CHANNEL \n\n', channel)
    # print('\n\n CHANNEL USERS \n\n', channel_users)
    # print('\n\n USERS \n\n', users)
    # print('\n\n CHANNEL USERS nameee \n\n', channel_users[0].email)

    # print(f'query is {query}')

    # for user in users:
    #     fullname = f'{user.first_name} {user.last_name}'.lower()
    #     if fullname.find(query.lower()) >= 0:
    #         found_users.append(user.to_dict())

    return {'users': [user.to_dict() for user in results]}
