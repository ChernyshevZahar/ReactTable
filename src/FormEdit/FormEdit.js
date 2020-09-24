import React from "react";

class Form extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.EditForm}>
        <div className="form-group">
          <label for="exampleInputfirstName">First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            placeholder="Enter First Name"
          />
        </div>
        <div className="form-group">
          <label for="exampleInputlastName"> Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            placeholder="Enter Last Name"
          />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label for="exampleInputphone">Phone</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            placeholder="Enter Phone"
          />
        </div>

        <button className="btn btn-primary mb-3">Добавить</button>
      </form>
    );
  }
}

export default Form;
