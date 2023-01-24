from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime
from sqlalchemy import DateTime
from sqlalchemy.sql import func


class Message(db.Model):
    __tablename__ = 'messages'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('channels.id')), nullable=False)
    content = db.Column(db.String(12000), nullable=False)
    # created_date = DateTime(default=datetime.datetime.utcnow)
    time_created = db.Column(DateTime())
    time_updated = db.Column(DateTime())
    # time_created = db.Column(DateTime(timezone=True), server_default=func.now())
    # time_updated = db.Column(DateTime(timezone=True), onupdate=func.now())

    # created_date = DateTime(default=datetime.datetime.utcnow)

    user = db.relationship('User', back_populates='messages')
    channel = db.relationship('Channel', back_populates='messages')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'channel_id': self.channel_id,
            'content': self.content,
            'time_created': self.time_created,
            'time_updated': self.time_updated,
            'user': self.user.info(),
        }
