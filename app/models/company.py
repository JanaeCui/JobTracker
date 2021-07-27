from .db import db


class Company(db.Model):
    __tablename__ = "companies"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    location = db.Column(db.Text)
    logo_url = db.Column(db.Text)

    jobs = db.relationship('Job', back_populates='companies')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'logo_url': self.logo_url,
        }
