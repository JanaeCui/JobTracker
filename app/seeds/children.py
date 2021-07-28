from app.models import db, Child


# Adds a demo user, you can add other users here if you want
def seed_children():
    child1 = Child(
        application_id=1, board_id=1)

    child2 = Child(
        application_id=2, board_id=1)
    all_children = [child1, child2]
    db.session.add_all(all_children)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_children():
    db.session.execute('TRUNCATE children RESTART IDENTITY CASCADE;')
    db.session.commit()
