
from app.models import company
from flask import Blueprint, request
from flask import Blueprint
from ..models import db, Company, Job, Application, Child
from flask_login import current_user
from app.forms import JobForm


application_route = Blueprint('applications', __name__, url_prefix='')


@application_route.route('/api/applications/post/', methods=['POST'])
def post_application():
    form = JobForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newObj = {}
        company = Company(
            name=form.name.data,
            location=form.location.data,
            logo_url=form.logo_url.data,
        )
        db.session.add(company)
        db.session.commit()
        print("company id_____", company.id)
        job = Job(
            position_name=form.position_name.data,
            link_url=form.link_url.data,
            salary=form.salary.data,
            description=form.description.data,
            company_id=company.id
        )
        db.session.add(job)
        db.session.commit()
        application = Application(
            state=form.state.data,
            job_id=job.id,
            user_id=current_user.id
        )
        if form.state.data == "applied":
            application.applied_date = form.date.data
        elif form.state.data == "interview":
            application.interviewed_date = form.date.data
        elif form.state.data == "offered":
            application.offered_date = form.date.data
        elif form.state.data == "rejected":
            application.rejected_date = form.date.data
        db.session.add(application)
        db.session.commit()

        child = Child(
            board_id=form.selected_board_id.data,
            application_id=application.id
        )
        db.session.add(child)
        db.session.commit()

        newObj["company"] = company.to_dict()
        newObj["job"] = job.to_dict()
        newObj["application"] = application.to_dict()

        return newObj

    errorMessages = []
    for field in form.errors:
        for error in form.errors[field]:
            formattedErr = error[10:]
            formattedField = field.replace('_', ' ').replace(' id', '').capitalize()
            errorMessages.append(f'{formattedField} {formattedErr}')
    return{'errors': errorMessages}


@application_route.route('/api/applications/edit/', methods=['PUT'])
def put_job():
    form = JobForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        application = Application.query.filter(Application.id == form.application_id.data).one()
        company = Company.query.filter(Company.id == form.company_id.data).one()
        job = Job.query.filter(Job.id == form.job_id.data).one()
        company.name = form.name.data
        company.location = form.location.data
        company.logo_url = form.logo_url.data
        job.position_name = form.position_name.data
        job.link_url = form.link_url.data
        job.salary = form.salary.data
        job.description = form.description.data
        application.state = form.state.data
        if form.state.data == "applied":
            application.applied_date = form.date.data
        elif form.state.data == "interview":
            application.interviewed_date = form.date.data
        elif form.state.data == "offered":
            application.offered_date = form.date.data
        elif form.state.data == "rejected":
            application.rejected_date = form.date.data

        db.session.commit()
        return application.to_dict()

    errorMessages = []
    for field in form.errors:
        for error in form.errors[field]:
            formattedErr = error[10:]
            formattedField = field.replace('_', ' ').replace(' id', '').capitalize()
            errorMessages.append(f'{formattedField} {formattedErr}')
    return{'errors': errorMessages}
