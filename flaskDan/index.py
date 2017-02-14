from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def hello_word():

    content = 'hello world'
    return render_template('base.html',content = content)
@app.route('/one')
def one():
    return render_template('one.html')

@app.route('/two')
def two():
    return render_template('two.html')



if __name__ == '__main__':
    app.run(port=11111,debug=True)
