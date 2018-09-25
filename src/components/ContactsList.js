import React, {Component} from 'react'
import PropTypes from 'prop-types'

class ContactsList extends Component {

    static propTypes = {
        items: PropTypes.array.isRequired,
        onDeleteItem: PropTypes.func.isRequired,
        onSortItems: PropTypes.func.isRequired
    }

    render() {
        const { items, onDeleteItem, onSortItems } = this.props

        return ( 
            <table>            
                <thead>
                    <tr key='tr-1'>
                        <th id="lp-title">L.P.</th>
                        <th id="name-title">
                            <span id="user-title" onClick={() => onSortItems('name')}>USER</span>
                        </th>
                        <th id="email-title">
                            <span id="email-title" onClick={() => onSortItems('email')}>E-MAIL</span>
                        </th>
                        <th id="delete-title">
                            <span>Delete</span>
                        </th>
                    </tr>
                </thead>
                <tbody>          
            {items.map((item, index) => (            
                    <tr key={index}>
                        <td key={item.id} id="lp-td">{index+1}</td>
                        <td key={item.name} id="name-td">{item.name}</td>
                        <td key={item.email} id="email-td">{item.email}</td> 
                        <td id="delete-td">
                            <span onClick={() => onDeleteItem(item)} className="contact-remove">x</span>
                        </td>
                    </tr>                   
                ))}
                 </tbody>
            </table>
        )
    }
}
 
export default ContactsList;