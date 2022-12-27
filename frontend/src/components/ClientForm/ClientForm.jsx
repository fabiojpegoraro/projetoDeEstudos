import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout';
import InputForm from '../InputForm/InputForm';
import './style.css';

const ClientForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const saveClient = () => {
    if (name === '' || age === '') {
      return;
    }
    fetch('http://localhost:3000/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        idade: age,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          window.alert('Cliente incluído com sucesso!');
        }
      })
      .catch((error) => {
        window.alert(error.message);
      });
  };

  return (
    <Layout>
      <div className="listClientDivButton">
        <Link to="/">
          <button className="listClientButton">Lista de Clientes</button>
        </Link>
      </div>
      <div className="divForm">
        <form className="form">
          <InputForm
            labelText="Nome"
            inputValue={name}
            setAction={(e) => setName(e.target.value)}
          />
          <InputForm
            labelText="Idade"
            inputValue={age}
            setAction={(e) => setAge(e.target.value)}
          />
          <div className="buttonsForm">
            <button className="buttonSave" onClick={() => saveClient()}>
              Salvar
            </button>
            <button className="buttonCancel">Cancelar</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ClientForm;
