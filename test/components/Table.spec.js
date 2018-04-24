import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';

import { Table } from '../../src/components/Table';

import { sortSearchColumns, noHeaderColumns } from '../fixtures/columns';
import { data, noDataFound } from '../fixtures/data';

configure({ adapter: new Adapter() });

const MyComponent = (<Table
  buttonExportCSV={<button className="button" value="Export CSV test" />}
  columns={sortSearchColumns}
  data={data}
  exportCSV
  inputColumnSearch={<input className="col-search" type="text" placeholder="Search column test" />}
  inputTableSearch={<input className="table-search" type="text" placeholder="Search table test" />}
  table={<table className="table" />}
  tableSearch="exact"
  td={<td className="td" />}
  th={<td className="th" />}
  trBody={<tr className="trBody" />}
  trHead={<tr className="trHead" />}
/>);

const MyComponentNoHeader = (<Table
  columns={noHeaderColumns}
  data={data}
/>);

const MyComponentNoDataFound = (<Table
  columns={sortSearchColumns}
  data={noDataFound}
  noDataFound="NO DATA FOUND"
/>);

let wrapper;

beforeAll(() => {
  wrapper = mount(MyComponent);
});

test('TableProvider | onClick sort', () => {
  wrapper.instance().sortByKey = jest.fn();
  wrapper.update();

  expect(wrapper.instance().sortByKey).toHaveBeenCalledTimes(0);

  wrapper.find('span').at(0).simulate('click');

  expect(wrapper.instance().sortByKey).toHaveBeenCalledTimes(1);
});

test('TableProvider | onKeyDown sort', () => {
  wrapper.instance().sortByKey = jest.fn();
  wrapper.update();

  expect(wrapper.instance().sortByKey).toHaveBeenCalledTimes(0);

  wrapper.find('span').at(0).simulate('keyDown');

  expect(wrapper.instance().sortByKey).toHaveBeenCalledTimes(1);
});

test('TableProvider | onChange search table', () => {
  wrapper.instance().searchOnTable = jest.fn();
  wrapper.update();

  expect(wrapper.instance().searchOnTable).toHaveBeenCalledTimes(0);

  wrapper.find('.table-search').simulate('change');

  expect(wrapper.instance().searchOnTable).toHaveBeenCalledTimes(1);
});

test('TableProvider | onChange search column', () => {
  wrapper.instance().searchOnColumn = jest.fn();
  wrapper.update();

  expect(wrapper.instance().searchOnColumn).toHaveBeenCalledTimes(0);

  wrapper.find('.col-search').first().simulate('change');

  expect(wrapper.instance().searchOnColumn).toHaveBeenCalledTimes(1);
});

test('TableProvider | onClick download CSV', () => {
  wrapper.instance().exportToCSV = jest.fn();
  wrapper.update();

  expect(wrapper.instance().exportToCSV).toHaveBeenCalledTimes(0);

  wrapper.find('button').first().simulate('click');

  expect(wrapper.instance().exportToCSV).toHaveBeenCalledTimes(1);
});

test('TableProvider | onClick download CSV', () => {
  wrapper.instance().exportToCSV = jest.fn();
  wrapper.update();

  expect(wrapper.instance().exportToCSV).toHaveBeenCalledTimes(0);

  wrapper.find('button').first().simulate('click');

  expect(wrapper.instance().exportToCSV).toHaveBeenCalledTimes(1);
});

test('TableProvider | onClick row', () => {
  wrapper.instance().handleOnClickRow = jest.fn();
  wrapper.update();

  expect(wrapper.instance().handleOnClickRow).toHaveBeenCalledTimes(0);

  wrapper.find('tbody tr').first().simulate('click');

  expect(wrapper.instance().handleOnClickRow).toHaveBeenCalledTimes(1);
});

test('TableProvider | onClick cell', () => {
  wrapper.instance().handleOnClickCell = jest.fn();
  wrapper.update();

  expect(wrapper.instance().handleOnClickCell).toHaveBeenCalledTimes(0);

  wrapper.find('tbody tr td').first().simulate('click');

  expect(wrapper.instance().handleOnClickCell).toHaveBeenCalledTimes(1);
});

test('TableProvider | handleOnClickRow', () => {
  const tree = renderer.create(MyComponent);

  tree.getInstance().handleOnClickRow('item');

  expect(tree).toMatchSnapshot();
});

test('TableProvider | handleOnClickCell', () => {
  const tree = renderer.create(MyComponent);

  tree.getInstance().handleOnClickCell('item');

  expect(tree).toMatchSnapshot();
});

test('TableProvider | searchOnTable', () => {
  const tree = renderer.create(MyComponent);

  tree.getInstance().searchOnTable({
    target: {
      value: 'mark',
    },
  });

  expect(tree).toMatchSnapshot();
});

test('TableProvider | exportToCSV', () => {
  const tree = renderer.create(MyComponent);

  tree.getInstance().exportToCSV();

  expect(tree).toMatchSnapshot();
});

test('TableProvider | searchOnColumn', () => {
  const tree = renderer.create(MyComponent);
  const ev = {
    target: {
      value: 'mark',
    },
  };
  const column = { accessor: 'first' };

  tree.getInstance().searchOnColumn(ev, column);

  expect(tree).toMatchSnapshot();
});

test('TableProvider | sortByKey', () => {
  const tree = renderer.create(MyComponent);

  tree.getInstance().sortByKey('number');

  expect(tree).toMatchSnapshot();

  tree.getInstance().sortByKey('number');

  expect(tree).toMatchSnapshot();
});

test('TableProvider | no header', () => {
  const tree = renderer.create(MyComponentNoHeader);

  expect(tree).toMatchSnapshot();
});

test('TableProvider | no data found', () => {
  const tree = renderer.create(MyComponentNoDataFound);

  expect(tree).toMatchSnapshot();
});

