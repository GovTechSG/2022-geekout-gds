import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

import {
  Container,
  Row,
  Col,
  Section,
  Button,
} from 'sgds-govtech-react';

import CONFIG from '../config';
import Table from '../components/Table';

export type TodoItemProps = {
  id: string,
  description: string,
  done: boolean,
};

function TodoItem(props: TodoItemProps) {
  const [done, setDone] = useState(props.done);

  const updateTodoItem = useCallback(async () => {
    await axios.put(`${CONFIG.API_ENDPOINT}/todos/${props.id}`, {
      id: props.id,
      description: props.description,
      done: done,
    });
  }, [props.description, props.id, done]);

  useEffect(() => {
    /* mark the todo when done (as a dependency) changes */
    console.log(props.description, 'is marked as ', done ? 'done' : 'undone');
    updateTodoItem();
  }, [props.description, done, updateTodoItem]);

  return (<>
    <tr>
      <td>{<input type="checkbox" checked={done} onChange={(event) => setDone(event.currentTarget.checked)}></input>}</td>
      <td width={'100%'}>{props.description}</td>
    </tr>
  </>
  );
}

interface TodoProps {

}

function Todo(props: TodoProps) {
  const [todoItems, setTodoItems] = useState<{ [id: string]: TodoItemProps }>({});
  const [newTodoDescription, setNewTodoDescription] = useState('');

  const [isRefresh, setIsRefresh] = useState(false);
  const populateTodos = useCallback(async () => {
    const result = await axios.get(`${CONFIG.API_ENDPOINT}/todos`);
    setTodoItems(result.data);
  }, []);

  const onRefreshClicked = useCallback(async () => {
    setIsRefresh(true);
    setTimeout(async () => {
      await populateTodos();
      setIsRefresh(false);
    }, 400);
  }, [populateTodos]);

  useEffect(() => {
    onRefreshClicked();
  }, [onRefreshClicked]);

   async function submitNewTodo() {
    if (newTodoDescription.trim() !== '') {
      const newTodo = {
        description: newTodoDescription,
      };
      await axios.post(`/api/todos`, newTodo);
      await populateTodos();
      setNewTodoDescription('');
    } else {
      alert('Invalid Todo input!');
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <Section className='has-background-gradient'>
            <h3>Todo App</h3>
          </Section>
          <Section isSmall>
            <form action='#' onSubmit={(event) => {
              submitNewTodo();
              event?.preventDefault();
            }}>
              <div className='field'>
                <label className="label" htmlFor="newTodoDescription">New todo: </label>
                <div className='control'>
                  <Row>
                    <Col is={10}>
                      <input className="input" id='newTodoDescription' type='text' value={newTodoDescription}
                        onChange={(event) => { setNewTodoDescription(event.currentTarget.value) }} />
                    </Col>
                    <Col>
                      <Button isPrimary isLoading={false}>Submit</Button>
                    </Col>
                    <Col>
                      <Button type="button" isOutline isLoading={isRefresh} onClick={onRefreshClicked}>
                        <span className='sgds-icon sgds-icon-refresh' />
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </form>
          </Section>
          <Section isSmall>
            <Table isFullwidth isHoverable isHorizontal isBordered>
              <thead><tr><th>Done</th><th>Description</th></tr></thead>
              <tbody>
                {
                  Object.keys(todoItems).map((item) => (<TodoItem key={todoItems[item].id} {...todoItems[item]} />))
                }
              </tbody>
            </Table>
          </Section>
        </Col>
      </Row>
    </Container>
  );
}

export default Todo;