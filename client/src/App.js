import React, { Component } from "react";
import supplychain from './contracts/Supplychain.json'
import getWeb3 from "./getWeb3";
import Login from './Components/Login'
import Consumer from "./Components/Consumer";
import Retailer from "./Components/Retailer";
import Supplier from "./Components/Supplier";
import Owner from "./Components/Owner";
import Manufacturer from "./Components/Manufacturer";
import Navbarcomp from "./Components/NavbarComp";
import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = supplychain.networks[networkId];
      const instance = new web3.eth.Contract(
        supplychain.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };



  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <Navbarcomp isLogged={this.state.loggedAcc} onlogout={()=>this.setState({loggedAcc:null,loggedas:null})}/>
        {

          !this.state.loggedAcc ? <Login onlogin={(loggedAcc, loggedas) => this.setState({ loggedAcc, loggedas })} state={this.state} />
            : this.state.loggedas === 0 ? <Consumer onlogin={(loggedAcc, loggedas) => this.setState({ loggedAcc, loggedas })} state={this.state} />
              : this.state.loggedas === 1 ? <Retailer onlogin={(loggedAcc, loggedas) => this.setState({ loggedAcc, loggedas })} state={this.state} />
                : this.state.loggedas === 2 ? <Supplier onlogin={(loggedAcc, loggedas) => this.setState({ loggedAcc, loggedas })} state={this.state} />
                  : this.state.loggedas === 3 ? <Manufacturer onlogin={(loggedAcc, loggedas) => this.setState({ loggedAcc, loggedas })} state={this.state} />
                    : this.state.loggedas === 4 ? <Owner onlogin={(loggedAcc, loggedas) => this.setState({ loggedAcc, loggedas })} state={this.state} />
                      : null
        }
      </div>
    );
  }
}

export default App;
