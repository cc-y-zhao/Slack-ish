from .db import db
from .channel_user import channel_users


class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    title = db.Column(db.String(50), nullable=False)
    is_dm = db.Column(db.Boolean, nullable=False)
    description = db.Column(db.String(1000))

    users = db.relationship(
        "User",
        secondary=channel_users,
        back_populates="channels",
        cascade="all, delete"
    )
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
        }
