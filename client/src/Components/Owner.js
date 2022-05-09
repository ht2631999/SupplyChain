import React, { Component } from "react";

import '../css/owner.css'
class Owner extends Component {
  //methods and state here
  constructor(props) {
    super(props);
    this.RegisterManufacturer = this.RegisterManufacturer.bind(this);
  }

  cont = this.props.state.contract;
  Acc = this.props.state.accounts;

  async RegisterManufacturer(event) {
      event.preventDefault();
      let manufacturer_id = document.getElementById("manufacturer_id").value;
      let manufacturer_name = document.getElementById("manufacturer_name").value;
      console.log(manufacturer_id);
      console.log(manufacturer_name);
      await this.cont.methods.manufacturerSignUp(manufacturer_id, manufacturer_name).send({ from: this.Acc[0] });
  }
  render() {
    return (
      <div className="container">
        <div className="row mt-2">
          <div className="col mt-2">
            <h5>Register Manufacturer</h5>
            <div>
              <form onSubmit={this.RegisterManufacturer}>
                <div className="label mt-2">
                  <b>Blockchain Address:</b>
                </div>
                <input
                  type="text"
                  name="address"
                  id="manufacturer_id"
                  placeholder="Id"
                ></input>{" "}
                <br></br>

                <div className="label mt-2">
                  <b>Name</b>
                </div>
                <input
                  type="text"
                  name="name"
                  id="manufacturer_name"
                  placeholder="Name"
                ></input>
                <br></br>

                <button className='button-84' variant="dark" type="submit">
                  Register Manufacturer
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Owner;
