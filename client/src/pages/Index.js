import React, { useEffect, useState } from 'react';

import {
  Toolbar, AppBar, Typography,
  Fab, Popover, Card, Paper, Dialog, Snackbar,
} from '@material-ui/core';

import {
  Message
} from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';
import Form from '../components/Form';
import Chat from '../components/Chat';
import CheckTicket from '../components/CheckTicket';

import usersApi from '../api/usersApi';
import roomsApi from '../api/roomsApi';
import ticketsApi from '../api/ticketsApi';
import {
  initSocket,
  disconnectSocket,
  subscribeToChat,
} from '../api/socketApi';
import ViewTicket from '../components/ViewTicket';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 700,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  card: {
    position: 'absolute',
    bottom: theme.spacing(70),
    right: theme.spacing(130),
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
  const [ticket, setTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [form, setForm] = useState({
    name: '',
    lastName: '',
    doc: '',
    phone: '',
  });
  const [conversation, setConversation] = useState([]);

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
          const firstMessage = room.chat.shift();
          setConversation(conversation => [...conversation, firstMessage]);
        });
      });
  };

  const pushMessage = (data) => {
    setConversation(conversation => [...conversation, data]);
  };

  const sendMessage = (data) => {
    roomsApi.pushMessage(data);
  };

  const findTicket = (id) => {
    ticketsApi.get(id).then(result => {
      const { data } = result;
      setTicket(data.shift());
      setShowModal(true);
    }).catch(() => {
      setError('No existe el ticket')
      setShowAlert(true);
    });
  }

  useEffect(() => {
    if (idChat) {
      initSocket();
      subscribeToChat(idChat, pushMessage);
      return () => {
        disconnectSocket();
      };
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
      <Card className={classes.card}>
        <CheckTicket
          findTicket={findTicket}
        />
      </Card>
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
        onClose={() => setFormView(false)}
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
          {chatView && idChat
            ? <Chat
              idChat={idChat}
              idChatUser={idChatUser}
              sendMessage={sendMessage}
              pushMessage={pushMessage}
              conversation={conversation}
            />
            : <Form
              form={form}
              handleForm={handleForm}
              saveForm={saveForm}
            />}
        </Paper>
      </Popover>
      <Dialog
        id={'check'}
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <ViewTicket
          setShowModal={setShowModal}
          ticket={ticket}
        />
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        message={error}
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
      ></Snackbar>
    </div>
  );
}

export default Index;