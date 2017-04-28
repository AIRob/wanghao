#-*-coding:utf-8-*-

from flask import Blueprint, render_template, abort,url_for
from jinja2 import TemplateNotFound

simple_page = Blueprint('simple_page', __name__) #默认静态HTML在templates中

@simple_page.route('/', defaults={'page': 'index'})
@simple_page.route('/<page>')
def show(page):
    print page
    try:
        return render_template('%s.html' % page)
    except TemplateNotFound:
        abort(404)