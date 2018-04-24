```jsx
import React from 'react';
import { Button } from 'styled-button-component';
import { Table, Tr } from 'styled-table-component';
import { Table as TableProvider } from 'react-table-kit';

const columns = [
  {
    header: '#',
    accessor: 'number',
  },
  {
    header: 'First',
    accessor: 'first',
  },
  {
    header: 'Last',
    accessor: 'last',
  },
  {
    header: 'Handle',
    accessor: 'handle',
  },
];

const data = [
  {
    number: 1,
    first: 'mark',
    last: 'otto',
    handle: '@mdo',
  },
  ...
]

export const myTable = (props) => (
  <TableProvider
    data={data}
    table={<Table hover bordered />}
    trBody={<Tr />}
    exportCSV={true}
    buttonExportCSV={<Button success value="Export CSV" />}
    columns={columns}
  />
);
```
