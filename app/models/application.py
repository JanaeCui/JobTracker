from .db import db


class Application(db.Model):
    __tablename__ = "applications"

    id = db.Column(db.Integer, primary_key=True)
    state = db.Column(db.String, nullable=False)
    applied_date = db.Column(db.String)
    interviewed_date = db.Column(db.String)
    offered_date = db.Column(db.String)
    rejected_date = db.Column(db.String)
    job_id = db.Column(db.Integer, db.ForeignKey('jobs.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    users = db.relationship('User', back_populates='applications')
    jobs = db.relationship('Job', back_populates='applications')
    children = db.relationship('Child', back_populates='applications')

    def to_dict(self):
        return {
            'id': self.id,
            'state': self.state,
            'applied_date': self.applied_date,
            'interviewed_date': self.interviewed_date,
            'offered_date': self.offered_date,
            'rejected_date': self.rejected_date,
            'job_id': self.job_id,
            'user_id': self.user_id

        }
