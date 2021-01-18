import React, { useEffect, useMemo, useState } from 'react';

import {
  Typography, Button, Fab,
  Grid, Card, Paper,
  TextField, List, ListItem,
  ListItemIcon, Avatar, ListItemText,
  Divider,
  IconButton,
  ListItemSecondaryAction,
  Dialog,
  Badge,
  Snackbar,
} from '@material-ui/core';

import {
  Send, PostAdd,
} from '@material-ui/icons';
import ListIcon from '@material-ui/icons/List';

import { makeStyles } from '@material-ui/core/styles';
import agentsApi from '../api/agentsApi';
import roomsApi from '../api/roomsApi';
import { disconnectSocket, initSocket, subscribeRooms, subscribeToChat } from '../api/socketApi';
import ticketsApi from '../api/ticketsApi';
import AddTicket from '../components/AddTicket';
import ListTickets from '../components/ListTickets';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh'
  },
  headBG: {
    backgroundColor: '#e0e0e0'
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
    overflowY: 'auto'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  },
  roomsArea: {
    height: '57vh',
    overflowY: 'auto'
  }
});

const Index = () => {
  const [allRooms, setAllRooms] = useState([]);
  const [idChat, setIdChat] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [agentDoc, setAgentDoc] = useState('');
  const [agent, setAgent] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [allTickets, setAllTickets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [newMessagees, setNewMessages] = useState([]);
  const [data, setData] = useState({
    transmitter: '',
    message: '',
  });
  const [dataTicket, setDataTicket] = useState({
    userId: '',
    userCreate: '',
    userUpdate: '',
    details: '',
  });

  const handleChange = (e) => {
    const { value } = e.target;
    setAgentDoc(value);
  };

  const agentLogin = () => {
    agentsApi.get(agentDoc).then((result) => {
      const { success, data: agent } = result;
      if (data) {
        setAgent(agent);
        setDataTicket({ ...dataTicket, userCreate: agent['_id'] });
        ticketsApi.getAll(agent['_id'])
          .then(result => {
            const { data: tickets } = result;
            const activeTickets = tickets
              .filter(ticket => ticket.status === 'created');
            setAllTickets(activeTickets);
          });
        roomsApi.getAgentRooms(agent['_id']).then((result) => {
          const { success, data: rooms } = result;
          setData({ ...data, transmitter: agent['_id'] });
          const users = rooms.map(user => user.user);
          setAllUsers(users);
          setAllRooms(rooms);
        })
      }
    })
  }
  let component = (
    <div style={{
      position: 'absolute',
      bottom: '50%',
      right: '50%',
    }}>
      <Card>
        <Grid container>
          <Grid item xs={12} >
            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
            <Typography variant="h5" className="header-message">Agente</Typography>
          </Grid>
        </Grid>
        <TextField
          id={'doc'}
          label={'Documento'}
          value={agentDoc}
          onChange={handleChange}
          fullWidth
        />
        <Button onClick={agentLogin}>
          Ingresar
        </Button>
      </Card>
    </div>
  );

  const classes = useStyles();

  const pushMessage = (data) => {
    setAllMessages(messages => [...messages, data]);
    if (data.transmitter !== agent['_id']) {
      setAlertMessage('Nuevo Mensaje Recibido');
      setShowAlert(true);
    }
  };

  const pushRoom = (data) => {
    setAllRooms(rooms => [...rooms, data]);
  };

  useEffect(() => {
    if (idChat) {
      initSocket();
      subscribeToChat(idChat, pushMessage);
      setNewMessages(ids => [...ids, idChat]);
      return () => {
        disconnectSocket();
      };
    }
  }, [idChat]);

  useEffect(() => {
    initSocket();
    subscribeRooms(pushRoom);
    return () => {
      disconnectSocket();
    };
  }, []);

  const sendMessage = (dataMessage) => {
    roomsApi.pushMessage(dataMessage).then(() => {
      setData({ ...data, message: '' });
    });
  };

  const saveTicket = () => {
    ticketsApi.save(dataTicket).then(() => {
      setShowModal(false);
      ticketsApi.getAll(agent['_id'])
        .then(result => {
          const { data: tickets } = result;
          const activeTickets = tickets
            .filter(ticket => ticket.status === 'created')
          setAllTickets(activeTickets);
          setAlertMessage('Creación Correcta del Ticket');
          setShowAlert(true);
          setDataTicket({
            userId: '',
            userCreate: '',
            userUpdate: '',
            details: '',
          })
        });
    })
  };

  const updateTicket = (data) => {
    const { id } = data;
    ticketsApi.update(id, data).then(() => {
      ticketsApi.getAll(agent['_id'])
        .then(result => {
          const { data: tickets } = result;
          const activeTickets = tickets
            .filter(ticket => ticket.status === 'created')
          setAllTickets(activeTickets);
          setAlertMessage('Actualización Correcta del Tickets');
          setShowAlert(true);
        });
    });
  };

  useMemo(() => {
    if (idChat) {
      roomsApi.getRoom(idChat).then((result) => {
        const { success, data } = result;
        setAllMessages(data.chat)
        const ids = newMessagees.filter(id => id !== idChat);
        setNewMessages(ids);
      });
    }
  }, [idChat])

  return (
    <div>
      {agent ?
        <>
          <Grid container>
            <Grid item xs={12} >
              <Typography variant="h5" className="header-message">Agente</Typography>
            </Grid>
          </Grid>
          <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={5} className={classes.borderRight500}>
              <List>
                <ListItem button key="RemySharp">
                  <ListItemIcon>
                    <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                  </ListItemIcon>
                  <ListItemText primary={agent.name}></ListItemText>
                  <ListItemSecondaryAction>
                    Crear Ticket
                    <IconButton onClick={() => setShowModal(true)}>
                      <PostAdd />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
              <Divider />
              <Grid item xs={12} style={{ padding: '10px' }}>
                Listado de tickets
                <IconButton onClick={() => setShowListModal(true)}>
                  <ListIcon />
                </IconButton>
              </Grid>
              <Divider />
              <List className={classes.roomsArea}>
                {allRooms.map((item, index) => (
                  <ListItem button key={item['_id']} onClick={() => setIdChat(item['_id'])}>
                    <ListItemIcon>
                      <Badge variant={'dot'} color={newMessagees.includes(item['_id']) ? 'secondary' : ''}>
                        <Avatar alt="img" src={`https://material-ui.com/static/images/avatar/${index + 1}.jpg`} />
                      </Badge>
                    </ListItemIcon>
                    <ListItemText primary={`${item.user.name} ${item.user.lastName}`}>{`${item.user.name} $${item.user.lastName}`}</ListItemText>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={7}>
              <List className={classes.messageArea}>
                {allMessages.map((item, index) => {
                  const time = new Date(item.date);
                  const timeMessage = `${time.getUTCHours()}:${time.getUTCMinutes()}`
                  return (
                    <ListItem key={index}>
                      <Grid container style={{ backgroundColor: agent['_id'] === item.transmitter ? '#FCE2DC' : '#DCEFFC' }}>
                        <Grid item xs={12}>
                          <ListItemText align={agent['_id'] === item.transmitter ? "right" : "left"} primary={item.message}></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                          <ListItemText align={agent['_id'] === item.transmitter ? "left" : "right"} secondary={timeMessage}></ListItemText>
                        </Grid>
                      </Grid>
                    </ListItem>
                  );
                })}
              </List>
              <Divider />
              <Grid container style={{ padding: '5px' }}>
                <Grid item xs={11}>
                  <TextField
                    id="outlined-basic-email"
                    label="Mensaje"
                    fullWidth
                    value={data.message}
                    onChange={(e) =>
                      setData({ ...data, message: e.target.value })
                    } />
                </Grid>
                <Grid xs={1} align="right">
                  <Fab
                    disabled={data.message === ''}
                    color="primary"
                    aria-label="add"
                    onClick={() => sendMessage({
                      id: idChat,
                      data,
                    })}><Send /></Fab>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
        : component}
      <Dialog
        id={'add'}
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <AddTicket
          users={allUsers}
          setDataTicket={setDataTicket}
          dataTicket={dataTicket}
          saveTicket={saveTicket}
          setShowModal={setShowModal}
        />
      </Dialog>
      <Dialog
        id={'list'}
        open={showListModal}
        onClose={() => setShowListModal(false)}
      >
        <ListTickets
          agent={agent}
          allTickets={allTickets}
          updateTicket={updateTicket}
          setShowListModal={setShowListModal}
        />
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        message={alertMessage}
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
      >

      </Snackbar>
    </div>
  );
}

export default Index;