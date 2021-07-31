from .db import db


class Job(db.Model):
    __tablename__ = "jobs"

    id = db.Column(db.Integer, primary_key=True)
    position_name = db.Column(db.String, nullable=False)
    link_url = db.Column(db.Text)
    salary = db.Column(db.Integer)
    description = db.Column(db.Text)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=False)

    applications = db.relationship('Application', back_populates='jobs')
    companies = db.relationship('Company', back_populates='jobs')

    def to_dict(self):
        return {
            'id': self.id,
            'position_name': self.position_name,
            'link_url': self.link_url,
            'salary': self.salary,
            'description': self.description,
            'company_id': self.company_id,
            'companies': self.companies.to_dict()
        }
