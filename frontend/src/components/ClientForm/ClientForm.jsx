import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout';
import './style.css';

const ClientForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const saveClient = () => {
    fetch('http://localhost:3000/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        idade: age,
      }),
    }).then((response) => {
      if (response.status === 201) {
        window.alert('Cliente incluído com sucesso!');
      }
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
          <div className="componentForm">
            <label>Nome</label>
            <input
              type="text"
              className="inputForm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="componentForm">
            <label>Idade</label>
            <input
              type="text"
              className="inputForm"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
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
