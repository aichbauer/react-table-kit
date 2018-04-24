import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withReadme,
  withDocs,
} from 'storybook-readme';

import { Button } from 'styled-button-component';
import { Table, Tr } from 'styled-table-component';
import { FormControl } from 'styled-form-component';

import TableComponent, { Table as TableProvider } from '../../src';
import { data, dataOneHundred } from './helpers/data';
import {
  searchColumnsExact,
  searchColumnsInclude,
  simpleColumns,
  sortColumns,
} from './helpers/columns';

import Readme from '../../README.md'

import customComponentsDocs from './docs/custom-components.md';
import exportCSVDocs from './docs/export-csv.md';
import onClickCellDocs from './docs/onClick-cell.md';
import onClickRowDocs from './docs/onClick-row.md';
import searchColumnsExactDocs from './docs/search-columns-exact.md';
import searchColumnsIncludeDocs from './docs/search-columns-include.md';
import searchTableExactDocs from './docs/search-table-exact.md';
import searchTableIncludesDocs from './docs/search-table-includes.md';
import simpleDocs from './docs/simple.md';
import sortColumnsDocs from './docs/sort-columns.md';

const oneHundredData = dataOneHundred();

storiesOf('TableProvider', module)
  .add('simple', withReadme(Readme, withDocs(simpleDocs, () => (
    <TableComponent
      data={data}
      columns={simpleColumns}
    />
  ))))
  .add('custom components', withReadme(Readme, withDocs(customComponentsDocs, () => (
    <TableComponent
      data={data}
      table={<Table hover bordered style={{ textAlign: 'left' }} />}
      trBody={<Tr />}
      columns={simpleColumns}
    />
  ))))
  .add('onClick cell', withReadme(Readme, withDocs(onClickCellDocs, () => (
    <TableProvider
      data={data}
      table={<Table hover bordered style={{ textAlign: 'left' }} />}
      trBody={<Tr />}
      columns={simpleColumns}
      onClickCell={(item) => alert(`"cellValue": "${item}"`)}
    />
  ))))
  .add('onClick row', withReadme(Readme, withDocs(onClickRowDocs, () => (
    <TableProvider
      data={data}
      table={<Table hover bordered style={{ textAlign: 'left' }} />}
      trBody={<Tr />}
      columns={simpleColumns}
      onClickRow={(item) => alert(`"rowValue": ${JSON.stringify(item, null, 2)};`)}
    />
  ))))
  .add('sort columns', withReadme(Readme, withDocs(sortColumnsDocs, () => (
    <TableProvider
      data={data}
      table={<Table hover bordered style={{ textAlign: 'left', tableLayout: 'fixed', wordWrap: 'break-word', }} />}
      trBody={<Tr style={{ width: '25%' }} />}
      columns={sortColumns}
    />
  ))))
  .add('search columns (includes)', withReadme(Readme, withDocs(searchColumnsIncludeDocs, () => (
    <TableProvider
      data={data}
      table={<Table hover bordered style={{ textAlign: 'left' }} />}
      trBody={<Tr />}
      inputColumnSearch={<FormControl borderRadius="0" sm type="text" placeholder="Search column" />}
      columns={searchColumnsInclude}
    />
  ))))
  .add('search columns (exact)', withReadme(Readme, withDocs(searchColumnsExactDocs, () => (
    <TableProvider
      data={data}
      table={<Table hover bordered style={{ textAlign: 'left' }} />}
      trBody={<Tr />}
      inputColumnSearch={<FormControl borderRadius="0" sm type="text" placeholder="Search column" />}
      columns={searchColumnsExact}
    />
  ))))
  .add('search table (includes)', withReadme(Readme, withDocs(searchTableIncludesDocs, () => (
    <TableProvider
      data={data}
      table={<Table hover bordered style={{ textAlign: 'left' }} />}
      trBody={<Tr />}
      tableSearch="includes"
      inputTableSearch={<FormControl borderRadius="0" sm type="text" placeholder="Search table" />}
      columns={simpleColumns}
    />
  ))))
  .add('search table (exact)', withReadme(Readme, withDocs(searchTableExactDocs, () => (
    <TableProvider
      data={data}
      table={<Table hover bordered style={{ textAlign: 'left' }} />}
      trBody={<Tr />}
      tableSearch="exact"
      inputTableSearch={<FormControl borderRadius="0" sm type="text" placeholder="Search table" />}
      columns={simpleColumns}
    />
  ))))
  .add('export CSV', withReadme(Readme, withDocs(exportCSVDocs, () => (
    <TableProvider
      data={oneHundredData}
      table={<Table hover bordered style={{ textAlign: 'left' }} />}
      trBody={<Tr />}
      exportCSV={true}
      buttonExportCSV={<Button success value="Export CSV" style={{ display: 'flex' }} />}
      columns={simpleColumns}
    />
  ))));
