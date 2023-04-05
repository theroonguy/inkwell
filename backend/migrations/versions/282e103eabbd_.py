"""empty message

Revision ID: 282e103eabbd
Revises: 1d10ff11eacf
Create Date: 2023-03-28 21:30:09.252870

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '282e103eabbd'
down_revision = '1d10ff11eacf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('email', sa.String(length=120), nullable=True))
        batch_op.drop_index('ix_user_user_email')
        batch_op.create_index(batch_op.f('ix_user_email'), ['email'], unique=True)
        batch_op.drop_column('user_lastname')
        batch_op.drop_column('user_firstname')
        batch_op.drop_column('user_email')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_email', sa.VARCHAR(length=120), nullable=True))
        batch_op.add_column(sa.Column('user_firstname', sa.VARCHAR(length=64), nullable=True))
        batch_op.add_column(sa.Column('user_lastname', sa.VARCHAR(length=64), nullable=True))
        batch_op.drop_index(batch_op.f('ix_user_email'))
        batch_op.create_index('ix_user_user_email', ['user_email'], unique=False)
        batch_op.drop_column('email')

    # ### end Alembic commands ###