from flask import Flask
from flask import jsonify
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/test/work")
def test_this_shit():
    return jsonify('{ "name":"John", "age":30, "city":"New York"}')

if __name__ == "__main__":
    app.run()
