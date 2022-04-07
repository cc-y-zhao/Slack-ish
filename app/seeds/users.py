from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='App', last_name='Academy', email='demo@aa.io', password='password', image_url='data:image/png;base64,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')
    sharon = User(
        first_name='Sharon', last_name='Fang', email='sharon@aa.io', password='password', image_url='https://pbs.twimg.com/media/EbSfCHFU8AEimfk.jpg')
    gabriel = User(
        first_name='Gabriel', last_name='Sitorus', email='gabriel@aa.io', password='password', image_url='https://media-exp1.licdn.com/dms/image/D5603AQHYi5RD9DFdKA/profile-displayphoto-shrink_200_200/0/1647206013202?e=1654732800&v=beta&t=kWWvntvsst9HwJikcrAKGe8fSr3-caSoOAVG2cW8MM8')
    cecilia = User(
        first_name='Cecilia', last_name='Zhao', email='cecilia@aa.io', password='password', image_url='https://ca.slack-edge.com/T03GU501J-U02D2PVAF5W-41109fd1a78b-72')
    ceclia = User(
        first_name='Ceclia', last_name='Chen', email='ceclia@aa.io', password='password', image_url='https://ca.slack-edge.com/T03GU501J-U02D2PVAF5W-41109fd1a78b-72')

    first_names = ['Adam', 'Aaron', 'Angela', 'Bob', 'Brian', 'Beth', 'Charlie', 'Dan', 'Caleb', 'Drew']
    last_names = ['Johnson', 'Smith', 'Lee', 'Washington', 'Lincoln', 'Smart', 'Hope', 'Purcell', 'Braaten', 'Thurman']
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
    for first_name in first_names:
        for last_name in last_names:
            for image_url in image_urls:
                new_email = f'{first_name}{last_name}@aaAA.io'
                new_user = User(first_name=first_name, last_name=last_name, email=new_email, password='password' image_url=image_url)
                db.session.add(new_user)

    db.session.add(demo)
    db.session.add(sharon)
    db.session.add(gabriel)
    db.session.add(cecilia)
    db.session.add(ceclia)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
