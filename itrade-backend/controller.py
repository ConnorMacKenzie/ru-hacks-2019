from services.database_services import price_per_seller, price_per_seller_per_category
from services.json_service import serialize_per_month, serialize_per_product
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
    data = price_per_seller([month])
    return jsonify(serialize_per_month(data, month, "sellers"))

@app.route('/trends/supplier/<month>')
def get_supplier_trend_per_category(month):
    data = price_per_seller_per_category([month])
    return jsonify(serialize_per_product(data, month, "sellers"))

if __name__ == "__main__":
    app.run()
