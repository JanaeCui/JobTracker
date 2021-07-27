from app.models import db, Company


# Adds a demo user, you can add other users here if you want
def seed_companies():
    company1 = Company(
        name='Google', location='1600 Amphitheatre Pkwy, Mountain View, CA 94043', logo_url='https://w7.pngwing.com/pngs/937/156/png-transparent-google-logo-google-search-google-account-redes-search-engine-optimization-text-service.png')

    company2 = Company(
        name='Apple', location=' 1 Apple Park Way, Cupertino, CA 95014', logo_url='https://mpng.subpng.com/20180705/ehc/kisspng-logo-apple-brand-rainbow-5b3e38ffb55a87.7722970415308044797428.jpg')
    all_companies = [company1, company2]
    db.session.add_all(all_companies)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_companies():
    db.session.execute('TRUNCATE companies RESTART IDENTITY CASCADE;')
    db.session.commit()
