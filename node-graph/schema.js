const graphql = require('graphql');
const psql = require('./psqlAdapter').psql;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull
} = graphql;

 const SellerType = new GraphQLObjectType({
   name: 'Seller',
   fields: () => ({
     sellerid: {type: GraphQLInt},
     products: {
       type: new GraphQLList(ProductType),
       resolve(parent, args){
         query = "SELECT productcode, display_description, categoryname FROM supplychain WHERE sellerid = $1 LIMIT(10)"
         return psql.any(query, [parent.sellerid]);
       }
     }
   })
 })

 const BuyerType = new GraphQLObjectType({
   name: 'Buyer',
   fields: () => ({
     buyerid: {type: GraphQLInt},
     products: {
       type: new GraphQLList(ProductType),
       resolve(parent, args){
         query = "SELECT productcode, display_description, categoryname FROM supplychain WHERE buyerid = $1 LIMIT(10)"
         return psql.any(query, [parent.buyerid]);
       }
     }
   })
 })

 const OrderType = new GraphQLObjectType({
   name: 'Order',
   fields: () => ({
     id: {type: GraphQLInt},
     total_qty: {type: GraphQLString},
     order_price: {type: GraphQLFloat},
     product: {
       type: ProductType,
       resolve(parent, args){
         query = "SELECT productcode, display_description, categoryname FROM supplychain WHERE id = $1"
         return psql.one(query, [parent.id]);
       }
     }
   })
 })

 const ProductType = new GraphQLObjectType({
   name: 'Product',
   fields: () => ({
     productcode: {type: GraphQLString},
     display_description: {type: GraphQLString},
     categoryname: {type: GraphQLString},
     buyers: {
       type: new GraphQLList(BuyerType),
       resolve(parent, args){
         query = "SELECT buyerid FROM supplychain WHERE productcode = $1 LIMIT(10)"
         return psql.any(query, [parent.productcode]);
       }
     },
     sellers: {
       type: new GraphQLList(SellerType),
       resolve(parent, args){
         query = "SELECT sellerid FROM supplychain WHERE productcode = $1 LIMIT(10)"
         return psql.any(query, [parent.productcode]);
       }
     }
   })
 })

 const RootQuery = new GraphQLObjectType({
   name: 'RootQueryType',
   fields: {
     //SELLER QUERIES
     sellers:{
       type: new GraphQLList(SellerType),
       resolve(parent, args){
         query = "SELECT DISTINCT sellerid FROM supplychain LIMIT(10)"
         return psql.any(query, []);
       }
     },
     //BUYER QUERIES
     buyers: {
       type: new GraphQLList(BuyerType),
       resolve(parent, args){
         query = "SELECT DISTINCT buyerid FROM supplychain LIMIT(10)"
         return psql.any(query, []);
       }
      },
     //ORDERS QUERIES
     orders: {
       type: new GraphQLList(OrderType),
       resolve(parent, args){
         query = "SELECT id, total_qty, order_price FROM supplychain LIMIT(10)"
         return psql.any(query, []);;
       }
     },
     //PRODUCTS QUERIES
     products: {
       type: new GraphQLList(ProductType),
       resolve(parent, args){
         query = "SELECT productcode, display_description, categoryname FROM supplychain LIMIT(10)"
         return psql.any(query, []);;
       }
     }
   }
 });

 module.exports = new GraphQLSchema({
  query: RootQuery
})
