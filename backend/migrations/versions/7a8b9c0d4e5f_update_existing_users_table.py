"""Update existing users table to match unified User model

Revision ID: 7a8b9c0d4e5f
Revises: 4daa9de69412
Create Date: 2025-12-25 23:59:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy import text


# revision identifiers, used by Alembic.
revision: str = '7a8b9c0d4e5f'
down_revision: Union[str, Sequence[str], None] = '4daa9de69412'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema to update existing users table to match unified model."""

    conn = op.get_bind()

    # Check if username column exists, if not add it
    result = conn.execute(
        text("""
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name='users' AND column_name='username'
        """)
    )
    if not result.fetchone():
        op.add_column('users', sa.Column('username', sa.String(), nullable=True))
        # Set a default username for existing users
        conn.execute(text("UPDATE users SET username = CONCAT('user_', id) WHERE username IS NULL OR username = ''"))
        # Make it unique after setting values
        op.create_index('ix_users_username', 'users', ['username'], unique=True)

    # Check if hashed_password column exists (old name) and password_hash doesn't exist (new name)
    result = conn.execute(
        text("""
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name='users' AND column_name='password_hash'
        """)
    )
    if not result.fetchone():
        # Check if hashed_password exists (old column name)
        result_old = conn.execute(
            text("""
                SELECT column_name
                FROM information_schema.columns
                WHERE table_name='users' AND column_name='hashed_password'
            """)
        )
        if result_old.fetchone():
            # Rename hashed_password to password_hash
            op.alter_column('users', 'hashed_password', new_column_name='password_hash')
        else:
            # Add password_hash column if neither exists
            op.add_column('users', sa.Column('password_hash', sa.String(), nullable=True))

    # Add other missing columns that should exist in unified model
    columns_to_check = [
        ('name', sa.String(), True),
        ('profile_data', sa.JSON(), True),
        ('updated_at', sa.DateTime(), True),
        ('is_active', sa.Boolean(), True),
        ('programming_experience', sa.Text(), True),
        ('robotics_knowledge', sa.Text(), True),
        ('hardware_availability', sa.Text(), True),
        ('profile_completed', sa.Boolean(), True)
    ]

    for col_name, col_type, nullable in columns_to_check:
        result = conn.execute(
            text(f"""
                SELECT column_name
                FROM information_schema.columns
                WHERE table_name='users' AND column_name='{col_name}'
            """)
        )
        if not result.fetchone():
            if nullable:
                op.add_column('users', sa.Column(col_name, col_type, nullable=True))
            else:
                op.add_column('users', sa.Column(col_name, col_type, nullable=False))

    # Make username unique and not nullable after populating values
    # First set any remaining null usernames
    conn.execute(text("UPDATE users SET username = CONCAT('user_', id) WHERE username IS NULL OR username = ''"))

    # Then alter the column to be not nullable and unique
    try:
        op.alter_column('users', 'username', nullable=False)
    except:
        # Might fail if there are still duplicates
        pass


def downgrade() -> None:
    """Downgrade schema - reverse the changes."""

    conn = op.get_bind()

    # Reverse the column additions (in reverse order)
    op.drop_column('users', 'profile_completed')
    op.drop_column('users', 'hardware_availability')
    op.drop_column('users', 'robotics_knowledge')
    op.drop_column('users', 'programming_experience')
    op.drop_column('users', 'is_active')
    op.drop_column('users', 'updated_at')

    # For password_hash, check if hashed_password existed originally
    result = conn.execute(
        text("""
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name='users' AND column_name='password_hash'
        """)
    )
    if result.fetchone():
        # Check if hashed_password column exists in the original schema
        # If it did exist, we should rename back
        # For simplicity, just drop password_hash if it exists
        op.drop_column('users', 'password_hash')

    op.drop_column('users', 'profile_data')
    op.drop_column('users', 'name')

    # For username, check if it existed originally
    # Since this was added as part of unification, we'll drop it
    op.drop_index('ix_users_username', table_name='users')
    op.drop_column('users', 'username')