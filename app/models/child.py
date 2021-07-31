from .db import db


class Child(db.Model):
    __tablename__ = "children"

    id = db.Column(db.Integer, primary_key=True)
    application_id = db.Column(db.Integer, db.ForeignKey('applications.id'), nullable=False)
    board_id = db.Column(db.Integer, db.ForeignKey('boards.id'), nullable=False)

    applications = db.relationship('Application', back_populates='children')
    boards = db.relationship('Board', back_populates='children')

    def to_dict(self):
        return {
            'id': self.id,
            'application_id': self.application_id,
            'board_id': self.board_id,
            'applications': self.applications.to_dict()
        }
