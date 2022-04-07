from app.models import db, User
from app.models import db, Channel
from app.models import db, Message


def seed_all():
    # seed_users():
    channel1 = Channel(
        title='Welcome', is_dm=False, description='We are cloning Slack!')

    demo = User(
        first_name='App', last_name='Academy', email='demo@aa.io', password='password', channels=[channel1])
    sharon = User(
        first_name='Sharon', last_name='Fang', email='sharon@aa.io', password='password', channels=[channel1])
    gabriel = User(
        first_name='Gabriel', last_name='Sitorus', email='gabriel@aa.io', password='password', channels=[channel1])
    cecilia = User(
        first_name='Cecilia', last_name='Zhao', email='cecilia@aa.io', password='password', channels=[channel1])

    db.session.add(demo)
    db.session.add(sharon)
    db.session.add(gabriel)
    db.session.add(cecilia)

    first_names = ['Charlie', 'Dan', 'Caleb', 'Drew',
                   'Albus', 'Keebie', 'Eevie', 'Sherry', 'John']
    last_names = ['Hope', 'Purcell', 'Braaten', 'Thurman',
                  'Dumbledore', 'Chen', 'Zhao', 'Yu', 'Lee']

    for first_name, last_name in zip(first_names, last_names):
        new_email = f'{first_name}{last_name}@aa.io'
        new_user = User(first_name=first_name, last_name=last_name,
                        email=new_email, password='password', channels=[channel1])
        db.session.add(new_user)

    db.session.flush()

    # seed_channels():
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

    # seed_dms():
    dms1 = Channel(
        title='App Academy, Cecilia Zhao', is_dm=True)
    dms2 = Channel(
        title='App Academy, Gabriel Sitorus', is_dm=True)
    dms3 = Channel(
        title='App Academy, Sharon Fang', is_dm=True)

    db.session.add(dms1)
    db.session.add(dms2)
    db.session.add(dms3)

    # seed_messages():
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

    # seed_channel_users():
    seed_channel_list = [channel2, channel3, channel4, channel5, channel6]
    demo.channels.extend(seed_channel_list)
    sharon.channels.extend(seed_channel_list)
    gabriel.channels.extend(seed_channel_list)
    cecilia.channels.extend(seed_channel_list)

    demo.channels.append(dms1)
    cecilia.channels.append(dms1)
    demo.channels.append(dms2)
    demo.channels.append(dms3)
    sharon.channels.append(dms3)
    gabriel.channels.append(dms2)

    db.session.commit()


def undo_seed_all():
    # undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

    # undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()

    # undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()

    # undo_channel_users():
    db.session.execute('TRUNCATE channel_users RESTART IDENTITY CASCADE;')
    db.session.commit()
