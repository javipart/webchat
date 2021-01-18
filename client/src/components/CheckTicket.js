import React, { useEffect, useState } from 'react';

import {
  IconButton,
  Grid,
  TextField,
} from '@material-ui/core';

import {
  Search,
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
        <IconButton onClick={() => findTicket(numberTicket)}>
          <Search />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default CheckTicket;