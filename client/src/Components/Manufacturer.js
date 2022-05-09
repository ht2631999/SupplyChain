import { Card } from "antd";
import React, { Component } from "react";
import '../css/manufacturer.css'
class Manufacturer extends Component {
  //states and async methods here

  constructor(props){
    super(props);
    this.RegisterSupplier = this.RegisterSupplier.bind(this);
    this.addMateraial = this.addMateraial.bind(this)

  }

  state = {
    id: "",
    name: "",
    orders: []
}
  cont = this.props.state.contract;
  Acc = this.props.state.accounts;

  async loadManufacturerInfo(){
    var result = null;
    try{
    result = await this.cont.methods.getManufacturerInfo().call({ from: this.Acc[0] });
    console.log(result);
    this.setState({id:result[0], name:result[1]});
    }

    catch(e){
      console.log(e);
    }
  }
  async RegisterSupplier(event){
    event.preventDefault();
    let supplier_id= document.getElementById('supplier_id').value;
    let supplier_name= document.getElementById('supplier_name').value;
    console.log(supplier_id);
    console.log(supplier_name);
    var result = null;
    try{
      result = await this.cont.methods.supplierSignUp(supplier_id, supplier_name).send({ from: this.Acc[0] })
      console.log(result);
    }
    catch(e){
      console.log(e);
    }
  }

  async addMateraial(event){
    event.preventDefault();
    let material_id = document.getElementById('material_id').value;
    let material_name = document.getElementById('material_name').value;
    console.log(material_id);
    console.log(material_name);
    
    let result = await this.cont.methods.addRawMaterial(material_id, material_name).send({ from: this.Acc[0] });
    console.log(result);
  }

  componentDidMount(){
    this.loadManufacturerInfo();
  }
  render() {
    let {id, name} = this.state;
    return (
      <div className="container">
        <Card>
            <div >
                <span><b>Id: </b>{id}</span> <br></br>
                <span><b>Name:</b> {name}</span> <br></br>
            </div>
        </Card>
        <div className="row mt-2" >
          <div className="col-6 my-3" style={{border:'1px solid black'}}>
            <h5>Register Supplier</h5>
            <div>
              <form style={{ fontSize:'x-small' }} onSubmit={this.RegisterSupplier}>
                <div className="label mt-2">
                  <b>Blockchain Address:</b>
                </div>
                <input
                  type="text"
                  name="address"
                  id="supplier_id"
                  placeholder="Id"
                ></input>{" "}
                <br></br>
                <div className="label mt-2">
                  <b>Name</b>
                </div>
                <input
                  type="text"
                  name="name"
                  id="supplier_name"
                  placeholder="Name"
                ></input>
                <br></br> <br></br>
                <button className="button-84" variant="dark" type="submit">
                  Register Supplier
                </button>
                <br></br>
                <br></br>
              </form>
            </div>
          </div>
        

        
          <div className="col-6 my-3" style={{border:'1px solid black'}}>
          <h5>Add Material by Id</h5>
          <form style={{ textAlign: 'center', fontSize:'x-small' }} onSubmit={this.addMateraial}>
              <div className="label mt-2">
                  <b >Material Id:</b>
                </div>
                <input
                  type="text"
                  name="address"
                  id="material_id"
                  placeholder="Material Id "
                ></input>{" "}

                <br></br>

                <div className="label mt-2">
                  <b>Material Name:</b>
                </div>
                <input
                  type="text"
                  name="address"
                  id="material_name"
                  placeholder="Material name"
                ></input>{" "} 
                <br></br>
                <br></br>
                
                <button className='button-84' type="submit" value="submit">submit</button>
                <br></br>
                <br></br>
          </form>
          </div>
        </div>

      </div>
    );
  }
}

export default Manufacturer;
