from app.models import db, Message


def seed_messages():
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


# Uses a raw SQL query to TRUNCATE the messages table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
