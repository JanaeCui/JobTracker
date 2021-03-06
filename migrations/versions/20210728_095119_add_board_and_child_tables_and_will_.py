"""add board and child tables and will make a new version file

Revision ID: 5577de670b1f
Revises: b3986862ff1a
Create Date: 2021-07-28 09:51:19.447623

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5577de670b1f'
down_revision = 'b3986862ff1a'
branch_labels = None
depends_on = None


def upgrade():

    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('boards',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('children',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('application_id', sa.Integer(), nullable=False),
    sa.Column('board_id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('children')
    op.drop_table('boards')
    # ### end Alembic commands ###
