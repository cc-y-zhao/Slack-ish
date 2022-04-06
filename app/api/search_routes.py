from pyexpat.errors import messages
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

    request_json = request.get_json()
    # searchInput is the key of the request body
    query = request_json.get('searchInput')

    print(f'\n\nquery:\n{query}\n\n')

    search_pattern = f'%{query}%'

    first_name_pattern = User.first_name.ilike(search_pattern)
    last_name_pattern = User.last_name.ilike(search_pattern)
    users = User.query.filter(or_(first_name_pattern, last_name_pattern))


    return {'users_results': [user.to_dict() for user in users]}
