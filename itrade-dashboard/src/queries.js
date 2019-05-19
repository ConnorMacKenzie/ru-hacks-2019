import {gql} from 'apollo-boost';

const getSeller = gql`
  query{
    sellers(limit: 25){
      sellerid
      products(limit: 1){
        productcode
        orders(limit: 1){
          id
          total_qty
          order_price
          audit_mth
          buyer{
            buyerid
          }
        }
      }
    }
  }
`;

const getLineChart = gql`
  query{
    productByCode(productcode: "100081", limit: 1){
      productcode
      orders(limit: 12){
        order_price
        audit_mth
      }
    }
  }
`;

const orderPriceWithBuyerFacts = gql`
  query($months: months){
	ordersByAuditMths(audit_mth: $months, limit:500){
    order_price
  	audit_mth
    buyer{
      buyerid
    }
  }
}`;

const sankey = gql`
{
  products(limit:5){
    orders(limit:1){
      order_price
      buyer{
        buyerid
      }
      seller{
				sellerid
      }
    }
  }
}
`;

export {getSeller, getLineChart, orderPriceWithBuyerFacts};
