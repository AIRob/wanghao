#-*-coding:utf-8-*-
from flask import Flask
from simple_page import simple_page

app = Flask(__name__)
app.register_blueprint(simple_page, url_prefix='/pages')# 0.0.0.0:10000/pages/index  就会返回index.html

app.register_blueprint(simple_page, )# 0.0.0.0:10000/index  就会返回index.html




if __name__ == '__main__':
    app.run(port=10000,debug=True,host='0.0.0.0')
