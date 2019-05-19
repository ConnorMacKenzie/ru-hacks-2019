import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};

function SimpleTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell align="right">Seller Id</TableCell>
            <TableCell align="right">Product Code</TableCell>
            <TableCell align="right">Total Quantity</TableCell>
            <TableCell align="right">Order Price</TableCell>
            <TableCell align="right">Audit Month</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.sellers.map(n => (
            <TableRow key={n.products[0].orders[0].id}>
              <TableCell component="th" scope="row">
                {n.products[0].orders[0].id}
              </TableCell>
              <TableCell align="right">{n.sellerid}</TableCell>
              <TableCell align="right">{n.products[0].productcode}</TableCell>
              <TableCell align="right">{n.products[0].orders[0].total_qty}</TableCell>
              <TableCell align="right">{n.products[0].orders[0].order_price}</TableCell>
              <TableCell align="right">{n.products[0].orders[0].audit_mth}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
