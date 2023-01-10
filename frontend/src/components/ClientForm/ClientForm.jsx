import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../Layout/Layout';
import InputForm from '../InputForm/InputForm';
import './style.css';
import { useEffect } from 'react';

const ClientForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/clients/${id}`)
        .then((response) => response.json())
        .then((json) => {
          const { name, idade } = json;
          setName(name);
          setAge(idade);
        });
    }
  }, [id]);

  const saveClient = () => {
    if (name === '' || age === '') {
      return;
    }
    const URL = id
      ? `http://localhost:3000/clients/${id}`
      : 'http://localhost:3000/clients';
    const method = id ? 'PUT' : 'POST';

    console.log(URL, method);

    fetch(URL, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        idade: age,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          window.alert('Cliente alterado com sucesso');
        }
        if (response.status === 201) {
          window.alert('Cliente cadastrado com sucesso');
        }
      })
      .catch((error) => {
        window.alert(error.message);
      });
  };

  const handleClick = () => {
    navigate('/');
  };

  return (
    <Layout>
      <div className="listClientDivButton">
        <button
          data-testid="listClientButton"
          className="listClientButton"
          onClick={handleClick}
        >
          Lista de Clientes
        </button>
      </div>
      <div className="divForm">
        <form className="form">
          <InputForm
            labelText="Nome"
            inputValue={name}
            dataTestId="inputName"
            setAction={(e) => setName(e.target.value)}
          />
          <InputForm
            labelText="Idade"
            inputValue={age}
            dataTestId="inputIdade"
            setAction={(e) => setAge(e.target.value)}
          />
          <div className="buttonsForm">
            <button
              data-testid="buttonSave"
              className="buttonSave"
              onClick={saveClient}
            >
              Salvar
            </button>
            <button className="buttonCancel" onClick={handleClick}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ClientForm;
