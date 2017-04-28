
#-*-coding:utf-8-*-


from flask import Blueprint,url_for,render_template
import util
admin2 = Blueprint('admin2', __name__)



@admin2.route('/')
def index():

    util.logg().debug('log-->msg')

    return render_template('index2.html')


