#-*-coding:utf-8-*-


from flask import Blueprint,render_template,url_for,request


admin1 = Blueprint('admin1', __name__)


@admin1.route('/')
def index():
    return render_template('index.html')