from .db import db


class Board(db.Model):
    __tablename__ = "boards"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    users = db.relationship('User', back_populates='boards')
    children = db.relationship('Child', back_populates='boards', cascade="all, delete-orphan")

    @property
    def applications(self):
        return [child.applications for child in self.children]

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_id': self.user_id,
        }
