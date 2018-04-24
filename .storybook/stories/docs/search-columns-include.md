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
    search: 'includes',
  },
  {
    header: 'First',
    accessor: 'first',
    search: 'includes',
  },
  {
    header: 'Last',
    accessor: 'last',
    search: 'includes',
  },
  {
    header: 'Handle',
    accessor: 'handle',
    search: 'includes',
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
    table={<Table hover bordered style={{ textAlign: 'left' }} />}
    trBody={<Tr />}
    inputColumnSearch={<FormControl borderRadius="0" sm type="text" placeholder="Search column" />}
    columns={columns}
  />
);
```
