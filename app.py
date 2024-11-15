from flask import Flask
app = Flask(__name__)


def create_app():
    app = Flask("abc")

    @app.route('/')
    def hello_world():
        return 'Hello, World!'