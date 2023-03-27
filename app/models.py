from datetime import datetime
from app import db

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    user_firtname = db.Column(db.String(64), index=True)
    user_lastname = db.Column(db.String(64), index=True)
    user_email = db.Column(db.String(120), index=True, unique=True)
    user_password = db.Column(db.String(128))
    books = db.relationship('Book', backref='author', lazy='dynamic')

    def __repr__(self): # __repr__ tells python how to print objects of this class for debugging
        return '<User {}>'.format(self.username)

class Book(db.Model):
    book_id = db.Column(db.Integer, primary_key=True)
    book_title = db.Column(db.String(64), index=True)
    book_synopsis = db.Column(db.String(64), index=True)
    content = db.Column(db.String(64), index=True)
    date_uploaded = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))

    def __repr__(self):
        return '<Book {}>'.format(self.content)