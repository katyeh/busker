from .db import db
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, Date, Boolean

class Album(db.Model):
    __tablename__ = 'albums'

    id = Column(db.Integer, primary_key=True)
    title = Column(db.String(50), nullable=False)
    album_art_url = Column(db.String(
        1000), default='https://busker2.s3.amazonaws.com/defaultalbumcover.jpg')
    release_date = Column(db.Date)
    single = Column(db.Boolean)
    artist_id = Column(Integer, ForeignKey('artists.id'), nullable=False)

    artist = db.relationship('Artist', cascade='all, delete', backref='album')
    tracks = db.relationship('Track', cascade='all, delete', backref='album')

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "album_art_url": self.album_art_url,
            "release_date": self.release_date,
            "single": self.single,
            "artist_id": self.artist_id,
            "tracks": [track.to_dict() for track in self.tracks],
            "artist":  self.artist.to_dict()
        }
