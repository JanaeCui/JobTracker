from app.models import db, Application


# Adds a demo user, you can add other users here if you want
def seed_applications():
    application1 = Application(
        state='applied', applied_date='2021-06-02 21:28:10.328-04', interviewed_date='', offered_date='', rejected_date='', job_id=1, user_id=1)

    application2 = Application(
        state='interviewed', applied_date='', interviewed_date='2021-06-03 21:00:10.328-04', offered_date='', rejected_date='', job_id=2, user_id=1)
    all_applications = [application1, application2]
    db.session.add_all(all_applications)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_applications():
    db.session.execute('TRUNCATE applications RESTART IDENTITY CASCADE;')
    db.session.commit()
