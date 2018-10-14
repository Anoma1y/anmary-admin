import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import {
  Grid,
  CircularProgress,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import {
  pullOrders,
  resetOrdersList
} from './store/actions';
import Storage from 'lib/storage';
import {Link} from "react-router-dom";
import moment from "moment";

@connect(({ Admin_Orders_List }) => ({ Admin_Orders_List }), ({
  pullOrders,
  resetOrdersList,
  replace
}))
export default class List extends Component {

  state = {
    ready: false,
  };

  componentDidMount() {
    this.props.pullOrders()
      .finally(() => this.setState({ ready: true }));
  }

  componentWillUnmount() {
    this.props.resetOrdersList();
  }

  renderLoader = () => <CircularProgress size={24} className={'admin_loading'} />;

  renderContent = () => {
    const { permissions } = Storage.get('permissions');

    return (
      <Grid item xs={12} className={'users-list'}>
        <Grid container>
          <Grid item xs={12} className={'admin-table'}>

            <Table className={'users-list-table'}>
              <TableHead>
                <TableRow className={'users-list-table_header'}>
                  <TableCell>ID</TableCell>
                  <TableCell>Заказчик</TableCell>
                  <TableCell>Количество продуктов</TableCell>
                  <TableCell>Дата создания</TableCell>
                  <TableCell>Статус</TableCell>

                </TableRow>
              </TableHead>

              <TableBody className={'users-list-table_body'}>
                {
                  this.props.Admin_Orders_List.orders
                    .map((order) => {

                      const {
                        id,
                        contact_detail,
                        contact_name,
                        created_at,
                        products_count,
                        is_completed
                      } = order;
                      const order_created = moment(created_at * 1000).format('HH:mm DD/MM/YYYY');
                      const order_status = is_completed ? 'Завершен' : 'Активный';

                      return (
                        <TableRow key={id} className={'users-list-table_row'}>
                          <TableCell className={'news-list-table_item'}>
                            {
                              permissions.includes('orders-single') ? (
                                <Link to={`/admin/orders/${id}`}>{id}</Link>
                              ) : id
                            }
                          </TableCell>
                          <TableCell className={'news-list-table_item'}>{contact_name} {contact_detail}</TableCell>
                          <TableCell className={'news-list-table_item'}>{products_count}</TableCell>
                          <TableCell className={'news-list-table_item'}>{order_created}</TableCell>
                          <TableCell className={'news-list-table_item'}>{order_status}</TableCell>
                        </TableRow>
                      );
                    })
                }
              </TableBody>
            </Table>

          </Grid>
        </Grid>
      </Grid>
    );
  };

  render() {
    return this.state.ready ? this.renderContent() : this.renderLoader();
  }
}
