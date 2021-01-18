import React, { useEffect, useState } from 'react';

import io from 'socket.io-client';

import {
  Button,
  Grid,
  IconButton,
  ListItemText,
  TextField,
  List,
  ListItem,
  Paper,
  makeStyles,
  Divider,
} from '@material-ui/core';

import {
  Send
} from '@material-ui/icons';

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
    borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});

const Chat = ({ idChat, idChatUser, message = {}, sendMessage, pushMessage, conversation }) => {
  const [data, setData] = useState({
    transmitter: idChatUser,
    message: '',
  });

  const classes = useStyles();

  const allMessages = conversation.map((item) => (
    <ListItem>
      <Grid container style={{ backgroundColor: idChatUser === item.transmitter ? '#FCE2DC' : '#DCEFFC' }}>
        <Grid item xs={12}>
          <ListItemText align={idChatUser === item.transmitter ? "right" : "left"} primary={item.message}></ListItemText>
        </Grid>
        <Grid item xs={12}>
          <ListItemText align={idChatUser === item.transmitter ? "left" : "right"} secondary={item.date}></ListItemText>
        </Grid>
      </Grid>
    </ListItem>
  ));

  return (
    <>
      <Grid item xs={12}>
        <List className={classes.messageArea}>
          {allMessages}
        </List>
      </Grid>
      <Divider />
      <Grid container style={{ padding: '5px' }}>
        <Grid item xs={10}>
          <TextField
            id={'message'}
            label={'Mensaje'}
            value={data.message}
            onChange={(e) =>
              setData({ ...data, message: e.target.value })
            }
            fullWidth
          />
        </Grid>
        <Grid xs={2} align="right">
          <IconButton onClick={() => {
            sendMessage({ id: idChat, data });
            setData({ ...data, message: '' });
          }}>
            <Send />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}

export default Chat;