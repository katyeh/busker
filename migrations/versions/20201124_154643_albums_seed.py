"""albums seed

Revision ID: a269fd65be21
Revises: a7c3f792b5dd
Create Date: 2020-11-24 15:46:43.029643

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import table
from datetime import datetime



# revision identifiers, used by Alembic.
revision = 'a269fd65be21'
down_revision = 'a7c3f792b5dd'
branch_labels = None
depends_on = None



def upgrade():
    albums = table('albums',
        sa.Column('id', sa.Integer()),
        sa.Column('title', sa.String()),
        sa.Column('album_art_url', sa.String()),
        sa.Column('release_date', sa.Date()),
        sa.Column('single', sa.Boolean()),
        sa.Column('artist_id', sa.Integer())
    )


    op.bulk_insert(albums,
        [
            {
                'title': 'My first piano grooves',
                'album_art_url': 'https://busker2.s3.amazonaws.com/albumeimage/MozartAlbum1.jpeg',
                'release_date': datetime(1763, 1, 1),
                'single': False,
                'artist_id': 1
            },
            {
                'title': 'My second piano grooves',
                'album_art_url': 'https://busker2.s3.amazonaws.com/albumeimage/mozartalbum2.jpg',
                'release_date': datetime(1764, 1, 1),
                'single': False,
                'artist_id': 1
            },
            {
                'title': 'Fly Swatter',
                'album_art_url': 'https://busker2.s3.amazonaws.com/albumeimage/blink_flyswatter.jpg',
                'release_date': datetime(1993, 5, 1),
                'single': False,
                'artist_id': 3
            },
            {
                'title': 'Buddha',
                'album_art_url': 'https://busker2.s3.amazonaws.com/albumeimage/blink_buddha.jpg',
                'release_date': datetime(1994, 1, 1),
                'single': False,
                'artist_id': 3
            },
            {
                'title': 'Runaway',
                'album_art_url': 'https://busker2.s3.amazonaws.com/albumeimage/bonjovi_runaway.jpg',
                'release_date': datetime(1981, 1, 1),
                'single': True,
                'artist_id': 4
            },
            {
                'title': 'Thank Me Later',
                'album_art_url':  'https://busker2.s3.amazonaws.com/albumeimage/drakealbum.jpg',
                'release_date': datetime(2010, 1, 1),
                'single': False,
                'artist_id': 2
            },
            {
                'title': 'Maluma 1',
                'album_art_url': 'https://busker2.s3.amazonaws.com/albumeimage/maluma1.jpeg',
                'release_date': datetime(2008, 1, 3),
                'single': True,
                'artist_id': 5
            },
            {
                'title': 'Maluma 2',
                'album_art_url': 'https://busker2.s3.amazonaws.com/albumeimage/maluma1.jpeg',
                'release_date': datetime(2008, 5, 8),
                'single': True,
                'artist_id': 5
            },

            {
                'title': 'Lady Gaga 1',
                'album_art_url': 'https://busker2.s3.amazonaws.com/defaultalbumcover.jpg',
                'release_date': datetime(2010, 3, 9),
                'single': True,
                'artist_id': 6
            },
            {
                'title': 'Hype',
                'album_art_url': 'https://busker2.s3.amazonaws.com/albumeimage/oldTownRoad.jpg',
                'release_date': datetime(2040, 1, 1),
                'single': False,
                'artist_id': 7
            },
            {
                'title': 'Game Nights',
                'album_art_url': 'https://busker2.s3.amazonaws.com/albumeimage/sweetCaroline.jpeg',
                'release_date': datetime(2040, 1, 1),
                'single': False,
                'artist_id': 7
            },
            {
                'title': 'Party',
                'album_art_url': 'https://busker2.s3.amazonaws.com/albumeimage/sevenNationArmy.jpeg',
                'release_date': datetime(2040, 1, 1),
                'single': False,
                'artist_id': 7
            },
        ])

def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('likes')
    op.drop_table('genres_connector')
    op.drop_table('comments')
    op.drop_table('tracks')
    op.drop_table('transactions')
    op.drop_table('followers')
    op.drop_table('albums')
    op.drop_table('genres')
    op.drop_table('artists')
    # ### end Alembic commands ###
