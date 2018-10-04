import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import {
  Grid,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField
} from '@material-ui/core';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  AttachFile as AttachFileIcon,
} from '@material-ui/icons';
import {
  pullNews,
  deleteNews,
  resetNewsSingle
} from './store/actions';
import moment from 'moment';

const Transition = (props) => <Slide direction="up" {...props} />;

@connect(({ Admin_News_Single }) => ({ Admin_News_Single }), ({
  pullNews,
  deleteNews,
  resetNewsSingle,
  replace,
}))
export default class Single extends Component {

  state = {
    ready: false,
    confirmDelete: false,
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.pullNews(id)
      .then(() => this.setState({ ready: true }));
  }

  componentWillUnmount() {
    this.props.resetNewsSingle();
  }

  handleClickOpenConfirmDelete = () => {
    this.setState({ confirmDelete: true });
  };

  handleCloseConfirmDelete = () => {
    this.setState({ confirmDelete: false });
  };

  renderLoader = () => <CircularProgress size={24} className={'admin_loading'} />;

  renderImage = (file) => {
    const HOST = `${process.env.API_HOST}`;
    const FILE_URI = file.original_uri.split('/');
    const FILE_NAME = FILE_URI[FILE_URI.length - 1].slice(-15);
    const UPLOAD_FILE_FORMATS = ['jpeg', 'jpg', 'png'];

    return (
      <div className={'image-attach_item'} key={file.id}>
        <a href={`${HOST}${file.original_uri}`} target={'_blank'} className={'image-attach_link'}>
          {
            UPLOAD_FILE_FORMATS.includes(file.extension) ? (
              <div className={'image-attach_img'}>
                <img src={`${HOST}${file.original_uri}`} alt={'Preview photo'} />
              </div>
            ) : (
              <div className={'image-attach_icon'}>
                <AttachFileIcon />
              </div>
            )
          }
          <p className={'image-attach_file-name'}>{FILE_NAME}</p>
        </a>
      </div>
    );
  };

  renderContent = () => {

    const {
      id,
      name,
      content,
      image,
      created_at,
      updated_at
    } = this.props.Admin_News_Single.news;

    const product_created = moment(created_at * 1000).format('HH:mm DD/MM/YYYY');
    const product_updated = moment(updated_at * 1000).format('HH:mm DD/MM/YYYY');

    return (
      <Grid item xs={10} className={'product-single'}>
        <Grid container spacing={40} className={'product-single_row'}>
          <Grid item xs={1} className={'product-single_item'}>
            <TextField
              fullWidth
              disabled
              label={'ID'}
              value={id}
            />
          </Grid>
          <Grid item xs={11} className={'product-single_item'}>
            <TextField
              fullWidth
              disabled
              label={'Название'}
              value={name}
            />
          </Grid>
        </Grid>
        <Grid container spacing={40} className={'product-single_row'}>
          <Grid item xs={12} className={'product-single_item'}>
            <TextField
              fullWidth
              disabled
              multiline
              rows={4}
              label={'Текст'}
              value={content}
            />
          </Grid>
        </Grid>

        <Grid container spacing={40} className={'product-single_row'}>
          <Grid item xs={6} className={'product-single_item'}>
            <TextField
              fullWidth
              disabled
              label={'Дата создания'}
              value={product_created}
            />
          </Grid>
          <Grid item xs={6} className={'product-single_item'}>
            <TextField
              fullWidth
              disabled
              label={'Дата изменения'}
              value={product_updated}
            />
          </Grid>
        </Grid>

        <Grid container spacing={40} className={'product-single_row'}>
          <Grid item xs={12} className={'image-attach'}>
            {
              this.renderImage(image)
            }
          </Grid>
        </Grid>

        <Grid container spacing={40} className={'product-single_row product-single_edit-btn'}>
          <Grid item sm={6} xs={6} lg={3}>
            <Button
              fullWidth
              variant={'raised'}
              onClick={() => this.props.replace(`/admin/news/${id}/edit`)}
            >
              <EditIcon />
              Изменить
            </Button>
          </Grid>
          <Grid item sm={6} xs={6} lg={3}>
            <Button
              fullWidth
              color={'secondary'}
              variant={'raised'}
              onClick={this.handleClickOpenConfirmDelete}
            >
              <DeleteIcon />
              Удалить
            </Button>

            <Dialog
              open={this.state.confirmDelete}
              TransitionComponent={Transition}
              keepMounted
              onClose={this.handleCloseConfirmDelete}
              aria-labelledby={'alert-dialog-slide-title'}
              aria-describedby={'alert-dialog-slide-description'}
            >
              <DialogTitle id={'alert-dialog-slide-title'}>
                {'Удалить?'}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id={'alert-dialog-slide-description'}>
                  Подтвердите удаление новости
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={this.handleCloseConfirmDelete}
                  color={'secondary'}
                  variant={'raised'}
                >
                  Отменить
                </Button>
                <Button
                  onClick={() => this.props.deleteNews(id)}
                  color={'primary'}
                  variant={'raised'}
                >
                  Подтвердить
                </Button>
              </DialogActions>
            </Dialog>

          </Grid>
        </Grid>
      </Grid>
    );
  };

  render() {
    return this.state.ready ? this.renderContent() : this.renderLoader();
  }
}
