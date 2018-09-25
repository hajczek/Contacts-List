import React, { Component } from 'react'
import './css/App.css'
import ContactsList from './components/ContactsList.js'
import Panel from './components/Panel.js'
import orderBy from 'lodash/orderBy'
import * as EmailValidator from 'email-validator'

const direction = {
    asc: "desc",
    desc: "asc"
};

class App extends Component { 
    constructor (props){
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            button: true,
            info: '',
            email: '',
            name: '',
            columnToSort: '',
            sortDirection: 'asc'
        };
    }
    
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'get'
        })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json
                })
            }
        );
    }

    removeItem = item => {
        document.getElementById("info").removeAttribute('class')
        this.setState((state) => ({
            items: state.items.filter((i) => i.id !== item.id),
            info: ''
        }))
    }

    displayForm = () => {
        const itemsLength = this.state.items.length
        if (itemsLength < 10) {
            this.setState({
                button: false,
                info: '',
            })
        } else if (itemsLength >= 10) {
            document.getElementById("info").setAttribute("class", "error")
            this.setState({
                info: 'You can\'t add new user because of a limit.'
            })
        }
    }

    changeState = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

   displayReset = () => {
        const reset = document.getElementById('reset-field')
        const inputName = document.getElementById('name').value
        const inputEmail = document.getElementById('email').value        
        if(inputName !== '' || inputEmail !== '')
            reset.style.display = 'inline'
    }

    resetForm = () => {
        const reset = document.getElementById('reset-field')
        const form = document.getElementById('form')
        this.setState({
            button: false,
            name: '',
            email: ''
        })
        reset.style.display = 'none';
        form.reset();
    }

    sortItems = columnName => {
        this.setState(state => ({
            columnToSort: columnName,
            sortDirection: state.columnToSort === columnName ? direction[state.sortDirection] : 'desc'
        }))
    }

    createItem = item => {
        const items = this.state.items;
        const email = this.state.email;
        const emailOnList = items.some(v => v.email === email);
        const emailValid = EmailValidator.validate(email);
        const info = document.getElementById("info");
      
        if (items.length < 10 && !emailOnList && emailValid) {
            info.setAttribute("class", "correct")
            this.setState(state => ({
                button: true,
                items: state.items.concat([item]),
                info: '✔ You have successfully added an user.',
                name: '',
                email: ''
            }));
        } else if (!emailValid) {
            info.setAttribute("class", "error")
            this.setState(state => ({
                button: false,
                items: state.items,
                info: 'Invalid Email!',
                name: '',
                email: ''
          }));
        } else if (emailOnList) {
            info.setAttribute("class", "error")
            this.setState(state => ({
                button: false,
                items: state.items,
                info: 'This email exists!'
          }));
        }      
    }
    
    sendItem = (item) => {
        fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'post',
            body: JSON.stringify(item)
        }).then(function(response) {
            return response.json();
        }).then(function(item) {
            console.log('Item send')
        });
    }
    
    render() {
    
        const {isLoaded, items } = this.state;
      
        if(!isLoaded) {
            return<div>Loading ...</div>
        } else {      
            return (
                <main className="Container">
                    <h1>Contacts List</h1>
                    <section>
                        <div id="panel">
                            <Panel 
                                button={this.state.button}
                                info={this.state.info}
                                name={this.state.name}
                                email={this.state.email}
                                onDisplayForm={this.displayForm}
                                onDisplayReset={this.displayReset}
                                onResetForm={this.resetForm}
                                onCreateItem={(item) => {
                                    this.createItem(item)
                                }}
                                onChangeState={this.changeState}
                                onSendItem={this.sendItem}
                            />
                        </div>
                        <ContactsList
                            onDeleteItem={this.removeItem}
                            items={
                                orderBy(
                                    items, 
                                    this.state.columnToSort, 
                                    this.state.sortDirection
                                )
                            }
                            onSortItems={this.sortItems}
                        />
                    </section>
                </main>
            );
        }
    }
}
export default App;