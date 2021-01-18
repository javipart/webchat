import React, { useEffect, useState } from 'react';

import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';

import {
  Save
} from '@material-ui/icons';

const AddTicket = ({ users, setDataTicket, dataTicket, saveTicket, setShowModal }) => {
  const [userSelect, setUserSelect] = useState({});

  return (
    <>
      <DialogTitle>
        Crear Ticket
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Dligencia el formulario para crear un ticket
        </DialogContentText>
        <Select
          id={'userId'}
          value={userSelect.name}
          fullWidth
          onChange={(e) => {
            const user = users.filter(user => user['_id'] === e.target.value).shift();
            setUserSelect(user);
            setDataTicket({ ...dataTicket, userId: user['_id'] })
          }}
        >
          {users.map(user => (
            <MenuItem
              value={user['_id']}>
              {`${user.name} ${user.lastName}`}
            </MenuItem>
          ))}
        </Select>
        <TextField
          id={'details'}
          label={'Detalles'}
          value={dataTicket.details}
          onChange={(e) =>
            setDataTicket({ ...dataTicket, details: e.target.value })
          }
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowModal(false)}>
          Cancelar
        </Button>
        <Button onClick={saveTicket}>
          Guardar
        </Button>
      </DialogActions>
    </>
  );
}

export default AddTicket;
