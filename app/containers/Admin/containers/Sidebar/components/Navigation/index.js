import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  SupervisorAccount as SupervisorAccountIcon,
  CardMembership as CardMembershipIcon,
  AccountBalance as AccountBalanceIcon,
  Assessment as AssessmentIcon,
  Inbox as InboxIcon,
  ImportExport as ImportExportIcon
} from '@material-ui/icons';
import Storage from 'lib/storage';

const NAVIGATION_MENU = [
  { id: 1, role_name: 'products-list', name: 'Товары', icon: <AccountBalanceIcon />, link: '/admin/products' },
  { id: 2, role_name: 'orders-list', name: 'Заказы', icon: <AccountBalanceIcon />, link: '/admin/orders' },
  { id: 3, role_name: 'categories-list', name: 'Категории', icon: <SupervisorAccountIcon />, link: '/admin/categories' },
  { id: 4, role_name: 'compositions-list', name: 'Составы', icon: <InboxIcon />, link: '/admin/compositions' },
  { id: 5, role_name: 'brands-list', name: 'Бренды', icon: <InboxIcon />, link: '/admin/brands' },
  { id: 6, role_name: 'seasons-list', name: 'Сезоны', icon: <ImportExportIcon />, link: '/admin/seasons' },
  { id: 7, role_name: 'news-list', name: 'Новости', icon: <ImportExportIcon />, link: '/admin/news' },
  { id: 8, role_name: 'roles-list', name: 'Роли', icon: <AssessmentIcon />, link: '/admin/roles' },
  { id: 9, role_name: 'users-list', name: 'Пользователи', icon: <CardMembershipIcon />, link: '/admin/users' },
];

export default class Navigation extends Component {

  renderItem = (item) => (
    <div className={'sidebar-item sidebar-navigation_item'} key={item.id}>
      <div className={'sidebar-item_icon'}>
        <div className={'sidebar-navigation_avatar'}>
          {item.icon}
        </div>
      </div>

      <div className={'sidebar-item_content'}>
        <Link className={'sidebar-navigation_link'} to={item.link}>{item.name}</Link>
      </div>
    </div>
  );

  render() {
    const { permissions } = Storage.get('permissions');

    return (
      <div className={'sidebar-navigation'}>
        {
          NAVIGATION_MENU.map((item) => permissions.includes(item.role_name) ? this.renderItem(item) : null)
        }
      </div>
    );
  }
}
