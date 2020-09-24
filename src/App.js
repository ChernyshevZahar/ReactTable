import React, { Component } from "react";
import Loader from "./Loader/Loader";
import Table from "./Table/Table";
import _ from "lodash";
import DetailRowView from "./DetailRowView/DetailRowView";
import ModeSelector from "./ModeSelector/ModeSelector";
import ReactPaginate from "react-paginate";
import TableSearch from "./TableSearch/TableSearch";
import FormEdit from "./FormEdit/FormEdit";

class App extends Component {
  state = {
    isModeSelected: false,
    isLoading: false,
    data: [],
    search: "",
    sort: "adc",
    sortField: "id",
    row: null,
    currentPage: 0,
    edit: false,
  };
  async fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();

    this.setState({
      isLoading: false,
      data: _.orderBy(data, this.state.sortField, this.state.sort),
    });
  }
  onSort = (sortField) => {
    const cloneData = this.state.data.concat();
    const sort = this.state.sort === "asc" ? "desc" : "asc";
    const data = _.orderBy(cloneData, sortField, sort);

    this.setState({
      data,
      sort,
      sortField,
    });
  };

  onRowSelect = (row) => {
    this.setState({ row });
  };

  modeSelectHandler = (url) => {
    this.setState({
      isModeSelected: true,
      isLoading: true,
    });
    this.fetchData(url);
  };

  pageChangeHandler = ({ selected }) =>
    this.setState({ currentPage: selected });

  searchHandler = (search) => this.setState({ search, currentPage: 0 });

  getFilteredData() {
    const { data, search } = this.state;

    if (!search) {
      return data;
    }

    var result = data.filter((item) => {
      return (
        item["firstName"].toLowerCase().includes(search.toLowerCase()) ||
        item["lastName"].toLowerCase().includes(search.toLowerCase()) ||
        item["email"].toLowerCase().includes(search.toLowerCase())
      );
    });
    if (!result.length) {
      result = this.state.data;
    }
    return result;
  }

  onEditForm = () => {
    this.setState({
      edit: true,
    });
  };
  offEditForm = (e) => {
    e.preventDefault();
    const newdata = {
      id: this.state.data.length,
      firstName: e.target.elements.firstName.value,
      lastName: e.target.elements.lastName.value,
      email: e.target.elements.email.value,
      phone: e.target.elements.phone.value,
    };

    const date2 = this.state.data;
    if (
      e.target.elements.firstName.value &&
      e.target.elements.lastName.value &&
      e.target.elements.email.value &&
      e.target.elements.phone.value
    ) {
      date2.unshift(newdata);
    }
    this.setState({
      edit: false,
      data: date2,
    });
  };

  render() {
    const pageSize = 50;
    const filteredData = this.getFilteredData();
    const pageCount = Math.ceil(filteredData.length / pageSize);
    const displayData = _.chunk(filteredData, pageSize)[this.state.currentPage];
    if (!this.state.isModeSelected) {
      return (
        <div className="container">
          <ModeSelector onSelect={this.modeSelectHandler} />
        </div>
      );
    }
    return (
      <div className="container">
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <TableSearch onSearch={this.searchHandler} />
            {this.state.edit ? (
              <FormEdit EditForm={this.offEditForm} />
            ) : (
              <button
                className="btn btn-primary mb-3"
                onClick={this.onEditForm}
              >
                Добавить
              </button>
            )}

            <Table
              data={displayData}
              onSort={this.onSort}
              sort={this.state.sort}
              sortField={this.state.sortField}
              onRowSelect={this.onRowSelect}
            />
          </React.Fragment>
        )}
        {this.state.data.length > pageSize ? (
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.pageChangeHandler}
            containerClassName={"pagination"}
            activeClassName={"active"}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            nextClassName="page-item"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
            forcePage={this.state.currentPage}
          />
        ) : null}
        {this.state.row ? <DetailRowView person={this.state.row} /> : null}
      </div>
    );
  }
}

export default App;
