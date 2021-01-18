import React, { useEffect, useState } from 'react';

import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  Divider,
} from '@material-ui/core';

const ViewTicket = ({ setShowModal, ticket }) => {

  return (
    <>
      <DialogTitle>
        Ticket
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="h6" className="header-message">ID</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h5" className="header-message">{ticket['_id']}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" className="header-message">Estado</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h5" className="header-message">{ticket.status}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" className="header-message">Creado por</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h5" className="header-message">{ticket.userCreate}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" className="header-message">Actualizado Por </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h5" className="header-message">{ticket.userUpdate}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" className="header-message">Detalles</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h5" className="header-message">{ticket.details}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowModal(false)}>
          Aceptar
        </Button>
      </DialogActions>
    </>
  );
}

export default ViewTicket;
