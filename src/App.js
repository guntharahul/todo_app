import './App.css';
import { React, useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // when the app loads, we need to listen to the database and fetch new todos as they get added/removed

  useEffect(() => {
    // This is fired when the application is loaded or if any of the dependency is changed (input)
    db.collection('todos')
      .orderBy('timestamp', 'desc') // default orderBy is using DocumentId
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addTodo = (event) => {
    // this function is called when we click a button
    event.preventDefault(); // will stop the page refresh
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // setTodos([...todos, input]); without firebase
    setInput(''); // clear the input after adding the input data
  };

  return (
    <div>
      <div>
        <h2>A To-Do Application built on ReactJS and Firebase </h2>
      </div>
      <form>
        {/* <input value={input} onChange={(e) => setInput(e.target.value)}></input> */}

        <FormControl>
          <InputLabel>Enter a To-Do </InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          ></Input>
        </FormControl>
        <Button
          disabled={!input}
          type='submit'
          variant='contained'
          color='primary'
          onClick={addTodo}
        >
          Add Todo
        </Button>

        {/* <button type='submit' onClick={addTodo}>
          Todo
        </button> */}

        <ul style={{ paddingLeft: '00px' }}>
          {todos.map((todo) => (
            <Todo key={todo.id} text={todo}></Todo>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
