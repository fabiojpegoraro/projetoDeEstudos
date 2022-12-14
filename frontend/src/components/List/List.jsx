import React from 'react';
import './style.css';

const List = () => {
  return (
    <table className="table">
      <thead className="tableHead">
        <tr>
          <th>Código</th>
          <th>Nome</th>
          <th>Idade</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody className="tableBody">
        <tr>
          <td>123</td>
          <td>Fábio</td>
          <td>36</td>
          <td>
            <button>Edit</button>
            <button>Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default List;
