#   coding=utf-8
from flask import Flask, render_template,redirect
from flask_wtf import Form
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

app = Flask(__name__)
app.config['SECRET_KEY'] = 'wanghaowanghao'         # 必须 用于加密


class MyForm(Form):
    user = StringField('username', validators=[DataRequired()])
    # submit = SubmitField('submit')


@app.route('/')
def index():
    form = MyForm()

    return render_template('index.htm', form=form)


@app.route('/login', methods=('GET', 'POST'))
def login():
    form = MyForm()
    print form.data['user']  #admin
    print form.validate_on_submit()
    if form.validate_on_submit():
        if form.data['user'] == 'admin':
            return 'Admin login successfully!'
        else:
            return 'Wrong user!'

    return render_template('index.html', form=form)

if __name__ == '__main__':
    app.run(port=3100, debug=True, host='0.0.0.0')


