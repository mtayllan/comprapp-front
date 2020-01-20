import React from 'react';
import MUIDataTable from 'mui-datatables';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { PropTypes } from 'prop-types';

const Table = (props) => {
  const { edit } = props;

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
          <ButtonGroup size="small" aria-label="small outlined button group">
            <Button onClick={() => edit(value)}>Editar</Button>
            <Button>Remover</Button>
          </ButtonGroup>
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
};

export default Table;
