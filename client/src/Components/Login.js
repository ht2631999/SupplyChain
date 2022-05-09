import React, {Component} from "react";
import '../css/login.css'

class Login extends Component{

    //methods and states here


    state = {
        formNum:null
    };
    
    cont = this.props.state.contract;
    Acc = this.props.state.accounts;

    /**************************************************************************************/
    async registerRetailer(event)
    {
        event.preventDefault();
        let name = document.getElementById('retailer_name').value;
        await this.cont.methods.retailerSignUp(name).send({from: this.Acc[0]});
    }

    async registerConsumer(event)
    {
        event.preventDefault();
        let name = document.getElementById('consumer_name').value;
        await this.cont.methods.consumerSignUp(name).send({from: this.Acc[0]});
    }

    /************************************************************************************/
    async checkOwner(event){
        event.preventDefault();
        var result=null;
        try{
            result = await this.cont.methods.getOwnerInfo().call({from: this.Acc[0]});
            console.log(result);
            this.props.onlogin(result, 4);
        }
        catch(e){
            console.log(e);
        }
        console.log("Check Owner");

    }
    
    async checkManufacturer(event){
        event.preventDefault();
        var result = null;
        try{
            result = await this.cont.methods.getManufacturerInfo().call({from: this.Acc[0]});
            console.log(result);
            this.props.onlogin(result[0], 3);
        }
        catch(e){
            console.log(e);
        }
    }
    
    async checkSupplier(event){
        event.preventDefault();
        var result = null;
        try{
            result = await this.cont.methods.getSupplierInfo().call({from: this.Acc[0]});
            console.log(result);
            this.props.onlogin(result[0], 2);
        }
        catch(e){
            console.log(e);
        }
    }
    
    async checkRetailer(event){
        event.preventDefault();
        var result = null;
        try{
            result = await this.cont.methods.getRetailerInfo().call({from: this.Acc[0]});
            console.log(result);
            this.props.onlogin(result[0], 1);
        }
        catch(e){
            console.log(e);
        }

    }
    
    async checkConsumer(event){
        event.preventDefault();
        var result = null;
        try{
            result = await this.cont.methods.getConsumerInfo().call({from: this.Acc[0]});
            console.log(result);
            this.props.onlogin(result[0], 0);
        }
        catch(e){
            console.log(e);
        }

    }
    /************************************************************************************/




    render(){
        this.checkConsumer = this.checkConsumer.bind(this);
        this.checkManufacturer = this.checkManufacturer.bind(this);
        this.checkOwner = this.checkOwner.bind(this);
        this.checkRetailer = this.checkRetailer.bind(this);
        this.checkSupplier = this.checkSupplier.bind(this);
        this.registerRetailer = this.registerRetailer.bind(this);
        this.registerConsumer = this.registerConsumer.bind(this);
        const ownerForm =
            <div className="container">
            <h5 style={{align:'centre'}}>Owner</h5>

            <div style={{marginLeft:'20px'}}>
                <form>
                
                <br></br>
                <button className="button-84" onClick={this.checkOwner}>Login By Address</button>
                </form>
            </div>
            </div>;

        const manufacturerForm =
            <div className="container">
            <h5 style={{align:'centre'}}>Manufacturer</h5>

            <div style={{marginLeft:'20px'}}>
                <form>
                
                <br></br>
                <button className="button-84" onClick={this.checkManufacturer}>Login By Address</button>
                </form>
            </div>
            </div>;

        const SupplierForm =
            <div className="container">
            <h5 style={{align:'centre'}}>Supplier</h5>

            <div style={{marginLeft:'20px'}}>
                <form>
                
                <br></br>
                <button className="button-84" onClick={this.checkSupplier}>Login By Address</button>
                </form>
            </div>
            </div>;

        const retailerForm = 
            <div className="container">
            <h5 style={{align:'centre'}}>Retailer</h5>

            <div style={{marginLeft:'20px'}}>
                <form onSubmit={this.registerRetailer}>
                <div className="label mt-2"><b>Name:</b></div>
                <input type="text" name="name" id="retailer_name" placeholder="Name"></input><br></br> <br></br>
                
                <button className="button-84" type="submit">Register Retailer</button><p> </p>
                <button className="button-84" onClick={this.checkRetailer}>Login By Address</button>
                </form>
            </div>
            </div>;
        
        const consumerForm = 
            <div className="container">
            <h5 style={{align:'centre'}}>Consumer</h5>

            <div style={{marginLeft:'20px'}}>
                <form onSubmit={this.registerConsumer}>
                <div className="label mt-2"><b>Name:</b></div>
                <input type="text" name="name" id="consumer_name" placeholder="Name"></input> <br></br> <br></br> 
                
                <button className="button-84" type="submit">Register Consumer</button><p> </p>
                <button className="button-84" onClick={this.checkConsumer}>Login By Address</button>
                </form>
            </div>
            </div>;

        const fNum = this.state.formNum;

        let loadForm;
        if(fNum === 0)
        loadForm = consumerForm;
        else if(fNum===1)
        loadForm = retailerForm;
        else if(fNum===2)
        loadForm = SupplierForm;
        else if(fNum===3)
        loadForm = manufacturerForm;
        else if(fNum===4)
        loadForm = ownerForm;
        

        return(
            <div className="loginbody" style={{border:'0px'}}>
                <div className="alterBut" style={{border:'0px'}}>
                    
                <button className="button-18" value="1" onClick={(event)=>this.setState({formNum:0})}>Consumer</button>
                
                <button className="button-18"  value="0" onClick={(event)=>this.setState({formNum:1})}>Retailer</button>

                <button className="button-18"  value="2" onClick={(event)=>this.setState({formNum:2})}>Supplier</button>

                <button className="button-18"  value="3" onClick={(event)=>this.setState({formNum:3})}>Manufacturer</button>

                <button className="button-18"  value="4" onClick={(event)=>this.setState({formNum:4})}>Owner</button>

                </div>
                {loadForm}
            </div>
        )
    }
}

export default Login;