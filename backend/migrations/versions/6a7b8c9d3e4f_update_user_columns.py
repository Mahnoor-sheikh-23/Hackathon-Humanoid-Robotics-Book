"""Update user columns to match unified model

Revision ID: 6a7b8c9d3e4f
Revises: 5f1e8c4d2b6a
Create Date: 2025-12-25 23:30:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6a7b8c9d3e4f'
down_revision: Union[str, Sequence[str], None] = '5f1e8c4d2b6a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema to match unified User model."""

    # Check if hashed_password column exists (old column name)
    # If it exists, rename it to password_hash
    conn = op.get_bind()

    # Check if the old hashed_password column exists
    result = conn.execute(
        sa.text("""
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name='users' AND column_name='hashed_password'
        """)
    )
    old_col_exists = result.fetchone() is not None

    # Check if the new password_hash column exists
    result = conn.execute(
        sa.text("""
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name='users' AND column_name='password_hash'
        """)
    )
    new_col_exists = result.fetchone() is not None

    # If old column exists but new doesn't, rename it
    if old_col_exists and not new_col_exists:
        op.alter_column('users', 'hashed_password', new_column_name='password_hash')

    # If new column doesn't exist for whatever reason, create it
    if not new_col_exists and not old_col_exists:
        op.add_column('users', sa.Column('password_hash', sa.String(), nullable=False))

    # Add username column if it doesn't exist
    result = conn.execute(
        sa.text("""
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name='users' AND column_name='username'
        """)
    )
    if not result.fetchone():
        op.add_column('users', sa.Column('username', sa.String(), nullable=False))
        # Make it unique after adding
        op.create_unique_constraint('uq_users_username', 'users', ['username'])

    # Add other missing columns that should exist in unified model
    columns_to_add = [
        ('updated_at', sa.DateTime()),
        ('is_active', sa.Boolean()),
        ('programming_experience', sa.Text()),
        ('robotics_knowledge', sa.Text()),
        ('hardware_availability', sa.Text()),
        ('profile_completed', sa.Boolean())
    ]

    for col_name, col_type in columns_to_add:
        result = conn.execute(
            sa.text(f"""
                SELECT column_name
                FROM information_schema.columns
                WHERE table_name='users' AND column_name='{col_name}'
            """)
        )
        if not result.fetchone():
            op.add_column('users', sa.Column(col_name, col_type))


def downgrade() -> None:
    """Downgrade schema - reverse the changes."""
    # Reverse column renames if needed
    conn = op.get_bind()

    # Check if password_hash exists (new column)
    result = conn.execute(
        sa.text("""
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name='users' AND column_name='password_hash'
        """)
    )
    new_col_exists = result.fetchone() is not None

    # Check if hashed_password exists (old column)
    result = conn.execute(
        sa.text("""
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name='users' AND column_name='hashed_password'
        """)
    )
    old_col_exists = result.fetchone() is not None

    # If new column exists but old doesn't, rename it back
    if new_col_exists and not old_col_exists:
        op.alter_column('users', 'password_hash', new_column_name='hashed_password')

    # Drop the added columns (in reverse order)
    op.drop_column('users', 'profile_completed')
    op.drop_column('users', 'hardware_availability')
    op.drop_column('users', 'robotics_knowledge')
    op.drop_column('users', 'programming_experience')
    op.drop_column('users', 'is_active')
    op.drop_column('users', 'updated_at')

    # Drop username column if it was added
    op.drop_constraint('uq_users_username', 'users', type_='unique')
    op.drop_column('users', 'username')