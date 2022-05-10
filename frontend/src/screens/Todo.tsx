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
  /* create state here */

  const updateTodoItem = useCallback(async () => {
    await axios.put(`${CONFIG.API_ENDPOINT}/todos/${props.id}`, {
      id: props.id,
      description: props.description,
      /* persist the state of the todo item */
    });
  }, [props.description, props.id]);

  useEffect(() => {
    /* mark the todo when done (as a dependency) changes */
  }, [props.description, updateTodoItem]);

  return (<>
    <tr>
      <td>{/* insert checkbox here */}</td>
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

  const populateTodos = useCallback(async () => {
    const result = await axios.get(`${CONFIG.API_ENDPOINT}/todos`);
    setTodoItems(result.data);
  }, []);

  const onRefreshClicked = useCallback(async () => {
    console.log('Refresh button clicked');
    /* refresh todos here */
  }, [populateTodos]);

  useEffect(() => {
    onRefreshClicked();
  }, [onRefreshClicked]);

  async function submitNewTodo() {
    /* validate todos here */
    const newTodo = {
      description: newTodoDescription,
    };
    await axios.post(`/api/todos`, newTodo);
    await populateTodos();
    setNewTodoDescription('');
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
                      {/* insert button here */}
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