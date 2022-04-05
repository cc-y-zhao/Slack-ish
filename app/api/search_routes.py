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

search_routes = Blueprint('search', __name__)

######################################USERS######################################
#GET Route (all users)
@search_routes.route('/')
@login_required
def get_users():

    users = User.query.all()

    return {'users': [user.to_dict() for user in users]}
