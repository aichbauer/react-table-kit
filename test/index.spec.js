import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';

import TableComponent from '../src';

import { simpleColumns } from './fixtures/columns';
import { data } from './fixtures/data';

configure({ adapter: new Adapter() });

test('render TableProvider', () => {
  const myComponent = (<TableComponent
    data={data}
    columns={simpleColumns}
  />);

  const tree = renderer.create(myComponent).toJSON();
  const wrapper = mount(myComponent);
  const state = wrapper.state();

  expect(state.buttonExportCSV).toEqual(<button value="Export CSV" />);
  expect(state.columns).toEqual(simpleColumns);
  expect(state.data).toEqual(data);
  expect(state.exportCSV).toBe(false);
  expect(state.inputColumnSearch).toEqual(<input type="text" placeholder="Search column" />);
  expect(state.inputTableSearch).toEqual(<input type="text" placeholder="Search table" />);
  expect(state.table).toEqual(<table />);
  expect(state.tableSearch).toBe('');
  expect(state.td).toEqual(<td />);
  expect(state.th).toEqual(<th />);
  expect(state.trHead).toEqual(<tr />);
  expect(state.trBody).toEqual(<tr />);
  expect(state.search).toEqual({});
  expect(state.sort).toEqual({});
  expect(tree).toMatchSnapshot();
});
