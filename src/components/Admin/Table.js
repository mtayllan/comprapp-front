import React from 'react';
import MUIDataTable from 'mui-datatables';
import { PropTypes } from 'prop-types';

const Table = (props) => {
  const columns = [
    'id',
    'name',
    'email',
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
