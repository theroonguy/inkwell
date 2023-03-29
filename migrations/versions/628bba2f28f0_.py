"""empty message

Revision ID: 628bba2f28f0
Revises: 2039717119af
Create Date: 2023-03-28 21:25:46.153274

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '628bba2f28f0'
down_revision = '2039717119af'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password_hash', sa.String(length=128), nullable=True))
        batch_op.drop_column('user_password')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_password', sa.VARCHAR(length=128), nullable=True))
        batch_op.drop_column('password_hash')

    # ### end Alembic commands ###
