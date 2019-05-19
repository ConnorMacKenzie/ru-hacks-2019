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
       args: {limit: {type: GraphQLInt}},
       resolve(parent, args){
         query = "SELECT productcode, display_description, categoryname FROM supplychain WHERE sellerid = $1 LIMIT($2)"
         return psql.any(query, [parent.sellerid, args.limit]);
       }
     },
     orders: {
       type: new GraphQLList(OrderType),
       args: {limit: {type: GraphQLInt}},
       resolve(parent, args){
         query = "SELECT id, total_qty, order_price, audit_mth FROM supplychain WHERE sellerid = $1 LIMIT($2)"
         return psql.any(query, [parent.sellerid, args.limit]);
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
       args: {limit: {type: GraphQLInt}},
       resolve(parent, args){
         query = "SELECT productcode, display_description, categoryname FROM supplychain WHERE buyerid = $1 LIMIT($2)"
         return psql.any(query, [parent.buyerid, args.limit]);
       }
     },
     orders: {
       type: new GraphQLList(OrderType),
       args: {limit: {type: GraphQLInt}},
       resolve(parent, args){
         query = "SELECT id, total_qty, order_price, audit_mth FROM supplychain WHERE buyerid = $1 LIMIT($2)"
         return psql.any(query, [parent.buyerid, args.limit]);
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
     audit_mth: {type: GraphQLString},
     product: {
       type: ProductType,
       resolve(parent, args){
         query = "SELECT productcode, display_description, categoryname FROM supplychain WHERE id = $1"
         return psql.one(query, [parent.id]);
       }
     },
     buyer: {
       type: BuyerType,
       resolve(parent, args){
         query = "SELECT buyerid FROM supplychain WHERE id = $1"
         return psql.one(query, [parent.id]);
       }
     },
     sellers: {
       type: SellerType,
       resolve(parent, args){
         query = "SELECT sellerid FROM supplychain WHERE id = $1"
         return psql.one(query, [parent.id]);
       }
     },
   })
 })

 const ProductType = new GraphQLObjectType({
   name: 'Product',
   fields: () => ({
     productcode: {type: GraphQLString},
     display_description: {type: GraphQLString},
     categoryname: {type: GraphQLString},
     orders: {
       type: new GraphQLList(OrderType),
       args: {limit: {type: GraphQLInt}},
       resolve(parent, args){
         query = "SELECT id, total_qty, order_price, audit_mth FROM supplychain WHERE productcode = $1 LIMIT($2)"
         return psql.any(query, [parent.productcode, args.limit]);
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
       args: {limit: {type: GraphQLInt}},
       resolve(parent, args){
         query = "SELECT DISTINCT sellerid FROM supplychain LIMIT($1)"
         return psql.any(query, [args.limit]);
       }
     },
     sellerById:{
       type: SellerType,
       args: {
         sellerid: {type: GraphQLInt}
       },
       resolve(parent, args){
         return args
       }
     },
     //BUYER QUERIES
     buyers: {
       type: new GraphQLList(BuyerType),
       args: {limit: {type: GraphQLInt}},
       resolve(parent, args){
         query = "SELECT DISTINCT buyerid FROM supplychain LIMIT($1)"
         return psql.any(query, [args.limit]);
       }
      },
      buyerById:{
        type: BuyerType,
        args: {
          buyerid: {type: GraphQLInt}
        },
        resolve(parent, args){
          return args
        }
      },
     //ORDERS QUERIES
     orders: {
       type: new GraphQLList(OrderType),
       args: {limit: {type: GraphQLInt}},
       resolve(parent, args){
         query = "SELECT id, total_qty, order_price, audit_mth FROM supplychain LIMIT($1)"
         return psql.any(query, [args.limit]);
       }
     },
     orderById: {
       type: OrderType,
       args: {
         id: {type: GraphQLInt},
         limit: {type: GraphQLInt}
       },
       resolve(parent, args){
         query = "SELECT id, total_qty, order_price, audit_mth FROM supplychain WHERE id = $1"
         return psql.one(query, [args.id]);
       }
     },
     ordersByAuditMths: {
       type: new GraphQLList(OrderType),
       args: {
         audit_mth: {type: GraphQLList(GraphQLString)},
         limit: {type: GraphQLInt}
       },
       resolve(parent, args){
         query = "SELECT id, total_qty, order_price, audit_mth FROM supplychain WHERE audit_mth IN ($1:csv) LIMIT($2)"
         return psql.any(query, [args.audit_mth, args.limit]);
       }
     },
     //PRODUCTS QUERIES
     products: {
       type: new GraphQLList(ProductType),
       args: {limit: {type: GraphQLInt}},
       resolve(parent, args){
         query = "SELECT productcode, display_description, categoryname FROM supplychain LIMIT($1)"
         return psql.any(query, [args.limit]);
       }
     },
     productByCode:{
       type: new GraphQLList(ProductType),
       args: {
         productcode: {type: GraphQLString},
         limit: {type: GraphQLInt}
       },
       resolve(parent, args){
         query = "SELECT productcode, display_description, categoryname FROM supplychain WHERE productcode = $1 LIMIT($2)"
         return psql.any(query, [args.productcode, args.limit]);
       }
     },
   }
 });

 module.exports = new GraphQLSchema({
  query: RootQuery
})
