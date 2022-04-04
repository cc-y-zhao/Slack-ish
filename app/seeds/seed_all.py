from app.models import db, User
from app.models import db, Channel
from app.models import db, Message


def seed_all():
    # def seed_users():
    demo = User(
        first_name='App', last_name='Academy', email='demo@aa.io', password='password')
    sharon = User(
        first_name='Sharon', last_name='Fang', email='sharon@aa.io', password='password')
    gabriel = User(
        first_name='Gabriel', last_name='Sitorus', email='gabriel@aa.io', password='password')
    cecilia = User(
        first_name='Cecilia', last_name='Zhao', email='cecilia@aa.io', password='password')

    db.session.add(demo)
    db.session.add(sharon)
    db.session.add(gabriel)
    db.session.add(cecilia)

    db.session.commit()

    # def seed_channels():
    channel1 = Channel(
        owner_id='1', title='Python Project Group', is_dm=False, description='We are cloning Slack!')
    channel2 = Channel(
        owner_id='1', title='App Academy', is_dm=False, description='This is BootCAMP!')
    channel3 = Channel(
        owner_id='1', title='Just For Funsies', is_dm=False, description='Slackin\' around!')
    channel4 = Channel(
        owner_id='2', title='Riot Hire Me Pls', is_dm=False, description='Sharon wants to work for Riot')
    channel5 = Channel(
        owner_id='3', title='Interview Prep', is_dm=False, description='Gabe\'s Interview Preppers')
    channel6 = Channel(
        owner_id='4', title='Cecilia\'s Corner', is_dm=False, description='Welcome to Cecilia\'s Corner!')

    db.session.add(channel1)
    db.session.add(channel2)
    db.session.add(channel3)
    db.session.add(channel4)
    db.session.add(channel5)
    db.session.add(channel6)

    db.session.commit()

    # def seed_messages():
    message1 = Message(
        user_id='1', channel_id='1', content='Hey guys!')
    message2 = Message(
        user_id='2', channel_id='1', content='What is UP!')
    message3 = Message(
        user_id='3', channel_id='1', content='Hello...')
    message4 = Message(
        user_id='4', channel_id='1', content='Hey!')
    message5 = Message(
        user_id='1', channel_id='2', content='App Academy is cool')
    message6 = Message(
        user_id='3', channel_id='5', content='Interview prep is hard!')
    message7 = Message(
        user_id='2', channel_id='2', content='I totally agree! This is awesome possum!')
    message8 = Message(
        user_id='4', channel_id='5', content='We got this!')
    message9 = Message(
        user_id='2', channel_id='4', content='I love Riot Games')
    message10 = Message(
        user_id='4', channel_id='6', content='Welcome to my corner!')

    db.session.add(message1)
    db.session.add(message2)
    db.session.add(message3)
    db.session.add(message4)
    db.session.add(message5)
    db.session.add(message6)
    db.session.add(message7)
    db.session.add(message8)
    db.session.add(message9)
    db.session.add(message10)

    db.session.commit()

    # def seed_channel_users():
    demo.channels.append(channel1)
    demo.channels.append(channel2)
    demo.channels.append(channel3)
    demo.channels.append(channel4)
    demo.channels.append(channel5)
    demo.channels.append(channel6)
    sharon.channels.append(channel1)
    sharon.channels.append(channel2)
    sharon.channels.append(channel3)
    sharon.channels.append(channel4)
    sharon.channels.append(channel5)
    sharon.channels.append(channel6)
    gabriel.channels.append(channel1)
    gabriel.channels.append(channel2)
    gabriel.channels.append(channel3)
    gabriel.channels.append(channel4)
    gabriel.channels.append(channel5)
    gabriel.channels.append(channel6)
    cecilia.channels.append(channel1)
    cecilia.channels.append(channel2)
    cecilia.channels.append(channel3)
    cecilia.channels.append(channel4)
    cecilia.channels.append(channel5)
    cecilia.channels.append(channel6)

    db.session.commit()


def undo_seed_all():
    # def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

    # def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()

    # def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()

    # def undo_channel_users():
    db.session.execute('TRUNCATE channel_users RESTART IDENTITY CASCADE;')
    db.session.commit()
