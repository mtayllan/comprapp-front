import React from 'react';
import MUIDataTable from 'mui-datatables';
import { PropTypes } from 'prop-types';

const Table = (props) => {
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
};

export default Table;
