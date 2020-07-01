import React, { useEffect } from 'react';
import TodoListItem from './TodoListItem';
import NewTodoForm from './NewTodoForm';
import { connect } from 'react-redux';
import { loadTodos, removeTodoRequest, completeTodoRequest } from './thunks';
import { getTodosLoading, getCompleteTodos, getIncompleteTodos } from './selector';
import styled from 'styled-components';


const ListWrapper = styled.div`
  max-width: 700px;
  margin: auto;
`;

const TodoList = ({ completedTodos, incompletedTodos, onRemovePressed, onCompletePressed, isLoading, startLoadingTodos }) => {
  useEffect(() => {
    startLoadingTodos();
  }, [])
  const loadingMessage = <div>Loading todos...</div>;
  const content = (
    <ListWrapper>
      <NewTodoForm />
      <h3>Incomplete:</h3>
      {incompletedTodos.map(todo => <TodoListItem
        todo={todo}
        onRemovePressed={onRemovePressed}
        onCompletePressed={onCompletePressed} />
      )}
      <h3>Completed:</h3>
      {completedTodos.map(todo => <TodoListItem
        todo={todo}
        onRemovePressed={onRemovePressed}
        onCompletePressed={onCompletePressed} />
      )}
    </ListWrapper>
  );
  return isLoading ? loadingMessage : content;
};

const mapStateToProps = state => ({
  isLoading: getTodosLoading(state),
  completedTodos: getCompleteTodos(state),
  incompletedTodos: getIncompleteTodos(state)
})

const mapDispatchToProps = dispatch => ({
  onRemovePressed: id => dispatch(removeTodoRequest(id)),
  onCompletePressed: id => dispatch(completeTodoRequest(id)),
  startLoadingTodos: () => dispatch(loadTodos())
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);