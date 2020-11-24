from flask import Blueprint, jsonify, session, request
from app.models import Artist, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    print(request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = Artist.query.filter(Artist.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'Artist logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    profile = form.data["profile_image_url"]
    cover = form.data['cover_image_url']  
    
    if not form.data['profile_image_url']: 
        profile = 'https://busker2.s3.amazonaws.com/defaultimage2.jpeg' 
    if not form.data['cover_image_url']: 
        cover = 'https://busker2.s3.amazonaws.com/busker_logo.png'
    if form.validate_on_submit():
        user = Artist(
            name=form.data['name'],
            username=form.data['username'],
            email=form.data['email'],
            bio=form.data['bio'],
            country=form.data['country'],
            city=form.data['city'],
            profile_image_url=profile if profile else form.data["profile_image_url"], 
            cover_image_url=cover if cover else form.data['cover_image_url'],
            tip_stash=0,
            password=form.data['password'],

        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401


  # if len(form.data['profile_image_url']):
    #     form.data['profile_image_url'] = 'https://busker2.s3.amazonaws.com/defaultimage2.jpeg'
    # if len(form.data['cover_image_url']) == 0:
    #     form.data['cover_image_url'] = 'https://busker2.s3.amazonaws.com/busker_logo.png'
