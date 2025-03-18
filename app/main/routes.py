from flask import render_template, request, jsonify
from app.main import bp
from app.utils import generate_content

@bp.route('/')
@bp.route('/index')
def index():
    return render_template('index.html', title='Home')