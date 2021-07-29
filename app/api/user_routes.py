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
    # form = EventForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    #     event = Event.query.filter(Event.id == id).one()
    #     event.name = form.name.data,
    #     event.description = form.description.data,
    #     event.date_and_time = form.date_and_time.data,
    #     event.location = form.location.data,
    #     event.host_id = current_user.id,
    current_user.username = request.json['username']
    db.session.commit()
    return current_user.to_dict()

    errorMessages = []
    for field in form.errors:
        for error in form.errors[field]:
            formattedErr = error[10:]
            formattedField = field.replace('_', ' ').replace(' id', '').capitalize()
            errorMessages.append(f'{formattedField} {formattedErr}')
    return{'errors': errorMessages}
