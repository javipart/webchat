import React, { useEffect, useState } from 'react';

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

const Chat = ({ idChat, idChatUser, message = {}, sendMessage }) => {
  const [data, setData] = useState({
    transmitter: idChatUser,
    message: '',
  });
  return (
    <>
      <Grid item xs={12}>
        <List style={{
          overflowY: 'auto',
        }}>
          <ListItem>
            <Grid item>
              <ListItemText align='right' primary={'Hola'} />
            </Grid>
          </ListItem>
          <ListItem>
            <Grid item>
              <ListItemText align='left' primary={'Que tal?'} />
            </Grid>
          </ListItem>
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
          sendMessage(data);
          setData({ ...data, message: '' });
        }}>
          <Send />
        </IconButton>
      </Paper>
    </>
  );
}

export default Chat;