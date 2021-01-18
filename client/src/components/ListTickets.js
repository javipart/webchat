import React from 'react';

import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TableCell,
  TableHead,
  TableRow,
  Table,
  TableBody,
} from '@material-ui/core';

import {
  Check,
  Close,
} from '@material-ui/icons';

const ListTickets = ({ agent, allTickets, updateTicket, setShowListModal }) => {
  const titles = ['ID', 'Cliente', 'Acciones'];

  return (
    <>
      <DialogTitle>
        Listado de Tickets
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Administración de Tickets
        </DialogContentText>
        <Table>
          <TableHead>
            <TableRow>
              {titles.map(title => (
                <TableCell>
                  {title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {allTickets.map(ticket => (
              <TableRow>
                <TableCell>
                  {ticket['_id']}
                </TableCell>
                <TableCell>
                  {ticket.userId}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => updateTicket({
                    id: ticket['_id'],
                    status: 'resolved',
                    userUpdate: agent['_id'],
                  })}>
                    <Check />
                  </IconButton>
                  <IconButton onClick={() => updateTicket({
                    id: ticket['_id'],
                    status: 'closed',
                    userUpdate: agent['_id'],
                  })}>
                    <Close />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowListModal(false)}>
          Aceptar
        </Button>
      </DialogActions>
    </>
  );
}

export default ListTickets;
