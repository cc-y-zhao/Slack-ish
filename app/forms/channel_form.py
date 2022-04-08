from tokenize import String
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import InputRequired, ValidationError


def title_max_length(form, field):
    title = field.data
    if len(title) > 50:
        raise ValidationError('Title must be 50 characters or less')


def description_max_length(form, field):
    description = field.data
    if len(description) > 150:
        raise ValidationError('Description must be 1000 characters or less')


class ChannelForm(FlaskForm):
    owner_id = IntegerField('owner_id')
    title = StringField('title', validators=[
                        InputRequired(), title_max_length])
    is_dm = BooleanField('is_dm')
    description = StringField('description', validators=[
                              description_max_length])
