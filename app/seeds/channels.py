from app.models import db, Channel


def seed_channels():
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


# Uses a raw SQL query to TRUNCATE the channels table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
