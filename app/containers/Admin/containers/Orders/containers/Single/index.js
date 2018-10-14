import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import {
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  CardHeader,
} from '@material-ui/core';
import { Person as PersonIcon } from '@material-ui/icons';
import {
  pullOrder,
  resetOrderSingle
} from './store/actions';

@connect(({ Admin_Order_Single }) => ({ Admin_Order_Single }), ({
  pullOrder,
  resetOrderSingle,
  replace
}))
export default class Single extends Component {

  state = {
    ready: false
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.pullOrder(id)
      .finally(() => this.setState({ ready: true }));
  }

  componentWillUnmount() {
    this.props.resetOrderSingle();
  }

  renderLoader = () => <CircularProgress size={24} className={'admin_loading'} />;

  renderContent = () => {
    return (
      <Grid item xs={10}>
        <Card className={'order-single'}>

          <CardContent className={'order-single_content'}>

          </CardContent>
          {/*<CardActions className={'order-single_btn'}>*/}
            {/*<Button*/}
              {/*variant={'raised'}*/}
              {/*onClick={() => this.props.replace(`/admin/orders/${this.props.Admin_Order_Single.order.id}/edit`)}*/}
            {/*>*/}
              {/*Изменить*/}
            {/*</Button>*/}
          {/*</CardActions>*/}
        </Card>
      </Grid>
    )
  }

  render() {
    return this.state.ready ? this.renderContent() : this.renderLoader();
  }
}
