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
  const [anchorEl, setAnchorEl] = useState(null);
  const [form, setForm] = useState({
    name: '',
    lastName: '',
    id: '',
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
    console.log(form)
  };

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
        <div>
          <h4>Complete el formulario para iniciar el Chat</h4>
          <Paper style={{
            padding: 1,
            margin: 'auto',
            minWidth: 300,
          }}>
            <Form
              form={form}
              handleForm={handleForm}
              saveForm={saveForm}
            />
          </Paper>
        </div>
      </Popover>
    </div>
  );
}

export default Index;