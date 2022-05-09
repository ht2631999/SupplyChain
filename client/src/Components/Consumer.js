import React, { Component } from "react";
// import DisplayOrders from "./common/DisplayOrders";
import { Card } from "antd";
import "../css/consumer.css";

class Consumer extends Component {
  //methods and states here
  constructor(props) {
    super(props);

    this.placeOrder = this.placeOrder.bind(this);
  }
  state = {
    consumerId: "",
    consumerName: "",
    orders: [],
    supplierOrders: [],
    retailerOrders: [],
  };
  cont = this.props.state.contract;
  Acc = this.props.state.accounts;

  componentDidMount() {
    this.loadConsumerInfo();
    this.loadConsumerOrder();
    this.loadOtherOrders();
  }

  async loadConsumerInfo() {
    var result = null;
    try {
      result = await this.cont.methods
        .getConsumerInfo()
        .call({ from: this.Acc[0] });
      console.log(result);
      this.setState({ consumerId: result[0], consumerName: result[1] });
    } catch (e) {
      console.log(e);
    }
  }
  async loadConsumerOrder() {
    var result = null;
    try {
      result = await this.cont.methods
        .getConsumerOrders()
        .call({ from: this.Acc[0] });
      console.log(result);
      this.setState({ orders: result });
    } catch (e) {
      console.log(e);
    }
  }

  async loadOtherOrders() {
    var result = null;
    try {
      result = await this.cont.methods
        .getOtherOrders()
        .call({ from: this.Acc[0] });
      console.log(result);
      this.setState({ retailerOrders: result[1], supplierOrders: result[0] });
      console.log(this.state.retailerOrders);
      console.log(this.state.supplierOrders);
    } catch (e) {
      console.log(e);
    }
  }

  async placeOrder(event) {
    event.preventDefault();
    let item_id = document.getElementById("item_id").value;
    let retailer = document.getElementById("retailer").value;
    let quantity = document.getElementById("quantity").value;
    let quality = document.getElementById("quality").value;
    let quantity_scale = document.getElementById("quantity_scale").value;
    var result = null;
    try {
      result = await this.cont.methods
        .placeOrder(retailer, item_id, quantity, quantity_scale, quality)
        .send({ from: this.Acc[0] });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    let { consumerId, consumerName, orders, supplierOrders, retailerOrders } =
      this.state;
    return (
      <div className="consumer_body">
        <Card>
          <span>
            <b>Id: </b>
            {consumerId}
          </span>{" "}
          <br></br>
          <span>
            <b>Name:</b> {consumerName}
          </span>{" "}
          <br></br>
        </Card>

        <div className="row mt-4" style={{ border: "2px solid black", backgroundColor:'white' }}>
          <h5>Your Orders</h5>
          <div class="div-table-row" style={{ scroll: "auto" }}>
            <div class="div-table-col" align="center">
              Order ID
            </div>
            <div class="div-table-col-special">From</div>
            <div class="div-table-col-special">To</div>
            <div class="div-table-col">Item ID</div>
            <div class="div-table-col">Item Name</div>
            <div class="div-table-col">Quality</div>
            <div class="div-table-col">Quantity</div>
            <div class="div-table-col">Quantity Units</div>
          </div>
          {orders.slice(0, orders.length).map((order, index) => {
            //  this.loadStates(order);

            return (
              <div className="div-table">
                <div className="div-table-row">
                  <div className="div-table-col">{order[2]}</div>

                  <div className="div-table-col-special">{order[0]} </div>

                  <div className="div-table-col-special">{order[1]} </div>

                  <div className="div-table-col">{order[3]} </div>

                  <div className="div-table-col">{order[6]} </div>

                  <div className="div-table-col"> {order[7]} </div>

                  <div className="div-table-col">{order[4]} </div>

                  <div className="div-table-col">{order[5]} </div>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <div className="container">
            
            <div className="row mt-3" >
              <div className="col-4"></div>
              <div className="col-5" style={{border: "2px solid black", backgroundColor:'white'}}>
              <h5>Place Order</h5>
              <form style={{ align: "centre" }} onSubmit={this.placeOrder}>
                <table>
                  <tr>
                    <td>
                      <input type="text" id="item_id" placeholder="item Id" />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <input
                        type="text"
                        id="retailer"
                        placeholder="Supplier Address"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <input type="text" id="quantity" placeholder="Quantity" />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <input
                        type="text"
                        id="quantity_scale"
                        placeholder="Quantity"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <input type="text" id="quality" placeholder="Quality" />
                    </td>
                  </tr>
                  <br></br>
                  <button className="button-84" type="submit" value="submit">
                    Place Order
                  </button>
                </table>
              </form>
              <br></br>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3" style={{ border: "2px solid black",  backgroundColor:'white' }}>
          <h5>Retailer Orders</h5>
          <div class="div-table-row" style={{ scroll: "auto" }}>
            <div class="div-table-col" align="center">
              Order ID
            </div>
            <div class="div-table-col-special">From</div>
            <div class="div-table-col-special">To</div>
            <div class="div-table-col">Item ID</div>
            <div class="div-table-col">Item Name</div>
            <div class="div-table-col">Quality</div>
            <div class="div-table-col">Quantity</div>
            <div class="div-table-col">Quantity Units</div>
          </div>
          {retailerOrders
            .slice(0, retailerOrders.length)
            .map((order, index) => {
              //  this.loadStates(order);

              return (
                <div className="div-table">
                  <div className="div-table-row">
                    <div className="div-table-col">{order[2]}</div>

                    <div className="div-table-col-special">{order[0]} </div>

                    <div className="div-table-col-special">{order[1]} </div>

                    <div className="div-table-col">{order[3]} </div>

                    <div className="div-table-col">{order[6]} </div>

                    <div className="div-table-col"> {order[7]} </div>

                    <div className="div-table-col">{order[4]} </div>

                    <div className="div-table-col">{order[5]} </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className='mt-3' style={{ border: "2px solid black",  backgroundColor:'white' }}>
          <h5>Supplier Orders</h5>
          <div class="div-table-row" style={{ scroll: "auto" }}>
            <div class="div-table-col" align="center">
              Order ID
            </div>
            <div class="div-table-col-special">From</div>
            <div class="div-table-col-special">To</div>
            <div class="div-table-col">Item ID</div>
            <div class="div-table-col">Item Name</div>
            <div class="div-table-col">Quality</div>
            <div class="div-table-col">Quantity</div>
            <div class="div-table-col">Quantity Units</div>
          </div>
          {supplierOrders
            .slice(0, supplierOrders.length)
            .map((order, index) => {
              //  this.loadStates(order);

              return (
                <div className="div-table">
                  <div className="div-table-row">
                    <div className="div-table-col">{order[2]}</div>

                    <div className="div-table-col-special">{order[0]} </div>

                    <div className="div-table-col-special">{order[1]} </div>

                    <div className="div-table-col">{order[3]} </div>

                    <div className="div-table-col">{order[6]} </div>

                    <div className="div-table-col"> {order[7]} </div>

                    <div className="div-table-col">{order[4]} </div>

                    <div className="div-table-col">{order[5]} </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Consumer;
