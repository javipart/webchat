import React, { useEffect, useState } from 'react';

import {
  Button,
  Grid,
  TextField,
} from '@material-ui/core';

import {
  Send
} from '@material-ui/icons';

const Form = ({ form, handleForm, saveForm }) => {


  return (
    <Grid
      container
      spacing={2}
    >
      <Grid
        item xs={12}
        sm container
      >
        <Grid item container direction='column' spacing={2}>
          <Grid item xs>
            <TextField
              id={'name'}
              label={'Nombre'}
              value={form.name}
              onChange={handleForm}
              fullWidth
            />
            <Grid item xs>
              <TextField
                id={'lastName'}
                label={'Apellido'}
                value={form.lastName}
                onChange={handleForm}
                fullWidth
              />
            </Grid>
            <Grid item xs>
              <TextField
                id={'id'}
                label={'Documento'}
                value={form.id}
                onChange={handleForm}
                fullWidth
              />
            </Grid>
            <Grid item xs>
              <TextField
                id={'phone'}
                label={'Celular'}
                value={form.phone}
                onChange={handleForm}
                fullWidth
              />
            </Grid>
            <Grid item xs style={{ textAlign: 'right' }}>
              <Button
                endIcon={<Send />}
                color="primary"
                onClick={saveForm}
              >
                Iniciar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Form;