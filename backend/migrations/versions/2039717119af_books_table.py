"""books table

Revision ID: 2039717119af
Revises: 563b551bcde2
Create Date: 2023-03-26 21:39:01.614502

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2039717119af'
down_revision = '563b551bcde2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('book', schema=None) as batch_op:
        batch_op.add_column(sa.Column('content', sa.String(length=64), nullable=True))
        batch_op.drop_index('ix_book_book_content')
        batch_op.drop_index('ix_book_book_synopsis')
        batch_op.drop_index('ix_book_book_title')
        batch_op.drop_column('book_content')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('book', schema=None) as batch_op:
        batch_op.add_column(sa.Column('book_content', sa.VARCHAR(length=64), nullable=True))
        batch_op.create_index('ix_book_book_title', ['book_title'], unique=False)
        batch_op.create_index('ix_book_book_synopsis', ['book_synopsis'], unique=False)
        batch_op.create_index('ix_book_book_content', ['book_content'], unique=False)
        batch_op.drop_column('content')

    # ### end Alembic commands ###
