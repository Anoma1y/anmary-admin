import {
  SET_NEWS,
  RESET,
} from './types';
import { replace } from 'react-router-redux';
import { send } from 'containers/Notification/store/actions';
import { api } from 'lib/api';
import uuid from 'uuid/v1';

export const setNews = (value) => ({
  type: SET_NEWS,
  payload: value,
});

export const resetNewsSingle = () => ({ type: RESET });

export const pullNews = (news_id) => (dispatch) => new Promise((resolve, reject) => {
  api.news.getSingle(news_id)
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      dispatch(setNews(data.data));
      resolve();
    })
    .catch(() => reject());
});

export const deleteNews = (news_id) => (dispatch) => {

  api.news.delete(news_id)
    .then((data) => {
      if (data.status !== api.code.OK) return;

      dispatch(send({ id: uuid(), status: 'success', title: 'Успешно', message: 'Новость была успешно удалена', timeout: 1000 }));
      dispatch(replace('/admin/news'));

    })
    .catch(() => {
      dispatch(send({ id: uuid(), status: 'error', title: 'Ошибка', message: 'Ошибка удаления новости', timeout: 1000 }));
    });

};
