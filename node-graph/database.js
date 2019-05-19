const psql = require('./psqlAdapter').psql;
const QUERY_LIMIT = 500;

module.exports.getProductsBySellerId = function(params){
  query = "SELECT DISTINCT productcode, display_description, categoryname FROM supplychain WHERE sellerid = $1 GROUP BY productcode, display_description, categoryname LIMIT($2)"
  return execute(query, params);
},

module.exports.getProductsByBuyerId = function(params){
  query = "SELECT DISTINCT buyerid, productcode, display_description, categoryname FROM supplychain WHERE buyerid = $1 GROUP BY productcode, display_description, categoryname LIMIT($2)"
  return execute(query, params);
},

module.exports.getProductById = function(params){
  query = "SELECT productcode, display_description, categoryname FROM supplychain WHERE id = $1"
  return execute(query, params);
},

module.exports.getOrdersBySellerId = function(params){
  query = "SELECT id, total_qty, order_price, audit_mth FROM supplychain WHERE sellerid = $1 LIMIT($2)"
  return execute(query, params);
},

module.exports.getOrdersByBuyerId = function(params){
  query = "SELECT productcode, display_description, categoryname FROM supplychain WHERE buyerid = $1 LIMIT($2)"
  return execute(query, params);
},

module.exports.getOrdersByProductCode = function(params){
  query = "SELECT id, total_qty, order_price, audit_mth FROM supplychain WHERE productcode = $1 LIMIT($2)"
  return execute(query, params);
},

module.exports.getBuyerById = function(params){
  query = "SELECT buyerid FROM supplychain WHERE id = $1"
  return execute(query, params);
},

module.exports.getSellerById = function(params){
  query = "SELECT sellerid FROM supplychain WHERE id = $1"
  return execute(query, params);
}

function execute(query, params){
  query_array = params.map(i => psql.any(query, [i.id, i.limit || QUERY_LIMIT]));
  return psql.task(t => {
    return t.batch(query_array)
  });
}
