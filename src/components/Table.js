import React from 'react';
import PropTypes from 'prop-types';
import {
  multiColumnSearchArrayTable,
  searchArrayTable,
} from 'array-table-search';
import { sortArrayByKey } from 'array-table-sort';
import { convertArrayToCSV } from 'convert-array-to-csv';
import fileDownload from 'js-file-download';


import { ExportCSVButton } from './ExportCSVButton';
import { SearchColumnInput } from './SearchColumnInput';
import { SearchTableInput } from './SearchTableInput';
import { SortColumnButton } from './SortColumnButton';

export class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonExportCSV: this.props.buttonExportCSV,
      columns: this.props.columns,
      data: this.props.data,
      exportCSV: this.props.exportCSV,
      inputColumnSearch: this.props.inputColumnSearch,
      inputTableSearch: this.props.inputTableSearch,
      noDataMessage: this.props.noDataMessage,
      table: this.props.table,
      tableSearch: this.props.tableSearch,
      td: this.props.td,
      th: this.props.th,
      trHead: this.props.trHead,
      trBody: this.props.trBody,
      search: {},
      sort: {},
    };

    this.exportToCSV = this.exportToCSV.bind(this);
    this.searchOnColumn = this.searchOnColumn.bind(this);
    this.searchOnTable = this.searchOnTable.bind(this);
    this.sortByKey = this.sortByKey.bind(this);
    this.handleOnClickRow = this.handleOnClickRow.bind(this);
    this.handleOnClickCell = this.handleOnClickCell.bind(this);
  }

  componentWillMount() {
    const { columns, tableSearch } = this.state;
    let sort = {};
    let search = {};

    columns.forEach((column) => {
      if (column.sort) {
        sort = {
          ...sort,
          [`${column.accessor}`]: {
            asc: true,
          },
        };
      }
      if (column.search) {
        search = {
          ...search,
          [`${column.accessor}`]: {
            type: column.search,
            value: '',
          },
        };
      }
    });

    if (tableSearch) {
      search = {
        ...search,
        tableValue: '',
      };
    }

    this.setState({
      sort,
      search,
    });
  }

  sortByKey(accessor) {
    const dataToSort = [...this.state.data];
    const asc = this.state.sort[accessor].asc
      ? !this.state.sort[accessor].asc
      : true;
    const sortOptions = {
      ...this.state.sort,
      [`${accessor}`]: {
        asc,
      },
      active: accessor,
    };

    const sortedData = sortArrayByKey(dataToSort, sortOptions);

    this.setState({
      data: sortedData,
      sort: {
        ...sortOptions,
      },
    });
  }

  searchOnColumn(ev, column) {
    const { value } = ev.target;
    const dataToSearch = [...this.props.data];
    const searchOptions = {
      ...this.state.search,
      [column.accessor]: {
        ...this.state.search[column.accessor],
        value,
      },
    };

    const searchedData = multiColumnSearchArrayTable(dataToSearch, searchOptions);

    this.setState({
      data: searchedData,
      search: {
        ...searchOptions,
      },
    });
  }

  exportToCSV() {
    const { data } = this.props;

    const csv = convertArrayToCSV(data);

    fileDownload(csv, 'data.csv');
  }

  searchOnTable(ev) {
    const { value } = ev.target;
    const { tableSearch } = this.state;
    const dataToSearch = [...this.props.data];
    const sortOptions = {
      type: tableSearch,
      value,
    };

    const searchedData = searchArrayTable(dataToSearch, sortOptions);

    this.setState({
      data: searchedData,
      search: {
        ...this.state.search,
        tableValue: value,
      },
    });
  }

  handleOnClickRow(item) {
    return this.props.onClickRow(item);
  }

  handleOnClickCell(item) {
    return this.props.onClickCell(item);
  }

  render() {
    const {
      buttonExportCSV,
      data,
      columns,
      exportCSV,
      inputColumnSearch,
      inputTableSearch,
      noDataMessage,
      table,
      tableSearch,
      trHead,
      trBody,
      th,
      td,
      sort,
      search,
    } = this.state;

    const TableComponent = table.type;
    const TableHeaderRowComponent = trHead.type;
    const TableBodyRowComponent = trBody.type;
    const TableHeaderCellComponent = th.type;
    const TableStandartCellComponent = td.type;

    return (
      <div>
        {
          exportCSV &&
          <ExportCSVButton
            buttonExportCSV={buttonExportCSV}
            onClick={(ev) => this.exportToCSV(ev)}
          />
        }
        {tableSearch &&
          <SearchTableInput
            inputTableSearch={inputTableSearch}
            onChange={(ev) => this.searchOnTable(ev)}
            value={search.tableValue}
          />
        }
        <TableComponent
          {...table.props}
        >
          <thead>
            <TableHeaderRowComponent
              {...trHead.props}
            >
              {columns.length > 0 && columns.map((column) => (
                <TableHeaderCellComponent
                  {...th.props}
                  key={`${column.accessor}-header-cell`}
                >
                  {column.header || column.accessor}
                  {column.sort &&
                    <SortColumnButton
                      sort={sort}
                      column={column}
                      onClick={() => this.sortByKey(column.accessor)}
                      onKeyDown={() => this.sortByKey(column.accessor)}
                    />}
                  {column.search &&
                    <SearchColumnInput
                      inputColumnSearch={inputColumnSearch}
                      onChange={(ev) => this.searchOnColumn(ev, column)}
                      value={search[column.accessor].value}
                    />
                  }
                </TableHeaderCellComponent>
              ))}
            </TableHeaderRowComponent>
          </thead>
          <tbody>
            {
              data.length > 0 && data.map((item) => (
                <TableBodyRowComponent
                  onClick={() => this.handleOnClickRow(item)}
                  {...trBody.props}
                  key={`${Object.values(item)}-body-row`}
                >
                  {
                    columns.length > 0 && columns.map((column) => (
                      <TableStandartCellComponent
                        onClick={() => this.handleOnClickCell(item[column.accessor])}
                        {...td.props}
                        key={`${item[column.accessor]}-body-cell`}
                      >
                        {item[column.accessor] || noDataMessage}
                      </TableStandartCellComponent>
                    ))
                  }
                </TableBodyRowComponent>
              ))
            }
          </tbody>
        </TableComponent>
      </div>
    );
  }
}

Table.defaultProps = {
  buttonExportCSV: <button value="Export CSV" />,
  data: [],
  exportCSV: false,
  inputColumnSearch: <input type="text" placeholder="Search column" />,
  inputTableSearch: <input type="text" placeholder="Search table" />,
  noDataMessage: 'No data found',
  table: <table />,
  tableSearch: '',
  trHead: <tr />,
  trBody: <tr />,
  th: <th />,
  td: <td />,
  columns: [],
  onClickRow: (item) => item,
  onClickCell: (item) => item,
};

Table.propTypes = {
  buttonExportCSV: PropTypes.element,
  data: PropTypes.arrayOf(PropTypes.object),
  exportCSV: PropTypes.bool,
  inputColumnSearch: PropTypes.element,
  inputTableSearch: PropTypes.element,
  noDataMessage: PropTypes.string,
  table: PropTypes.element,
  tableSearch: PropTypes.string,
  trHead: PropTypes.element,
  trBody: PropTypes.element,
  th: PropTypes.element,
  td: PropTypes.element,
  columns: PropTypes.arrayOf(PropTypes.object),
  onClickRow: PropTypes.func,
  onClickCell: PropTypes.func,
};
