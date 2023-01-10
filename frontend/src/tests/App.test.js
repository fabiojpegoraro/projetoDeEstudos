import {
  fireEvent,
  render,
  screen,
  waitFor,
  cleanup,
} from '@testing-library/react';
import nock from 'nock';
import { act } from 'react-dom/test-utils';
import App from '../App';
import ClientForm from '../components/ClientForm/ClientForm';
import List from '../components/List/List';

const setup = (testClients) => {
  const clients = testClients || [
    {
      name: 'Teste1',
      idade: '1',
      id: 1,
    },
    {
      name: 'Teste2',
      idade: '2',
      id: 2,
    },
  ];
  nock('http://localhost:3000')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
    })
    .get('/clients')
    .reply(200, clients);

  render(
    <App>
      <List />
    </App>
  );
};

afterEach(() => {
  nock.isDone();
  nock.cleanAll();
  cleanup();
});

test('should render clients table component', async () => {
  setup();

  await waitFor(() => {
    const tableList = screen.getByTestId('clientsTableList');
    expect(tableList).toBeInTheDocument();
    const newClientButton = screen.getByTestId('newClientButton');
    expect(newClientButton).toBeInTheDocument();
  });
});

test('should render clients table list', async () => {
  setup();

  await waitFor(() => {
    const client1 = screen.queryByText('Teste1');
    expect(client1).toBeInTheDocument();
    const client2 = screen.queryByText('Teste2');
    expect(client2).toBeInTheDocument();
  });
});

test('should render new client form on click button', async () => {
  setup();

  await waitFor(() => {
    expect(screen.getByTestId('newClientButton')).toBeInTheDocument();
  });

  await act(() => {
    fireEvent.click(screen.getByTestId('newClientButton'));
  });

  await waitFor(() => {
    const inputName = screen.getByTestId('inputName');
    const inputIdade = screen.getByTestId('inputIdade');
    expect(inputName).toBeInTheDocument();
    expect(inputIdade).toBeInTheDocument();
  });

  nock('http://localhost:3000')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
    })
    .get('/clients')
    .reply(200, []);

  await act(() => {
    fireEvent.click(screen.getByTestId('listClientButton'));
  });
});

test('should call edit client function', async () => {
  const client = [
    {
      name: 'Teste1',
      idade: '1',
      id: 1,
    },
  ];

  setup(client);

  await waitFor(() => {
    const client1 = screen.queryByText('Teste1');
    expect(client1).toBeInTheDocument();
    const editButton = screen.getByTestId('editButton');
    expect(editButton).toBeInTheDocument();
  });

  nock('http://localhost:3000')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
    })
    .get('/clients/1')
    .reply(200, client[0]);

  await act(() => {
    const editButton = screen.getByTestId('editButton');
    fireEvent.click(editButton);
  });

  await waitFor(() => {
    expect(screen.getByTestId('inputName')).toHaveValue('Teste1');
    expect(screen.getByTestId('inputIdade')).toHaveValue('1');
  });

  nock('http://localhost:3000')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
    })
    .put('/clients/1')
    .reply(200);

  const inputName = screen.getByTestId('inputName');
  fireEvent.change(inputName, { target: { value: 'Teste2' } });
  const inputIdade = screen.getByTestId('inputIdade');
  fireEvent.change(inputIdade, { target: { value: 10 } });

  const saveButton = screen.getByTestId('buttonSave');
  fireEvent.click(saveButton);

  nock('http://localhost:3000')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
    })
    .get('/clients')
    .reply(200, []);

  await act(() => {
    fireEvent.click(screen.getByTestId('listClientButton'));
  });
});

test('should call delete client function', async () => {
  const client = [
    {
      name: 'Teste1',
      idade: '1',
      id: 1,
    },
  ];

  setup(client);

  await waitFor(() => {
    const client1 = screen.queryByText('Teste1');
    expect(client1).toBeInTheDocument();
    const deleteButton = screen.getByTestId('deleteButton');
    expect(deleteButton).toBeInTheDocument();
  });

  nock('http://localhost:3000')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
    })
    .intercept('/clients/1', 'OPTIONS')
    .reply(200)
    .delete('/clients/1')
    .reply(200);

  await act(() => {
    const deleteButton = screen.getByTestId('deleteButton');
    fireEvent.click(deleteButton);
  });

  nock('http://localhost:3000')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
    })
    .get('/clients')
    .reply(200, []);

  await waitFor(() => {
    const client1 = screen.queryByText('Teste1');
    expect(client1).not.toBeInTheDocument();
  });
});

test('should render empty client form and shouldnt save', async () => {
  setup();

  await waitFor(() => {
    expect(screen.getByTestId('newClientButton')).toBeInTheDocument();
  });

  await act(() => {
    fireEvent.click(screen.getByTestId('newClientButton'));
  });

  const saveButton = screen.getByTestId('buttonSave');
  fireEvent.click(saveButton);
});

test('should render empty client form and save', async () => {
  setup();

  const inputName = screen.getByTestId('inputName');
  fireEvent.change(inputName, { target: { value: 'Teste2' } });
  const inputIdade = screen.getByTestId('inputIdade');
  fireEvent.change(inputIdade, { target: { value: 10 } });

  const saveButton = screen.getByTestId('buttonSave');
  fireEvent.click(saveButton);
});
