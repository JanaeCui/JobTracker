
from sqlalchemy.sql.expression import null
from app.models import application
from flask import Blueprint, request, jsonify
from flask_login import current_user
from ..models import db, Job, Child, Application, Board

job_route = Blueprint('jobs', __name__, url_prefix='')


@job_route.route('/api/boards/<int:id>/jobs')
def get_jobs(id):

    # allJobs = Job.query.filter(Child.board_id == id).all()

    # allJobs = db.session.query(Job, Application, Child).select_from(Job).join(Application).join(Child).filter(Child.board_id == id).all()
    # allJobs = db.session.query(Job, Application, Child).filter(Job.id == Application.job_id).filter(Application.id == Child.application_id).filter(Child.board_id == id).all()
    # print("==========+++++++++++++ allJobs", [jobCombo for jobCombo in allJobs])
    board = Board.query.get(id)
    allJobs = [application.to_dict() for application in board.applications]
    return jsonify(allJobs)
    # return jsonify([job.to_dict() for job in allJobs])
    # print("+++++++++++++++", returnNewListFunc())
    # print("+++++++++++++++allJobs", allJobs)


@job_route.route('/api/jobs')
def get_allJobs():
    jobs = Job.query.all()
    return jsonify([job.to_dict() for job in jobs])


@job_route.route('/api/boards/<int:id>/jobs', methods=['DELETE'])
def clear_allJobs(id):
    # print("=========id", id)
    board = Board.query.get(id)
    # print("---------", board)
    allJobs = [application.to_dict() for application in board.applications]
    # print("++++++++++", allJobs)
    # for job in allJobs:
    #     db.session.delete(job)
    for application in board.applications:
        db.session.delete(application)
    db.session.commit()

    return jsonify(allJobs)
