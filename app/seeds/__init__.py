from flask.cli import AppGroup
from .users import seed_users, undo_users
from .jobs import seed_jobs, undo_jobs
from .companies import seed_companies, undo_companies
from .applications import seed_applications, undo_applications
from .boards import seed_boards, undo_boards
from .children import seed_children, undo_children

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_companies()
    seed_jobs()
    seed_applications()
    seed_children()
    seed_boards()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_companies()
    undo_jobs()
    undo_applications()
    undo_children()
    undo_boards()

    # Add other undo functions here
