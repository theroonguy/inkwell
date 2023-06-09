"""users table

Revision ID: 099c785fbabd
Revises: 
Create Date: 2023-03-26 21:05:50.473060

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '099c785fbabd'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=64), nullable=True),
    sa.Column('user_firtname', sa.String(length=64), nullable=True),
    sa.Column('user_lastname', sa.String(length=64), nullable=True),
    sa.Column('user_email', sa.String(length=120), nullable=True),
    sa.Column('user_password', sa.String(length=128), nullable=True),
    sa.PrimaryKeyConstraint('user_id')
    )
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_user_user_email'), ['user_email'], unique=True)
        batch_op.create_index(batch_op.f('ix_user_user_firtname'), ['user_firtname'], unique=False)
        batch_op.create_index(batch_op.f('ix_user_user_lastname'), ['user_lastname'], unique=False)
        batch_op.create_index(batch_op.f('ix_user_username'), ['username'], unique=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_user_username'))
        batch_op.drop_index(batch_op.f('ix_user_user_lastname'))
        batch_op.drop_index(batch_op.f('ix_user_user_firtname'))
        batch_op.drop_index(batch_op.f('ix_user_user_email'))

    op.drop_table('user')
    # ### end Alembic commands ###
