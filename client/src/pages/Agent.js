import React, { useEffect, useMemo, useState } from 'react';

import {
  Toolbar, AppBar,
  IconButton, Typography,
  Button, Fab, Popover,
  Box, Grid, Card, Paper,
  TextField, List, ListItem,
  ListItemIcon, Avatar, ListItemText, Divider,
} from '@material-ui/core';

import {
  Send
} from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';
import Form from '../components/Form';
import usersApi from '../api/usersApi';
import agentsApi from '../api/agentsApi';
import roomsApi from '../api/roomsApi';
import { disconnectSocket, initSocket, sendMessageChat, subscribeToChat } from '../api/socketApi';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    minHeight: 700,
  },
  table: {
    minWidth: 700,
  },
  chatSection: {
    width: '100%',
    height: '80vh'
  },
  headBG: {
    backgroundColor: '#e0e0e0'
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0'
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
  const [data, setData] = useState({
    transmitter: '',
    message: '',
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
        roomsApi.getAgentRooms(agent['_id']).then((result) => {
          const { success, data: rooms } = result;
          setData({ ...data, transmitter: agent['_id'] });
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
    console.log(data)
    setAllMessages(messages => [...messages, data]);
  };

  useEffect(() => {
    if (idChat) {
      initSocket();
      subscribeToChat(idChat, pushMessage);
      return () => {
        disconnectSocket();
      };
    }
  }, [idChat]);

  const sendMessage = (data) => {
    roomsApi.pushMessage(data);
  };

  useMemo(() => {
    roomsApi.getRoom(idChat).then((result) => {
      const { success, data } = result;
      setAllMessages(data.chat)
    })
  }, [idChat])

  return (
    <div className={classes.root}>
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
                </ListItem>
              </List>
              <Divider />
              <List>
                {allRooms.map(item => (
                  <ListItem button key={item['_id']} onClick={() => setIdChat(item['_id'])}>
                    <ListItemIcon>
                      <Avatar alt="img" src="https://material-ui.com/static/images/avatar/1.jpg" />
                    </ListItemIcon>
                    <ListItemText primary={item.user}>{item.user}</ListItemText>
                    <ListItemText secondary="online" align="right"></ListItemText>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={7}>
              {allMessages.map((item, index) => (
                <ListItem key={index}>
                  <Grid container>
                    <Grid item xs={12}>
                      <ListItemText align={agent['_id'] === item.transmitter ? "right" : "left"} primary={item.message}></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText align={agent['_id'] === item.transmitter ? "left" : "right"} secondary={item.date}></ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
              <Divider />
              <Grid container style={{ padding: '20px' }}>
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
    </div>
  );
}

export default Index;