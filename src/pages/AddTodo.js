import React from 'react';
import Modal from 'react-modal';
import '../assets/scss/AddTodo.scss';
import TodoForm from '../components/TodoForm';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
    },
};

const AddTodo = ({ title = 'New Add Todo', getTodo = () => {} }) => {
    const handleSubmit = (form) => {
        console.log(form, 'dsadsadasdsa');
        getTodo(form);
    };
    const [modalIsOpen, setIsOpen] = React.useState(false);
    return (
        <div>
            <button className="button add" onClick={() => setIsOpen(true)}>
                Add Todo
            </button>
            <Modal
                ariaHideApp={false}
                style={customStyles}
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                contentLabel="Example Modal"
            >
                <h3 style={{ textAlign: 'center' }}>{title}</h3>

                <TodoForm
                    type="add-todo"
                    getForm={(form) => handleSubmit(form)}
                    setIsOpen={() => setIsOpen(false)}
                />
            </Modal>
        </div>
    );
};

export default AddTodo;
