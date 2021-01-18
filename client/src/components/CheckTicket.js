import React, { useEffect, useState } from 'react';

import {
  Button,
  Grid,
  TextField,
} from '@material-ui/core';

import {
  Send
} from '@material-ui/icons';

const CheckTicket = ({ findTicket }) => {
  const [numberTicket, setNumberTicket] = useState('');
  return (
    <Grid container spacing={'1'}>
      <Grid item xs={10}>
        <TextField
          id={'ticket'}
          label={'Número de Ticket'}
          value={numberTicket}
          onChange={(e) => setNumberTicket(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={2}>
        <Button onClick={findTicket}>
          Buscar
        </Button>
      </Grid>
    </Grid>
  );
}

export default CheckTicket;