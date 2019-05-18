from services.database_services import price_per_seller_per_month
from services.json_service import serialize_per_month
from flask import Flask
from flask import jsonify
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hit me with that dashboard"

@app.route('/trends/supplier/<month>')
def get_supplier_trend(month):
    data = price_per_seller_per_month([month])
    return jsonify(serialize_per_month(data, month, "sellers"))

if __name__ == "__main__":
    app.run()
