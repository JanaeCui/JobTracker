
from app.models import company
from flask import Blueprint, request
from flask import Blueprint
from ..models import db, Company, Job, Application, Child
from flask_login import current_user
from app.forms import JobForm
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename, delete_from_s3)

application_route = Blueprint('applications', __name__, url_prefix='')


@application_route.route('/api/applications/post/', methods=['POST'])
def post_application():
    form = JobForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        url = ""
        if "logo_url" in request.files:
            # image = request.files[form.logo_url.name]
            image = request.files["logo_url"]
            # print("request.files", image)

            if not allowed_file(image.filename):
                # print("error request.files file type not permitted: ", image.filename)
                return {"errors": "file type not permitted"}, 400

            image.filename = get_unique_filename(image.filename)

            upload = upload_file_to_s3(image)

            if "url" not in upload:
                # if the dictionary doesn't have a url key
                # it means that there was an error when we tried to upload
                # so we send back that error message
                # print("url not in upload: ", upload)
                return upload, 400

            url = upload["url"]

        newObj = {}
        company = Company(
            name=form.name.data,
            location=form.location.data,
            logo_url=url,
        )
        db.session.add(company)
        db.session.commit()
        # print("company id_____", company.id)
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
    # print("in backend function!!!!!!!!!!!!!!")
    form = JobForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        company = Company.query.filter(Company.id == form.company_id.data).one()
        original_url = company.logo_url
        # print("form validated===========")
        url = ""
        form.deleted.data

        # Swap
        if "logo_url" in request.files:
            # image = request.files[form.logo_url.name]
            image = request.files["logo_url"]
            # print("request.files", image)

            if not allowed_file(image.filename):
                # print("error request.files file type not permitted: ", image.filename)
                return {"errors": "file type not permitted"}, 400

            image.filename = get_unique_filename(image.filename)

            upload = upload_file_to_s3(image)

            if "url" not in upload:
                # if the dictionary doesn't have a url key
                # it means that there was an error when we tried to upload
                # so we send back that error message
                # print("url not in upload: ", upload)
                return upload, 400

            url = upload["url"]
        # Delete
        elif form.deleted.data:
            # delete in amazon
            delete = delete_from_s3(original_url)
            # print("is deleted? ======", delete)
            url = ""
        # use original
        else:
            url = original_url

        application = Application.query.filter(Application.id == form.application_id.data).one()
        # company = Company.query.filter(Company.id == form.company_id.data).one()
        job = Job.query.filter(Job.id == form.job_id.data).one()
        company.name = form.name.data
        company.location = form.location.data
        company.logo_url = url
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
        # print("Updated application: ", application.to_dict())
        return application.to_dict()
    else:
        print("Form invalid", form.errors)

    errorMessages = []
    for field in form.errors:
        for error in form.errors[field]:
            formattedErr = error[10:]
            formattedField = field.replace('_', ' ').replace(' id', '').capitalize()
            errorMessages.append(f'{formattedField} {formattedErr}')
    return{'errors': errorMessages}


@application_route.route('/api/applications/delete/', methods=['DELETE'])
def delete_board():
    application = Application.query.filter(Application.id == request.json["applicationId"]).one()
    company = Company.query.filter(Company.id == request.json["companyId"]).one()
    job = Job.query.filter(Job.id == request.json["jobId"]).one()
    child = Child.query.filter(Child.application_id == application.id).one()

    db.session.delete(child)
    db.session.delete(application)
    db.session.delete(job)
    db.session.delete(company)
    # db.session.delete(children)
    db.session.commit()
    return {"id": application.id}
