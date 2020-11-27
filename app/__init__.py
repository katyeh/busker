import os
from flask import Flask, render_template, request, session
from flask_cors import CORS, cross_origin
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import *
from .api.album_routes import album_routes
from .api.artist_routes import artist_routes
from .api.auth_routes import auth_routes
from .api.like_routes import like_routes
from .api.track_routes import track_routes
from .api.comment_routes import comment_routes

from .seeds import seed_commands

from .config import Config

app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return Artist.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(artist_routes, url_prefix='/api/artists')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(album_routes, url_prefix='/api/albums')
app.register_blueprint(like_routes, url_prefix='/api')
app.register_blueprint(track_routes, url_prefix='/api/tracks')
app.register_blueprint(comment_routes, url_prefix='/api/comments')

db.init_app(app)
Migrate(app, db)

# Application Security
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
