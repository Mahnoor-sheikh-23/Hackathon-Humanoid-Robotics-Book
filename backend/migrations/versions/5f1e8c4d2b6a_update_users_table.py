"""Update users table to match unified User model - fix column names and add missing columns

Revision ID: 5f1e8c4d2b6a
Revises: 4daa9de69412
Create Date: 2025-12-25 22:30:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = '5f1e8c4d2b6a'
down_revision: Union[str, Sequence[str], None] = '4daa9de69412'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema to match unified User model."""
    # Check if hashed_password column exists and rename it to password_hash
    # We'll do this by adding the new column, copying data, then dropping the old one

    # First, add the new columns that might be missing
    conn = op.get_bind()

    # Check if username column exists, if not add it
    result = conn.execute(
        sa.text("""
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name='users' AND column_name='username'
        """)
    )
    if not result.fetchone():
        op.add_column('users', sa.Column('username', sa.String(), nullable=True))
        # Create a temporary unique username for existing users if needed
        # This is just to make the unique constraint work later
        conn.execute(sa.text("UPDATE users SET username = CONCAT('user_', id) WHERE username IS NULL"))
        op.execute(sa.text("UPDATE users SET username = CONCAT('user_', id) WHERE username IS NULL OR username = ''"))

    # Check if password_hash column exists
    result = conn.execute(
        sa.text("""
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name='users' AND column_name='password_hash'
        """)
    )
    if not result.fetchone():
        # Check if hashed_password exists (old column name)
        result_old = conn.execute(
            sa.text("""
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

    # Add other missing columns
    columns_to_check = [
        ('updated_at', 'DateTime'),
        ('is_active', 'Boolean'),
        ('programming_experience', 'Text'),
        ('robotics_knowledge', 'Text'),
        ('hardware_availability', 'Text'),
        ('profile_completed', 'Boolean')
    ]

    for col_name, col_type in columns_to_check:
        result = conn.execute(
            sa.text(f"""
                SELECT column_name
                FROM information_schema.columns
                WHERE table_name='users' AND column_name='{col_name}'
            """)
        )
        if not result.fetchone():
            if col_type == 'Boolean':
                op.add_column('users', sa.Column(col_name, sa.Boolean(), default=False))
            elif col_type == 'DateTime':
                op.add_column('users', sa.Column(col_name, sa.DateTime(), nullable=True))
            else:  # Text
                op.add_column('users', sa.Column(col_name, sa.Text(), nullable=True))

    # Create unique index for username if it doesn't exist
    try:
        op.create_index('ix_users_username', 'users', ['username'], unique=True)
    except:
        # Index might already exist
        pass


def downgrade() -> None:
    """Downgrade schema - reverse the changes."""
    op.drop_index('ix_users_username', table_name='users')

    # Drop the added columns (in reverse order)
    op.drop_column('users', 'profile_completed')
    op.drop_column('users', 'hardware_availability')
    op.drop_column('users', 'robotics_knowledge')
    op.drop_column('users', 'programming_experience')
    op.drop_column('users', 'is_active')
    op.drop_column('users', 'updated_at')

    # For password_hash, we'd need to consider if we want to rename back to hashed_password
    # This is tricky, so we'll just drop it
    conn = op.get_bind()
    result = conn.execute(
        sa.text("""
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name='users' AND column_name='password_hash'
        """)
    )
    if result.fetchone():
        op.drop_column('users', 'password_hash')

    # For username, we'll drop it too
    op.drop_column('users', 'username')