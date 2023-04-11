from datetime import datetime
from app import db, login, ma
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class Book(db.Model):
    book_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64))
    content = db.Column(db.String(64))
    date_uploaded = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))
    
    def __repr__(self):
        return '<Book {}>'.format(self.content)

class BookSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Book

class User(UserMixin, db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    firstname = db.Column(db.String(64), nullable=True)
    lastname = db.Column(db.String(64), nullable=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    about_me = db.Column(db.String(140))

    def __repr__(self): # __repr__ tells python how to print objects of this class for debugging
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def get_id(self):
        return str(self.user_id)

    books = db.relationship('Book', backref='author', lazy='dynamic')

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User

class UserBookAction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('book.book_id'), nullable=False)
    liked = db.Column(db.Boolean, default=False)
    disliked = db.Column(db.Boolean, default=False)
    book = db.relationship('Book', backref=db.backref('user_likes', cascade='all, delete-orphan'))
    user = db.relationship('User', backref=db.backref('book_likes', cascade='all, delete-orphan'))

@login.user_loader
def load_user(id):
    return User.query.get(int(id))