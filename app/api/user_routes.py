from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/username', methods=['PUT'])
def put_username():
    try:
        current_user.username = request.json['username']
        db.session.commit()
        return current_user.to_dict()
    except:
        return {"error" : "Name already exited!"}
