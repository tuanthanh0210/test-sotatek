import React from 'react';
import '../assets/scss/component.scss';

const Input = ({
    title = 'Input',
    className = '',
    type = 'text',
    value = '',
    defaultValue = '',
    onChange = () => {},
    placeholder = 'Input text ...',
    disabled = false,
    readOnly = false,
}) => {
    return (
        <div className="base custom">
            <span className="base__title">{title}</span>
            <input
                className={`custom__input ${className}`}
                type={type}
                defaultValue={defaultValue}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
            />
        </div>
    );
};

export default Input;
