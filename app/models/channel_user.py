from .db import db

channel_users = db.Table(
    'channel_users',
    db.Column(
        'channel_id',
        db.Integer,
        db.ForeignKey('channels.id'),
        primary_key=True
    ),
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey("users.id"),
        primary_key=True
    )
)
