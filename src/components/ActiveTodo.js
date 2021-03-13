import React from 'react';
import '../assets/scss/TodoItem.scss';
import Button from '../components/Button';

function AtiveTodo({ todo, setActiveTodo = () => {}, removeTodo = () => {} }) {
    return (
        <div>
            <div className="todo-item" style={{ background: '#fff' }}>
                <span className="todo-item__content">{'Actions'}</span>
                <div className="todo-item__actions">
                    <Button name="Done" type="done" onClick={setActiveTodo} />
                    <Button name="Remove" type="remove" onClick={removeTodo} />
                </div>
            </div>
        </div>
    );
}

export default AtiveTodo;
