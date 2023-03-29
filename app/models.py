from datetime import datetime
from app import db, login
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(UserMixin, db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    firstname = db.Column(db.String(64), nullable=True)
    lastname = db.Column(db.String(64), nullable=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    books = db.relationship('Book', backref='author', lazy='dynamic')
    about_me = db.Column(db.String(140))

    def __repr__(self): # __repr__ tells python how to print objects of this class for debugging
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def get_id(self):
        return str(self.user_id)

class Book(db.Model):
    book_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64))
    content = db.Column(db.String(64))
    date_uploaded = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))
    cover = db.relationship('Image', backref='book', lazy='dynamic')
    
    def __repr__(self):
        return '<Book {}>'.format(self.content)

class UserBookAction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('book.book_id'), nullable=False)
    liked = db.Column(db.Boolean, default=False)
    disliked = db.Column(db.Boolean, default=False)
    book = db.relationship('Book', backref=db.backref('user_likes', cascade='all, delete-orphan'))
    user = db.relationship('User', backref=db.backref('book_likes', cascade='all, delete-orphan'))

class Image(db.Model):  # not working atm
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    data = db.Column(db.LargeBinary, nullable=False)
    rendered_data = db.Column(db.Text, nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('book.book_id'))

@login.user_loader
def load_user(id):
    return User.query.get(int(id))