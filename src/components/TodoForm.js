import React, { useState } from 'react';
import shortid from 'shortid';
import '../assets/scss/AddTodo.scss';
import Button from '../components/Button';
import DatePickerCustom from '../components/Datepicker';
import Input from '../components/Input';
import Select from '../components/Select';
import TextArea from '../components/TextArea';

const INIT_FORM = {
    todo: '',
    description: '',
    date: new Date(),
    piority: 'normal',
    checked: false,
};

const Layout = ({ children }) => (
    <div
        style={{
            margin: '10px 0',
            width: '100%',
        }}
    >
        {children}
    </div>
);

const TodoForm = ({
    type = '',
    title = 'New Add Todo',
    todo = {},
    getForm = () => {},
    getFormEdit = () => {},
    setIsOpen = () => {},
}) => {
    const [form, setForm] = useState(INIT_FORM);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type === 'add-todo' && (!form.description || !form.todo)) {
            alert('Insert Todo , plzzz !!!');
            return;
        }

        if (type === 'add-todo') {
            getForm({
                ...form,
                id: shortid.generate(),
            });
        } else {
            const newForm = { ...todo };
            for (let key in newForm) {
                newForm[key] = form[key] || todo[key];
            }
            getFormEdit(newForm);
        }

        setForm(INIT_FORM);
    };

    return (
        <form onSubmit={handleSubmit} className="add-todo">
            <Layout>
                <Input
                    title="Todo :"
                    type="text"
                    name="todo"
                    defaultValue={todo.todo}
                    value={form.todo}
                    onChange={(v) =>
                        setForm((form) => {
                            return { ...form, todo: v };
                        })
                    }
                />
            </Layout>
            <Layout>
                <TextArea
                    title="Description:"
                    value={form.description}
                    defaultValue={todo.description}
                    onChange={(v) =>
                        setForm((form) => {
                            return { ...form, description: v };
                        })
                    }
                />
            </Layout>

            <div className="add-todo__datepick">
                <Layout>
                    <div style={{ marginRight: 10 }}>
                        <DatePickerCustom
                            title="Due Date"
                            selected={
                                type === 'add-todo'
                                    ? form.date
                                    : new Date(todo.date)
                            }
                            onChange={(v) =>
                                setForm((form) => {
                                    return {
                                        ...form,
                                        date: v,
                                    };
                                })
                            }
                        />
                    </div>
                </Layout>
                <Layout>
                    <div style={{ marginLeft: 10 }}>
                        <Select
                            title="Piority"
                            value={todo.piority || form.piority}
                            onChange={(v) =>
                                setForm((form) => {
                                    return {
                                        ...form,
                                        piority: v,
                                    };
                                })
                            }
                            options={[
                                { value: 'low', label: 'Low' },
                                { value: 'normal', label: 'Normal' },
                                { value: 'high', label: 'High' },
                            ]}
                        />
                    </div>
                </Layout>
            </div>

            <Button
                name={type === 'add-todo' ? 'ADD' : 'UPDATE'}
                type="add"
                onClick={(e) => {
                    handleSubmit(e);
                    setIsOpen();
                }}
            />
        </form>
    );
};

export default TodoForm;
