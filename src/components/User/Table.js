import React from 'react';
import MUIDataTable from 'mui-datatables';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { PropTypes } from 'prop-types';
import ConfirmBtn from '../Buttons/ConfirmBtn';

const Table = (props) => {
  const { edit, del } = props;

  const columns = [
    {
      name: 'id',
      label: '#',
    },
    {
      name: 'name',
      label: 'Nome',
    },
    {
      name: 'email',
      label: 'Email',
    },
    {
      name: 'roles',
      label: 'Cargos',
      options: {
        customBodyRender: (value) => (
          <div>
            {value.map((role) => role.name).join(', ')}
          </div>
        ),
      },
    },
    {
      name: 'id',
      label: ' ',
      options: {
        customBodyRender: (value) => (
          <>
            <Button onClick={() => edit(value)}>Editar</Button>
            <ConfirmBtn confirm={() => del(value)}>Remover</ConfirmBtn>
          </>
        ),
      },
    },
  ];

  const options = {
    print: false,
    download: false,
    viewColumns: false,
    filter: false,
    selectableRows: 'none',
  };

  const { data } = props;
  return (
    <MUIDataTable
      title="Lista de Admistradores"
      data={data}
      columns={columns}
      options={options}
    />
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  edit: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired,
};

export default Table;
