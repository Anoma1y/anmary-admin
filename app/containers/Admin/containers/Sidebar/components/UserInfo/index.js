import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Person as PersonIcon } from '@material-ui/icons';

@connect(({ Admin }) => ({ Admin }))
export default class UserInfo extends Component {
  render() {
    return (
      <div className={'sidebar-item sidebar-user'}>

        <div className={'sidebar-item_icon'}>
          <div className={'sidebar-user_avatar'}>
            <PersonIcon />
          </div>
        </div>

        <div className={'sidebar-item_content'}>
          <span>{this.props.Admin.user.name || this.props.Admin.user.email}</span>
        </div>
      </div>
    );
  }
}
