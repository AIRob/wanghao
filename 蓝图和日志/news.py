#coding=utf-8


from flask import Flask


from admin1 import admin1
from admin2 import admin2

from test_data import admin3
# from admin.admin_module import admin_bp
#可以将蓝图文件集中到admin文件里面


app = Flask(__name__)


app.register_blueprint(admin1, url_prefix='/admin1')
app.register_blueprint(admin2, url_prefix='/admin2')
app.register_blueprint(admin3, url_prefix='/admin3/')



if __name__ == '__main__':
    app.run(port=9000, debug=True, host='0.0.0.0')


