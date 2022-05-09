import React, { Component } from "react";
import '../css/NavbarComp.css'


class NavbarComp extends Component {

  render() {
    let isLogged = this.props.isLogged ? true : false;

    return (

      <div bg="dark">
        <ul>
          <li><a className="active" href="#home">Supplychain Using Ethereum</a></li>
          <li>{isLogged ?
              <button className="button-17" onClick={() => this.props.onlogout()}>Logout</button> : null}</li>
        </ul>
      </div>
    );
  }
}


export default NavbarComp;