from .db import db, environment, SCHEMA, add_prefix_for_prod

channel_users = db.Table(
    'channel_users',
    db.Column(
        'channel_id',
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('channels.id')),
        primary_key=True
    ),
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('users.id')),
        primary_key=True
    )
)
if environment == "production":
    channel_users.schema = SCHEMA
