from .db import db
from .channel_user import channel_users
from sqlalchemy import DateTime
from sqlalchemy.sql import func


class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    title = db.Column(db.String(50), nullable=False)
    is_dm = db.Column(db.Boolean, nullable=False)
    description = db.Column(db.String(150))
    time_created = db.Column(DateTime(timezone=True),
                             server_default=func.now())
    time_updated = db.Column(DateTime(timezone=True), onupdate=func.now())

    users = db.relationship(
        "User",
        secondary=channel_users,
        back_populates="channels",
    )
    # users = db.relationship(
    #     "User",
    #     secondary=channel_users,
    #     back_populates="channels",
    #     cascade="all, delete"
    # )
    messages = db.relationship(
        "Message", back_populates="channel", cascade="all, delete"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'title': self.title,
            'is_dm': self.is_dm,
            'description': self.description,
            'time_created': self.time_created,
            'time_updated': self.time_updated,
            'users': [u.info() for u in self.users],
            'messages': [m.to_dict() for m in self.messages]
        }
