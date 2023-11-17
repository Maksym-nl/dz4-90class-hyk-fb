import { useEffect, useState } from 'react';
import { Form } from './Form/Form';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';

export const App = () => {
  const [contacts, setContacts] = useState(getItems());
  const [filter, setFilter] = useState('');

  // export class App extends Component {
  //   state = {
  //     contacts: [
  //       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //     ],
  //     filter: '',
  //   };
  useEffect(() => {
    localStorage.setItem('id', JSON.stringify(contacts));
  }, [contacts]);
  //   componentDidUpdate(prevProps, prevState) {
  //     if (prevProps.contacts !== this.state.contacts) {
  //       localStorage.setItem('id', JSON.stringify(this.state.contacts));
  //     }
  //   }
  function getItems() {
    const savedContact = localStorage.getItem('id');
    if (savedContact !== null) {
      const contacts = JSON.parse(savedContact);
      return contacts;
    }
    return [];
  }
  //   componentDidMount() {
  //     const savedContact = localStorage.getItem('id');
  //     if (savedContact !== null) {
  //       this.setState({ contacts: JSON.parse(savedContact) });
  //     }
  //   }

  const addContact = data => {
    const newContact = { ...data, id: nanoid() };
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      alert(`${data.name} is Exist`);
      return;
    }

    //   addContact = ({ name, number }) => {
    //     const { contacts } = this.state;
    //     const isExist = contacts.find(contact => {
    //       return contact.name.toLowerCase() === name.toLowerCase();
    //     });
    //     if (isExist) {
    //       alert(`${name} is Exist`);
    //       return;
    //     }
    setContacts(prevState => [...prevState.contacts, newContact]);
  };
  console.log(setContacts);
  //     const newContact = { name, number, id: nanoid() };
  //     this.setState(prevState => ({
  //       contacts: [...prevState.contacts, newContact],
  //     }));
  //   };
  const deletContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };
  //   deletContact = contactId => {
  //     this.setState(prevState => ({
  //       contacts: prevState.contacts.filter(contact => {
  //         return contact.id !== contactId;
  //       }),
  //     }));

  const chanchFilter = e => {
    setFilter(e.currentTarget.value);
  };
  //   chanchFilter = e => {
  //     this.setState({ filter: e.currentTarget.value });

  //   // contactsFilter = this.state.contacts.filter(contact =>
  //   //   contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
  //   // );
  const contactsFilter = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  //   contactsFilter = () => {
  //     const { contacts, filter } = this.state;
  //     return contacts.filter(contact =>
  //       contact.name.toLowerCase().includes(filter.toLowerCase())
  //     );
  //   };
  //   render() {
  //     const { filter } = this.state;

  //     const filtredContacts = this.contactsFilter();
  return (
    <Layout>
      <Form addContact={addContact} />
      <Filter value={filter} onChange={chanchFilter} />
      <ContactList contacts={contactsFilter()} onDelete={deletContact} />
      <GlobalStyle />
    </Layout>
  );
};
