import React, { Fragment, useState } from 'react';
import './Todo.css';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Modal,
  makeStyles,
  Input,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import db from './firebase';

//style for Modal
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'relative',
    width: 300,
    height: 300,
    backgroundColor: theme.palette.background.paper,
    border: '4px solid #fff',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Todo = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const updateTodo = () => {
    //update the todo with new Input
    setOpen(false);
    db.collection('todos').doc(props.text.id).set(
      {
        todo: input,
      },
      { merge: true } // merge: true will override the existing value
    );
  };
  return (
    <Fragment>
      <Modal open={open} onClose={handleClose}>
        <div className={classes.paper}>
          <Input
            placeholder={props.text.todo}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          ></Input>
          <div className='todo__modalbuttons'>
            <Button
              className='todo__button'
              color='secondary'
              variant='contained'
              onClick={updateTodo}
            >
              Update
            </Button>
            <Button
              className='todo__button'
              color='primary'
              variant='contained'
              onClick={(e) => {
                setOpen(false);
              }}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
      <List className='todo__list'>
        <ListItem className='todo__listitemtext'>
          <ListItemText primary={props.text.todo} />
          <Button color='primary' variant='contained' onClick={handleOpen}>
            Edit
          </Button>
          <Button
            onClick={(event) => {
              db.collection('todos').doc(props.text.id).delete();
            }}
          >
            <DeleteIcon></DeleteIcon>
          </Button>
        </ListItem>
      </List>
    </Fragment>
  );
};

export default Todo;
