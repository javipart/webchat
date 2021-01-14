import React, { useEffect, useState } from 'react';

import {
  Toolbar, AppBar,
  IconButton, Typography,
  Button, Fab, Popover, Box, Grid, Card, Paper,
} from '@material-ui/core';

import {
  Menu, Message
} from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';
import Form from '../components/Form';
import Chat from '../components/Chat';
import usersApi from '../api/usersApi';
import roomsApi from '../api/roomsApi';
import socketApi from '../api/socketApi';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    minHeight: 700,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }
}));

const Index = () => {
  const [formView, setFormView] = useState(false);
  const [chatView, setChatView] = useState(false);
  const [idChat, setIdChat] = useState(null);
  const [idChatUser, setIdChatUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [form, setForm] = useState({
    name: '',
    lastName: '',
    doc: '',
    phone: '',
  });

  const classes = useStyles();

  const handleClick = () => {
    setFormView(true);
  };

  const handleForm = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const saveForm = () => {
    const fieldId = '_id'
    usersApi.save(form)
      .then((result) => {
        const { data: user } = result;
        const idUser = user[fieldId];
        setIdChatUser(idUser);
        roomsApi.save({
          user: idUser,
          agent: '60006ea70129143b78a78bb6',
          chat: {
            transmitter: idUser,
            message: 'Hola',
          }
        }).then((resultRoom) => {
          const { data: room } = resultRoom;
          setChatView(true);
          setIdChat(room[fieldId]);
        })
      });
  };

  const pushMessage = (data) => {
    console.log(data);
  };

  const sendMessage = (data) => {
    roomsApi.pushMessage(data).then((result) => {
      console.log(result)
    })
  };

  useEffect(() => {
    if (idChat) {
      socketApi.connect(`message-${idChat}`, pushMessage);
    }
  }, [idChat]);

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            My Test
          </Typography>
        </Toolbar>
      </AppBar>
      <Fab
        color="primary"
        aria-label="edit"
        className={classes.fab}
        onClick={(e) => {
          handleClick();
          setAnchorEl(e.currentTarget);
        }}>
        <Message />
      </Fab>
      <Popover
        id={'form'}
        open={formView}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Paper style={{
          padding: 1,
          margin: 'auto',
          minWidth: 300,
          minHeight: 200,
        }}>
          <Chat
            idChat={idChat}
            idChatUser={idChatUser}
            sendMessage={sendMessage}
          />
          {/*chatView && idChat
              ? <Chat
                idChat={idChat}
                idChatUser={idChatUser}
                sendMessage={sendMessage}
              />
              : <Form
                form={form}
                handleForm={handleForm}
                saveForm={saveForm}
          />*/}
        </Paper>
      </Popover>
    </div>
  );
}

export default Index;