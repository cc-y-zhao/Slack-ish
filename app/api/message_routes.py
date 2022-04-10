from app.api.auth_routes import validation_errors_to_error_messages
from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Message, db
from app.forms import MessageForm
import datetime
from sqlalchemy import DateTime
from sqlalchemy.sql import func

message_routes = Blueprint('messages', __name__)

# POST Route


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
            time_created=datetime.datetime.utcnow(),

            # time_updated=datetime.now()
        )
        db.session.add(new_message)
        db.session.commit()
        return new_message.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}


# PUT Route
@message_routes.route('/<int:message_id>', methods=["PUT"])
@login_required
def edit_message(message_id):
    print(f'\n\n im in edit message\n\n')
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    data = form.data

    if form.validate_on_submit():
        message = Message.query.get(message_id)
        print('message to edit in message routes--------', message)
        message.content = data['content']
        message.time_updated = datetime.datetime.utcnow(),

        # message.updated_at = datetime.now()
        db.session.commit()

        return message.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}


# DELETE Route

@message_routes.route('/<int:message_id>', methods=["DELETE"])
@login_required
def delete_message(message_id):
    message = Message.query.get(message_id)
    deleted_message = message.to_dict()

    db.session.delete(message)
    db.session.commit()

    return deleted_message
