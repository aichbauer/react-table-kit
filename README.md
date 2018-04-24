# react-table-kit

[![npm](https://img.shields.io/npm/v/react-table-kit.svg?style=flat-square)](https://www.npmjs.com/package/react-table-kit)
[![Travis branch](https://img.shields.io/travis/aichbauer/react-table-kit/master.svg?style=flat-square)](https://travis-ci.org/aichbauer/react-table-kit)
[![Codecov branch](https://img.shields.io/codecov/c/github/aichbauer/react-table-kit/master.svg?style=flat-square)](https://codecov.io/gh/aichbauer/react-table-kit)
[![storybook](https://img.shields.io/badge/docs%20with-storybook-f1618c.svg?style=flat-square)](https://aichbauer.github.io/react-table-kit)

> A react table component with custom components support and functionality to sort, search, export data, ...

## Table of Contents

* [Documentation](https://aichbauer.github.io/react-table-kit)
* [Why?](#why)
* [Installation](#installation)
* [Components](#components)
* [Usage](#usage)
* [License](#license)

## Why?

Every react table component I found was using its own styling but you couldn't use it with a `css-in-js` library. I wanted to use my own components to style the table without relying on `className` and `css files`. So this library has most of the functionality of the common table components like [react-table]() or [react-bootstrap-table]() but without styling and leaving the option to pass your own components where the styling is up to you. Want to use plain `CSS`, or a `css-in-js library`, no problem, its up to you.

## Installation

```sh
$ npm i react-table-kit -S
```

or

```sh
$ yarn add react-table-kit
```

## Components

Take a look into the [usage section](#usage) for a detailed example.

### Table

> Note: you can also use the default export.

This component renders a table wich has a lot of different functionality.

**Functionality**:

* **custom components**: pass you own components
* **sort** the table by columns
* **search** the table **columns**
  * this column includes the searchphrase
  * this column is exactly the searchphrase
* **search** the complete **table**
  * some column includes the searchphrase
  * some column is exactly the searchphrase
* **clickable cells**
* **clickable rows**
* **download** the table content as **CSV** formatted file

#### Syntax

Render a table.

```js
const myTable = (props) => (
  <Table
    buttonExportCSV={...}
    columns={...}
    data={...}
    exportCSV={...}
    inputColumnSearch={...}
    inputTableSearch={...}
    onClickCell={...}
    onClickRow={...}
    table={...}
    tableSearch={...}
    td={...}
    th={...}
    trBody={...}
    trHead={...}
  />
);
```

#### Props

* **buttonExportCSV**
  * **Type**: element
  * **Default**: `<button value="Export CSV" />`
* **columns**
  * **Type**: array of objects - `required`
  * **Default**: `[]`
* **data**
  * **Type**: array of objects - `required`
  * **Default**: `[]`
* **exportCSV**
  * **Type**: boolean
  * **Default**: `false`
* **inputColumnSearch**
  * **Type**: element
  * **Default**: `<input type="text" placeholder="Search column" />`
* **inputTableSearch**
  * **Type**: element
  * **Default**: `<input type="text" placeholder="Search table" />`
* **noDataMessage**
  * **Type**: string
  * **Default**: `'No data found'`
* **onClickCell**
  * **Type**: function
  * **Default**: `(item) => item;`
* **onClickRow**
  * **Type**: function
  * **Default**: `(item) => item;`
* **table**
  * **Type**: element
  * **Default**: `<table />`
* **tableSearch**
  * **Type**: string
  * **Default**: `''`
* **td**
  * **Type**: element
  * **Default**: `<td />`
* **th**
  * **Type**: element
  * **Default**: `<th />`
* **trBody**
  * **Type**: element
  * **Default**: `<tr />`
* **trHead**
  * **Type**: element
  * **Default**: `<tr />`

##### Required Props

You need at least data and columns to render a table.

###### data

`data` is an array of objects.

* each object represents one row
  * each entry in the object represents one cell in the table
  * each object has the same keys
  * each key represents a column name

An example of `data`.

```js
const data = [
  {
    number: 1,
    first: 'Mark',
    last: 'Otto',
    handle: '@mdo',
  },
  ...
];
```

###### columns

`columns` is an array of objects.

* each object holds at least two keys
  * **header**: the name of the column
  * **accessor**: the way to access the value in the data object
* can be extended by two optional keys
  * **sort**: boolean
  * **search**: `includes` or `exact`

An example of `columns`.

```js
const columns = [
  {
    header: '#',
    accessor: 'number',
    search: 'exact',
    sort: true,
  },
  {
    header: 'First',
    accessor: 'first',
    search: 'exact',
    sort: true,
  },
  {
    header: 'Last',
    accessor: 'last',
    search: 'exact',
    sort: true,
  },
  {
    header: 'Handle',
    accessor: 'handle',
    search: 'exact',
    sort: true,
  },
];
```

## Usage

An example how to use it. For more detailed information you can take a look at the [documentation](https://aichbauer.github.io/react-table-kit).

```jsx
import React from 'react';
import { Table } from 'react-table-kit';

// use your own components
import { Button } from 'styled-button-component';
import { FormControl } from 'styled-form-component';
import { Table as T, Tr } from 'styled-table-component';

const columns = [
  {
    header: '#',
    accessor: 'number',
    search: 'exact',
    sort: true,
  },
  {
    header: 'First',
    accessor: 'first',
    search: 'exact',
    sort: true,
  },
  {
    header: 'Last',
    accessor: 'last',
    search: 'exact',
    sort: true,
  },
  {
    header: 'Handle',
    accessor: 'handle',
    search: 'exact',
    sort: true,
  },
];

export const data = [
  {
    number: 1,
    first: 'mark',
    last: 'otto',
    handle: '@mdo',
  },
  ...
]

export const myTable = (props) => (
  <Table
    buttonExportCSV={<Button success value="Export CSV" />}
    columns={columns}
    data={data}
    exportCSV={true}
    inputColumnSearch={<FormControl borderRadius="0" sm type="text" placeholder="Search column" />}
    inputTableSearch={<FormControl borderRadius="0" sm type="text" placeholder="Search table" />}
    onClickCell={(item) => alert(`"cellValue": "${item}"`)}
    onClickRow={(item) => alert(`"rowValue": ${JSON.stringify(item, null, 2)};`)}
    table={<T hover bordered />}
    tableSearch="exact"
    trBody={<Tr />}
  />
);
```

## License

MIT © Lukas Aichbauer
