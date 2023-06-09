from flask import render_template, flash, redirect, url_for, request, jsonify
from app import app, db
from app.forms import LoginForm, RegistrationForm, UpdateProfileForm, UploadForm, BookActionsForm
from app.models import Book, User, UserBookAction, BookSchema, UserSchema
from flask_login import current_user, login_user, logout_user, login_required
from werkzeug.urls import url_parse
from base64 import b64encode
import base64
from sqlalchemy import or_
from sqlalchemy.orm import joinedload


ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

# def render_picture(data):
#     render_pic = base64.b64encode(data).decode('ascii') 
#     return render_pic

def book_serializer(book):
    return {
        'book_id': book.book_id,
        'title': book.title,
        'content': book.content,
        'user_id': book.user_id
    }

def user_serializer(user):
    return {
        'user_id': user.user_id,
        'username': user.username,
        'firstname': user.firstname,
        'lastname': user.lastname,
        'email': user.email
    }

@app.route('/')
@app.route('/index')
@login_required
def index():
    books = Book.query.all()
    users = User.query.all()
    return render_template('index.html', title='Home', books=books, users=users)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = LoginForm()
    if request.method == 'POST':
        data = request.get_json()
        username = data.get('username', '')
        password = data.get('password', '')
        user = User.query.filter_by(username=username).first()
        if user is None or not user.check_password(password):
            print('Invalid username or password')  # Add this for debugging
            return jsonify({"error": "Invalid username or password"}), 401  # Return JSON response with an error
        login_user(user)
        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '':
            next_page = url_for('index')
        print('Login successful')  # Add this for debugging
        return jsonify(user_serializer(user))  # Return user information as JSON
    return render_template('login.html', title='Sign In', form=form)

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, firstname=form.firstname.data, lastname=form.lastname.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Congratulations, you are now a registered user!')
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form)

@app.route('/user/<username>', methods=['GET', 'POST'])
@login_required
def user(username):
    user = User.query.filter_by(username=username).first_or_404()
    books_liked = UserBookAction.query.filter_by(user_id=user.user_id, liked=True)
    liked_books = []
    for book in books_liked:
        liked_books.append(Book.query.filter_by(book_id=book.book_id).first())

    form = UpdateProfileForm()
    if form.validate_on_submit():
        if form.username.data != current_user.username:
            user.username = form.username.data
            username = form.username.data
        if form.firstname.data != current_user.firstname: user.firstname = form.firstname.data
        if form.lastname.data != current_user.lastname: user.lastname = form.lastname.data
        if form.about_me.data != current_user.about_me: user.about_me = form.about_me.data
        db.session.add(user)
        db.session.commit()
        flash('Your profile has been updated')
        if form.username.data != '': return redirect(url_for('user', username=username))
        return redirect(url_for('user', username=current_user.username))
    elif request.method == 'GET':
        form.username.data = current_user.username
        form.firstname.data = current_user.firstname
        form.lastname.data = current_user.lastname
        form.about_me.data = current_user.about_me

    published_books = user.books.all()

    return render_template('user.html', user=user, published_books=published_books, form=form, liked_books=liked_books)

@app.route('/upload', methods=['GET', 'POST'])
@login_required
def upload():
    user = User.query.filter_by(username=current_user.username).first_or_404()
    form = UploadForm()
    if form.validate_on_submit():
        #uploaded_img = request.files['cover']
        #data = uploaded_img.cover.data.read()
        #render_cover = render_picture(data)
        #newCover = Image(name=form.title.data, data=data, rendered_data=render_cover)
        book = Book(title=form.title.data, content=form.content.data, author=user)
        #db.session.add(newCover)
        db.session.add(book)
        db.session.commit()
        flash('Your book was uploaded!')
        return redirect(url_for('index'))
    return render_template('upload.html', form=form)

@app.route('/<author>/read/<book>', methods=['GET', 'POST'])
@login_required
def read(author, book):
    author = User.query.filter_by(username=author).first_or_404()
    book = Book.query.filter_by(title=book).first_or_404()
    title = book.title
    content = book.content
    likes = UserBookAction.query.filter_by(book_id=book.book_id, liked=True).count()
    dislikes = UserBookAction.query.filter_by(book_id=book.book_id, disliked=True).count()

    # book actions
    form = BookActionsForm()
    if form.validate_on_submit():
        # if already reacted, delete that reaction
        if form.like.data or form.dislike.data:
            for action in UserBookAction.query.filter_by(user_id=current_user.user_id, book_id=book.book_id):
                db.session.delete(action)
        
        # enter new reaction into database
        user_book_action = None
        if form.like.data: user_book_action = UserBookAction(user_id=current_user.user_id, book_id=book.book_id, liked=True)
        if form.dislike.data: user_book_action = UserBookAction(user_id=current_user.user_id, book_id=book.book_id, disliked=True)
        db.session.add(user_book_action)
        db.session.commit()
        return redirect(url_for('read', author=author.username, book=book.title))
    elif request.method == 'GET':
        if UserBookAction.query.filter_by(user_id=current_user.user_id, book_id=book.book_id, liked=True).first():
            form.like.data = True
        elif UserBookAction.query.filter_by(user_id=current_user.user_id, book_id=book.book_id, disliked=True).first():
            form.dislike.data = True    

    return render_template('read.html', author=author, book=book, title=title, content=content, form=form, likes=likes, dislikes=dislikes)

@app.route('/api/books', methods=['GET'])
def books():
    books = Book.query.all()
    # serialized_books = [book_serializer(book) for book in books]
    # dict = {"books": serialized_books}
    # return jsonify(dict)
    # return {"books": ["test", "test2"]}
    book_schema = BookSchema(many=True)
    result = book_schema.dump(books)
    return jsonify(result)

@app.route('/api/users', methods=['GET'])
def users():
    users = User.query.all()
    user_schema = UserSchema(many=True)
    result = user_schema.dump(users)
    return jsonify(result)



@app.route('/api/search', methods=['GET'])
def search():
    query = request.args.get('query')
    
    # Search for books
    books = Book.query.filter(Book.title.contains(query)).all()
    book_schema = BookSchema(many=True)
    
    # Search for users
    users = User.query.filter(
        or_(
            User.username.contains(query),
            User.firstname.contains(query),
            User.lastname.contains(query),
            User.email.contains(query)
        )
    ).all()
    user_schema = UserSchema(many=True)

    result = {
        'users': user_schema.dump(users),
        'books': book_schema.dump(books)
    }
    return jsonify(result)

