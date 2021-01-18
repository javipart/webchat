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
  }
});

const Index = () => {
  const [allRooms, setAllRooms] = useState([]);
  const [idChat, setIdChat] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [agentDoc, setAgentDoc] = useState('');
  const [agent, setAgent] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
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
  };

  const pushRoom = (data) => {
    setAllRooms(rooms => [...rooms, data]);
  };

  useMemo(() => {
    if (idChat) {
      initSocket();
      subscribeToChat(idChat, pushMessage);
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

  const sendMessage = (data) => {
    roomsApi.pushMessage(data).then(() => {
      setData({ ...data, message: '' });
    });
  };

  const saveTicket = () => {
    ticketsApi.save(dataTicket).then(() => {
      setShowModal(false);
    })
  }

  useMemo(() => {
    if (idChat) {
      roomsApi.getRoom(idChat).then((result) => {
        const { success, data } = result;
        setAllMessages(data.chat)
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
                <IconButton>
                  <ListIcon />
                </IconButton>
              </Grid>
              <Divider />
              <List className={classes.messageArea}>
                {allRooms.map((item, index) => (
                  <ListItem button key={item['_id']} onClick={() => setIdChat(item['_id'])}>
                    <ListItemIcon>
                      <Badge variant={'dot'} color={'secondary'}>
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
                {allMessages.map((item, index) => (
                  <ListItem key={index}>
                    <Grid container style={{ backgroundColor: agent['_id'] === item.transmitter ? '#FCE2DC' : '#DCEFFC' }}>
                      <Grid item xs={12}>
                        <ListItemText align={agent['_id'] === item.transmitter ? "right" : "left"} primary={item.message}></ListItemText>
                      </Grid>
                      <Grid item xs={12}>
                        <ListItemText align={agent['_id'] === item.transmitter ? "left" : "right"} secondary={item.date}></ListItemText>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
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
                  <Fab color="primary" aria-label="add" onClick={() => sendMessage({
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
    </div>
  );
}

export default Index;