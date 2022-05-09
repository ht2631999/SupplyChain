import React, { Component } from "react";
// import DisplayOrders from "./common/DisplayOrders";
import { Card } from 'antd';
import '../css/login.css'
import '../css/retailer.css'

class Retailer extends Component {
    //methods and states here
    constructor(props) {
        super(props);

        this.placeOrder = this.placeOrder.bind(this);
        this.addmedicine = this.addmedicine.bind(this)
    }   
    state = {
        retailerId: "",
        retailerName: "",
        orders: [],
        supplierOrders: [],
        retailerOrders: []
    }
    cont = this.props.state.contract;
    Acc = this.props.state.accounts;

    componentDidMount() {
        this.loadRetailerInfo();
        this.loadRetailerOrder();
        this.loadOtherOrders();
    }

    async loadRetailerInfo() {
        var result = null;
        try {
            result = await this.cont.methods.getRetailerInfo().call({ from: this.Acc[0] });
            console.log(result);
            this.setState({ retailerId: result[0], retailerName: result[1] });
        }
        catch (e) {
            console.log(e);
        }
    }

    async addmedicine(event){
        event.preventDefault();
        let medicine_id = document.getElementById('medicine_id').value;
        let medicine_name = document.getElementById('medicine_name').value;
        let power = document.getElementById('power').value;
        let price = document.getElementById('price').value;
        console.log(medicine_id);
        console.log(medicine_name);
        console.log(power);
        console.log(price);
        let result = await this.cont.methods.addMedicines(medicine_id, medicine_name, power, price).send({ from: this.Acc[0] });
        console.log(result);
    }

    async loadRetailerOrder() {
        var result = null;
        try {
            result = await this.cont.methods.getRetailerOrders().call({ from: this.Acc[0] });
            console.log(result);
            this.setState({ orders: result });
        }
        catch (e) {
            console.log(e);
        }
    }

    async loadOtherOrders() {
        var result = null;
        try {
            result = await this.cont.methods.getOtherOrders().call({ from: this.Acc[0] });
            console.log(result);
            this.setState({ retailerOrders: result[1], supplierOrders: result[0] });
        }
        catch (e) {
            console.log(e);
        }
    }

    async placeOrder(event) {
        event.preventDefault();
        let item_id = document.getElementById("item_id").value;
        let supplier = document.getElementById("supplier").value;
        let quantity = document.getElementById("quantity").value;
        let quality = document.getElementById("quality").value;
        let quantity_scale = document.getElementById("quantity_scale").value;
        var result = null;
        try {
            result = await this.cont.methods.placeOrder(supplier, item_id, quantity, quantity_scale, quality).send({ "from": this.Acc[0] });
            console.log(result);
        }
        catch (e) {
            console.log(e);
        }

    }

    render() {
        let { retailerId, retailerName, orders, supplierOrders } = this.state;
        return (
            <div className="body">
                <Card >
                    <h6>Retailer Id:</h6> {retailerId}<br></br>
                    <h6>Retailer name:</h6> {retailerName}
                </Card>

                <div className="mt-4" style={{border:'2px solid black', backgroundColor:'white'}} >
                <h5>Retailer Orders</h5>
                <div class="div-table-row-special" >
                        <div class="div-table-col" align="center">Order ID</div>
                        <div  class="div-table-col-special">From</div>
                        <div  class="div-table-col-special">To</div>
                        <div  class="div-table-col">Item ID</div>
                        <div  class="div-table-col">Item Name</div>
                        <div  class="div-table-col">Quality</div>
                        <div  class="div-table-col">Quantity</div>
                        <div  class="div-table-col">Quantity Units</div>
                    </div>
                {
                    orders.slice(0, orders.length).map((order,index
                    ) => {
                        //  this.loadStates(order);
        
                        return (
                            
                                <div className="div-table">
                            
                                    <div className="div-table-row">
                                        <div className="div-table-col">
                                        {order[2]}
                                        </div>
            
                                
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
                    })
                }
                </div>

                <div className="container">
                    
                    <div className="row mt-4" style={{backgroundColor:'white'}}>

                        <div className="col" style={{border:'1px solid black'}}>
                            <h5>Place Order</h5>
                            <form style={{ align: 'centre' }} onSubmit={this.placeOrder}>
                                <table>

                                    <tr>
                                        <td><input type='text' id='item_id' placeholder='item Id' /></td>
                                    </tr>

                                    <tr>
                                        <td><input type="text" id='supplier' placeholder='Supplier Address' /></td>
                                    </tr>

                                    <tr>
                                        <td><input type="text" id='quantity' placeholder='Quantity' /></td>
                                    </tr>

                                    <tr>
                                        <td><input type="text" id='quantity_scale' placeholder='Quantity Units' /></td>
                                    </tr>

                                    <tr>
                                        <td><input type="text" id='quality' placeholder='Quality' /></td>
                                    </tr>

                                    <br></br>
                                    <button className='button-18' type="submit" value="submit">submit</button>
                                </table>
                                <br></br>
                            </form>
                        </div>

                        <div className="col" style={{border:'1px solid black'}}>
                            <h5>Add medicine by Id</h5>
                            <br></br>
                            <form style={{ align: 'centre' }} onSubmit={this.addmedicine}>
                                <table>

                                    <tr>
                                        <td><input type='text' id='medicine_id' placeholder='medicine Id' /></td>
                                    </tr>

                                    <tr>
                                        <td><input type="text" id='medicine_name' placeholder='Medicine name' /></td>
                                    </tr>

                                    <tr>
                                        <td><input type="text" id='power' placeholder='power' /></td>
                                    </tr>

                                    <tr>
                                        <td><input type="text" id='price' placeholder='price' /></td>
                                    </tr>

                                    <br></br>
                                    <button className='button-18' type="submit" value="submit">submit</button>
                                </table>
                                <br></br>
                            </form>
                        </div>
                    </div>
                </div>
                
                <div className="mt-4" style={{border:'2px solid black' , backgroundColor:'white'}}>
                    <h5>Supplier Orders</h5>
                    <div class="div-table-row-special" >
                            <div class="div-table-col" >Order ID</div>
                            <div  class="div-table-col-special">From</div>
                            <div  class="div-table-col-special">To</div>
                            <div  class="div-table-col">Item ID</div>
                            <div  class="div-table-col">Item Name</div>
                            <div  class="div-table-col">Quality</div>
                            <div  class="div-table-col">Quantity</div>
                            <div  class="div-table-col">Quantity Units</div>
                        </div>
                    {
                        supplierOrders.slice(0, supplierOrders.length).map((order,index
                        ) => {
                            //  this.loadStates(order);
            
                            return (
                                
                                    <div className="div-table">
                                
                                        <div className="div-table-row">
                                            <div className="div-table-col">
                                            {order[2]}
                                            </div>
                
                                    
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
                        })
                    }
                    </div>
            </div>
        );
    }
}

export default Retailer;