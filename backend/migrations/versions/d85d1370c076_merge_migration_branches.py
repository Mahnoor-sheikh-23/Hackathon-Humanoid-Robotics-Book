"""Merge migration branches

Revision ID: d85d1370c076
Revises: 6a7b8c9d3e4f, 7a8b9c0d4e5f
Create Date: 2025-12-25 15:33:43.063441

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd85d1370c076'
down_revision: Union[str, Sequence[str], None] = ('6a7b8c9d3e4f', '7a8b9c0d4e5f')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
