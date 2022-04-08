"""empty message

Revision ID: 9d867cbe7b14
Revises: d0a21987dc11
Create Date: 2022-04-07 23:02:05.986481

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9d867cbe7b14'
down_revision = 'd0a21987dc11'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('image_url', sa.String(length=2000), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'image_url')
    # ### end Alembic commands ###