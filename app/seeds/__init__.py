from flask.cli import AppGroup
from .seed_all import seed_all, undo_seed_all
# from .users import seed_users, undo_users
# from .channels import seed_channels, undo_channels
# from .messages import seed_messages, undo_messages
# from .channel_users import seed_channel_users, undo_channel_users

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_all()
    # seed_users()
    # seed_channels()
    # seed_messages()
    # seed_channel_users()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_seed_all()
    # undo_users()
    # undo_channels()
    # undo_messages()
    # undo_channel_users()
    # Add other undo functions here
