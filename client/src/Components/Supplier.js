import React, { Component } from "react";
import { Card } from 'antd';
import '../css/supplier.css'

class Supplier extends Component {
    //methods and state here
    constructor(props) {
        super(props);
        this.placeOrder = this.placeOrder.bind(this);
    }

    state = {
        supplier_id: "",
        supplier_name: "",
        orders: []
    }
      
    cont = this.props.state.contract;
    Acc = this.props.state.accounts;

    async loadSupplier(){
        var result = null;
        try{
            result = await this.cont.methods.getSupplierInfo().call({ from: this.Acc[0] });
            console.log(result);
            this.setState({supplier_id: result[0], supplier_name:result[1] });
            
        }
        catch(e){
            console.log(e);
        }
    }
    
    async placeOrder(event) {
        event.preventDefault();
        let item_id = document.getElementById("item_id").value;
        let manufacturer = document.getElementById("manufacturer").value;
        let quantity = document.getElementById("quantity").value;
        let quality = document.getElementById("quality").value;
        let quantity_scale = document.getElementById("quantity_scale").value;
        var result = null;
        try {
            result = await this.cont.methods.placeOrder(manufacturer, item_id, quantity, quantity_scale, quality).send({ "from": this.Acc[0] });
            console.log(result);
        }
        catch (e) {
            console.log(e);
        }

    }

    async loadSupplierOrders(){
        try{
            let result = await this.cont.methods.getSupplierOrders().call({ from: this.Acc[0] });
            console.log(result);
            this.setState({orders: result });
            
        }
        catch(e){
            console.log(e);
        }
    }
    componentDidMount(){
        this.loadSupplier();
        this.loadSupplierOrders();
    }
    render() {
        let {supplier_id, supplier_name, orders} = this.state;
        return (
            <div>
                <Card>
                    <div >
                        <b>Id: </b>{supplier_id} <br></br>
                        <b>Name:</b> {supplier_name}<br></br>
                    </div>
                </Card>

                <div className="mt-4" style={{border:'2px solid black'}}>
                    <h5>Your Orders</h5>
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
                        orders.slice(0, orders.length).map((order,index
                        ) => {
                            //  this.loadStates(order);
            
                            return (
                                
                                    <div className="div-table" >
                                
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
                <div className="container" style={{height: '800px'}}>
                    <div className="row mt-4"  style={{border:'1px solid black'}}>
                        <h5>Place Order</h5>
                        <form  onSubmit={this.placeOrder}>
                            <table>

                                <tr>
                                    <td><input type='text' id='item_id' placeholder='item Id' /></td>
                                </tr>

                                <tr>
                                    <td><input type="text" id='manufacturer' placeholder='Supplier Address' /></td>
                                </tr>

                                <tr>
                                    <td><input type="text" id='quantity' placeholder='Quantity' /></td>
                                </tr>

                                <tr>
                                    <td><input type="text" id='quantity_scale' placeholder='Quantity units' /></td>
                                </tr>

                                <tr>
                                    <td><input type="text" id='quality' placeholder='Quality' /></td>
                                </tr>

                                <br></br>
                                <button className='button-84' type="submit" value="submit">Place Order</button>
                            </table>
                            <br></br>
                        </form>
                    
                    </div>
                </div>
            </div>
        );
    }
}

export default Supplier;