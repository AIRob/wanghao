#-*-coding:utf-8-*-
from flask import Blueprint, render_template, url_for, request,jsonify

admin3 = Blueprint('admin3', __name__)




@admin3.route('/')
def index():

    return 'index'


# @admin3.route('/add')
# def index():
#
#     return 'add'