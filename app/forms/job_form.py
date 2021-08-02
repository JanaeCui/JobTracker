from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField, IntegerField
from wtforms.validators import DataRequired
from app.models import Job, application, company


class JobForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    location = StringField('location')
    logo_url = StringField('logo_url')
    position_name = StringField('position_name', validators=[DataRequired()])
    link_url = StringField('link_url')
    salary = StringField('salary')
    description = StringField('description')
    state = StringField('state')
    date = StringField('date')
    selected_board_id = StringField('selected_board_id', validators=[DataRequired()])
    company_id = StringField('company_id')
    job_id = StringField('job_id')
    application_id = StringField('application_id')
    # interviewed_date = StringField('interviewed_date')
    # offered_date = StringField('offered_date')
    # rejected_date = StringField('rejected_date')
