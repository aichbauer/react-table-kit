```jsx
import React from 'react';
import { Button } from 'styled-button-component';
import { FormControl } from 'styled-form-component';
import { Table, Tr } from 'styled-table-component';
import { Table as TableProvider } from 'react-table-kit';

const columns = [
  {
    header: '#',
    accessor: 'number',
    sort: true,
  },
  {
    header: 'First',
    accessor: 'first',
    sort: true,
  },
  {
    header: 'Last',
    accessor: 'last',
    sort: true,
  },
  {
    header: 'Handle',
    accessor: 'handle',
    sort: true,
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
    columns={columns}
  />
);
```
