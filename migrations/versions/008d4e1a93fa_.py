"""empty message

Revision ID: 008d4e1a93fa
Revises:
Create Date: 2022-04-10 11:43:08.158340

"""
from alembic import op
import sqlalchemy as sa

# Render imports
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '008d4e1a93fa'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=40), nullable=False),
    sa.Column('last_name', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('image_url', sa.String(length=2000), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('channels',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=True),
    sa.Column('title', sa.String(length=50), nullable=False),
    sa.Column('is_dm', sa.Boolean(), nullable=False),
    sa.Column('description', sa.String(length=150), nullable=True),
    sa.Column('time_created', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.Column('time_updated', sa.DateTime(timezone=True), nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('channel_users',
    sa.Column('channel_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['channel_id'], ['channels.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('channel_id', 'user_id')
    )
    op.create_table('messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('channel_id', sa.Integer(), nullable=False),
    sa.Column('content', sa.String(length=12000), nullable=False),
    sa.Column('time_created', sa.DateTime(), nullable=True),
    sa.Column('time_updated', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['channel_id'], ['channels.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE channels SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE channel_users SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE messages SET SCHEMA {SCHEMA};")

def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('messages')
    op.drop_table('channel_users')
    op.drop_table('channels')
    op.drop_table('users')
    # ### end Alembic commands ###
