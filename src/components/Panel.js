import React, { Component } from 'react';
import PropTypes from 'prop-types'
import serializeForm from 'form-serialize'

class Panel extends Component {

    static propTypes = {
        button: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        info: PropTypes.string.isRequired,
        onDisplayReset: PropTypes.func.isRequired,
        onDisplayForm: PropTypes.func.isRequired,
        onResetForm: PropTypes.func.isRequired,
        onChangeState: PropTypes.func.isRequired,
        onSendItem: PropTypes.func.isRequired
    }

    handleSubmit = e => {
        e.preventDefault()
        const values = serializeForm(e.target, {hash: true})
        const { onCreateItem } = this.props
        if(onCreateItem)
            onCreateItem(values)
    }

    render() {
        
        const {
            button, 
            info, 
            name, 
            email,
            onDisplayForm, 
            onDisplayReset, 
            onChangeState, 
            onResetForm,
            onSendItem
        } = this.props;

        if(button === true){
            return (
                <div>
                    <button onClick={() => onDisplayForm()} id="add-user">
                        <span>+</span>
                        Add user
                    </button>
                    <span id="info">{info}</span>
                </div>
            )
        }
        else {
            return (
                <form onSubmit={this.handleSubmit} id="form">
                    <input id="name" 
                        type="text" 
                        onInput={() => onDisplayReset()}
                        defaultValue={name}
                        onChange={e => onChangeState(e)}
                        name="name"
                        placeholder="Name ..."
                        maxLength="20"
                        minLength="2"
                        autoFocus
                    />
                    <input id="email" 
                        type="text" 
                        onInput={() => onDisplayReset()} 
                        defaultValue={email}
                        name="email"
                        onChange={e => onChangeState(e)}
                        placeholder="Email ..."
                    />
                    <button id="submit" onClick={() => onSendItem()}>Submit</button>
                    <span id="reset-field" onClick={() => onResetForm()}>
                        Reset field
                    </span>
                    <span id="info">{info}</span>
                </form>
            );
        }
    }
}
  
export default Panel;