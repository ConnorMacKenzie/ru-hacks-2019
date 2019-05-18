from services.database_services import price_per_seller_per_month
from services.json_service import serialize_per_month
from flask import Flask
from flask import jsonify
from flask_cors import CORS, cross_origin
app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return "Hit me with that dashboard"


@app.route('/trends/supplier/<month>')
@cross_origin()
def get_supplier_trend(month):
    data = price_per_seller_per_month([month])
    return jsonify(serialize_per_month(data, month, "sellers"))

if __name__ == "__main__":
    app.run()
