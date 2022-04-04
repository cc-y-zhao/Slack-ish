from app.api.auth_routes import validation_errors_to_error_messages
from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Message, db
from app.forms import MessageForm

message_routes = Blueprint('messages', __name__)


@message_routes.route('/<int:channel_id>', methods=['POST'])
@login_required
def post_message(channel_id):
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_message = Message(
            user_id=request.json['user_id'],
            channel_id=channel_id,
            content=request.json['content'],
            time_created=datetime.now(),
            # time_updated=datetime.now()
        )
        db.session.add(new_message)
        db.session.commit()
        return new_message.to_dict()
        # return {**new_channel.to_dict()}

    return {"errors": validation_errors_to_error_messages(form.errors)}
