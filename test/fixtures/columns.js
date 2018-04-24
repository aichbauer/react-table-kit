export const simpleColumns = [
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

export const noHeaderColumns = [
  {
    accessor: 'number',
  },
  {
    accessor: 'first',
  },
  {
    accessor: 'last',
  },
  {
    accessor: 'handle',
  },
];

export const sortSearchColumns = [
  {
    header: '#',
    accessor: 'number',
    sort: true,
    search: 'includes',
  },
  {
    header: 'First',
    accessor: 'first',
    sort: true,
    search: 'exact',
  },
  {
    header: 'Last',
    accessor: 'last',
    sort: true,
    search: 'includes',
  },
  {
    header: 'Handle',
    accessor: 'handle',
    sort: false,
    search: 'exact',
  },
];
