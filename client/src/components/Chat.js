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
} from '@material-ui/core';

import {
  Send
} from '@material-ui/icons';

const Chat = ({ idChat, idChatUser, message = {}, sendMessage, pushMessage, conversation }) => {
  const [data, setData] = useState({
    transmitter: idChatUser,
    message: '',
  });

  const allMessages = conversation.map((item) => (
    <ListItem>
      <Grid item>
        <ListItemText primary={item.message} />
      </Grid>
    </ListItem>
  ));

  return (
    <>
      <Grid item xs={12}>
        <List style={{
          overflowY: 'auto',
        }}>
          {allMessages}
        </List>
      </Grid>
      <Paper style={{
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        minWidth: 340,
        minHeight: 200,
        bottom: '0px',
      }}>
        <TextField
          id={'message'}
          label={'Mensaje'}
          value={data.message}
          onChange={(e) =>
            setData({ ...data, message: e.target.value })
          }
          fullWidth
        />
        <IconButton onClick={() => {
          sendMessage({ id: idChat, data });
          setData({ ...data, message: '' });
        }}>
          <Send />
        </IconButton>
      </Paper>
    </>
  );
}

export default Chat;