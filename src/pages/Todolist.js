/* eslint-disable no-use-before-define */
import React, { useRef, useState } from 'react';
import ActiveTodo from '../components/ActiveTodo';
import Input from '../components/Input';
import { getData, setData } from '../helpers/index';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';

function Todolist() {
    const [search, setSearch] = useState('');
    const [todolist, setTodoList] = useState(getData());
    const [idActiveTodo, setIdActiveTodo] = useState([]);
    const idTimeout = useRef(null);

    const activeTodo = (todo) => {
        if (todo.checked) {
            if (!idActiveTodo.includes(todo.id)) {
                setIdActiveTodo(idActiveTodo.concat(todo.id));
            } else {
                setIdActiveTodo(idActiveTodo);
            }
        } else {
            setIdActiveTodo(idActiveTodo.filter((item) => item !== todo.id));
        }
        const index = todolist.findIndex((item) => item.id === todo.id);

        todolist.splice(index, 1, todo);
        setTodoList((todolist) => [...todolist]);
    };

    const setActiveTodo = () => {
        setData(todolist);
        alert('Done !');
    };

    const updateTodo = (todo) => {
        console.log(todo, 'update');
        const index = todolist.findIndex((item) => item.id === todo.id);

        todolist.splice(index, 1, todo);
        setTodoList((todolist) => [...todolist]);
        setData(todolist);
    };

    const removeTodo = (todo) => {
        console.log(todo);
        const newList = todolist.filter((item) => item.id !== todo.id);
        setIdActiveTodo(idActiveTodo.filter((item) => item !== todo.id));
        setTodoList(newList);
        setData(newList);
    };

    const deleteTodos = () => {
        const newList = todolist.filter(
            (item) => !idActiveTodo.includes(item.id)
        );
        setTodoList(newList);
        setData(newList);
    };

    return (
        <div style={{ position: 'relative', padding: 24, height: '100%' }}>
            <h3>Todo List</h3>

            <div style={{ textAlign: 'right' }}>
                <AddTodo
                    getTodo={(todo) => {
                        setData([...getData(), todo]);
                        setTodoList((todolist) => [...todolist, todo]);
                    }}
                />
            </div>
            <div style={{ display: 'flex', maxHeight: '36px' }}>
                <Input
                    title=""
                    placeholder="Search..."
                    onChange={(e) => {
                        clearTimeout(idTimeout);
                        setSearch(e);
                        idTimeout.current = setTimeout(() => {
                            setTodoList(
                                getData().filter(
                                    (todo) => todo.todo.indexOf(e) !== -1
                                )
                            );
                        }, 500);
                    }}
                    value={search}
                />
            </div>
            {!!todolist.length &&
                todolist.map((todo) => (
                    <div key={todo.id}>
                        <TodoItem
                            todo={todo}
                            activeTodo={(todo) => activeTodo(todo)}
                            updateTodo={(todo) => updateTodo(todo)}
                            removeTodo={(todo) => removeTodo(todo)}
                        />
                        {!!idActiveTodo.length && (
                            <div
                                style={{
                                    position: 'fixed',
                                    bottom: 0,
                                    left: 0,
                                    width: '100%',
                                }}
                            >
                                <ActiveTodo
                                    todo={todo}
                                    setActiveTodo={setActiveTodo}
                                    removeTodo={deleteTodos}
                                />
                            </div>
                        )}
                    </div>
                ))}
        </div>
    );
}

export default Todolist;
