from .db import db
from sqlalchemy.types import Integer
from sqlalchemy.schema import Column, ForeignKey

class Follower(db.Model):
  __tablename__ = 'followers'

  id = Column(Integer, primary_key=True)
  follower_id = Column(Integer, nullable=False, ForeignKey="artists.id")
  followed_id = Column(Integer, nullable=False, ForeignKey="artists.id")

  def to_dict(self):
    return {
      self.id: {
        "id": self.id,
        "follower_id": self.follower_id,
        "followed_id": self.followed_id
      }
    }