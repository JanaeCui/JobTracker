from app.models import db, Job


# Adds a demo user, you can add other users here if you want
def seed_jobs():
    job1 = Job(
        position_name='Web Developer', link_url='https://www.linkedin.com/jobs/view/2638886555/?alternateChannel=search&refId=Y8RZL%2FsmWMZ21Na3%2BsdUbg%3D%3D&trackingId=NZ%2BejaT9wNavRtTgdkNqDg%3D%3D', salary='120000', description='This is my first application.', company_id=1)

    job2 = Job(
        position_name='Full stack Developer', link_url='https://www.linkedin.com/jobs/view/2642096804/?alternateChannel=search&refId=qnU4nuyS4HNzbbge%2FY89%2BA%3D%3D&trackingId=PTV087oYwPCjmg5iCNpNlQ%3D%3D', salary='150000', description='This is my first interview.', company_id=2)
    all_jobs = [job1, job2]
    db.session.add_all(all_jobs)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_jobs():
    db.session.execute('TRUNCATE jobs RESTART IDENTITY CASCADE;')
    db.session.commit()
