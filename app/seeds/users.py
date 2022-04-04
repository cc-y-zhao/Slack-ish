from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
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


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
