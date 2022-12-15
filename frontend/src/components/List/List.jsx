import React from 'react';
import './style.css';

const List = () => {
  return (
    <>
      <div className="newClientDivButton">
        <button className="newClientButton">Novo Cliente</button>
      </div>
      <table className="table">
        <thead className="tableHead">
          <tr>
            <th className="firtsCell">Código</th>
            <th>Nome</th>
            <th>Idade</th>
            <th className="secondCell">Ações</th>
          </tr>
        </thead>
        <tbody className="tableBody">
          <tr>
            <td className="thirdCell">123</td>
            <td>Fábio</td>
            <td>36</td>
            <td className="fourthCell">
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default List;
