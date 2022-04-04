from tokenize import String
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import InputRequired, ValidationError, DataRequired


def content_max_length(form, field):
    content = field.data
    if len(content) > 12000:
        raise ValidationError('Your message is too long')


class MessageForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    channel_id = IntegerField('channel_id', validators=[DataRequired()])
    content = StringField('content', validators=[
                        InputRequired(), content_max_length])
