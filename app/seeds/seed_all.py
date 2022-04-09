from app.models import db, User
from app.models import db, Channel
from app.models import db, Message


def seed_all():
    # seed_users():
    channel1 = Channel(
        title='Welcome', is_dm=False, description='We are cloning Slack!')

    demo = User(
        first_name='App', last_name='Academy', email='demo@aa.io', password='password', channels=[channel1], image_url='https://assets-global.website-files.com/5dcc7f8c449e597ed83356b8/603820afd31232aab368ea6f_New%20Red-logo-emblem.png')
    sharon = User(
        first_name='Sharon', last_name='Fang', email='sharon@aa.io', password='password', channels=[channel1], image_url='https://pbs.twimg.com/media/EbSfCHFU8AEimfk.jpg')
    gabriel = User(
        first_name='Gabriel', last_name='Sitorus', email='gabriel@aa.io', password='password', channels=[channel1], image_url='https://media-exp1.licdn.com/dms/image/D5603AQHYi5RD9DFdKA/profile-displayphoto-shrink_200_200/0/1647206013202?e=1654732800&v=beta&t=kWWvntvsst9HwJikcrAKGe8fSr3-caSoOAVG2cW8MM8')
    cecilia = User(
        first_name='Cecilia', last_name='Zhao', email='cecilia@aa.io', password='password', channels=[channel1], image_url='https://ca.slack-edge.com/T03GU501J-U02D2PVAF5W-41109fd1a78b-72')

    db.session.add(demo)
    db.session.add(sharon)
    db.session.add(gabriel)
    db.session.add(cecilia)

    first_names = ['Charlie', 'Dan', 'Caleb', 'Drew',
                   'Albus', 'Keebie', 'Eevie', 'Sherry', 'John']
    last_names = ['Hope', 'Purcell', 'Braaten', 'Thurman',
                  'Dumbledore', 'Chen', 'Zhao', 'Yu', 'Lee']
    image_urls = [
        'https://ca.slack-edge.com/T03GU501J-U01M9M9GU48-70cca787cf5e-72',
        'https://ca.slack-edge.com/T03GU501J-U02SZE0GPFG-196de960a5a8-72',
        'https://ca.slack-edge.com/T03GU501J-U02SZE0GPFG-196de960a5a8-72',
        'https://ca.slack-edge.com/T03GU501J-U02H2R4AD7T-814eac0ac15a-512',
        'https://ca.slack-edge.com/T03GU501J-U02H2R4AD7T-814eac0ac15a-512',
        'https://ca.slack-edge.com/T03GU501J-U02H2R4AD7T-814eac0ac15a-512',
        'https://ca.slack-edge.com/T03GU501J-U4XLEFDMF-ga0bb56f2c05-72',
        'https://ca.slack-edge.com/T03GU501J-U0327LT9U5S-f1862c6cb1e0-512',
        'https://ca.slack-edge.com/T03GU501J-U01SH02QNCV-514081bd2fde-72',
        'https://ca.slack-edge.com/T03GU501J-U01D8FV3L12-800f94980f0b-72'
    ]
    for first_name, last_name, image_url in zip(first_names, last_names, image_urls):
        new_email = f'{first_name}{last_name}@aa.io'
        new_user = User(first_name=first_name, last_name=last_name, image_url=image_url,
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
