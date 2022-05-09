pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract Supplychain{

    address owner = 0xf7a88B425A72A55b7e641379e7C377B98927F3cb; //assign address from ganache before starting app
    mapping(address => manufacturer) public manufacturers;
    mapping(address => supplier) public suppliers;
    mapping(address => retailer) public retailers;
    mapping(address => consumer) public consumers;
    mapping(uint8 => medicine) public medicines;
    mapping(uint8 => rawMaterial) public rawMaterials;

    mapping(address => uint64) public balanceOf; //to maintain balance of users
    
    mapping(address => order[]) public consumerOrders;
    mapping(address => order[]) public retailerOrders;
    mapping(address => order[]) public supplierOrders;
    mapping(uint8 => order[]) public orders;
    //mapping to store orders b/w different role actors
    //for int =0, orders from supplier to manufacturer will be stored
    //for int =1, orders from retailer to supplier will be stored
    


    uint8 orderno=0; //update on placing the order

    struct order{
        address from;
        address to;
        uint8 id;   
        uint8 itemId;
        uint16 quantity;
        string quantity_scale;
        string item_name;
        uint8 quality;
    }
 
    struct manufacturer {
        address id;
        string name;
        mapping (uint8 => uint128) availableMaterial; //mapping of available raw material id => amount
        uint8[] materialAmount;
    }

    struct supplier {
        address id;
        string name;
        mapping (uint8 => uint16) availableMedicines; //mapping of available medicines id => amount
        uint8[] medicineAmount;
    }
    
    struct consumer {
        address id;
        string name;
    }
    
    struct retailer {
        address id;
        string name;
        mapping (uint8 => uint8) availableStock; //mapping of available medicines id => amount
        uint8[] stock;
    }

    struct medicine {
        uint8 id;
        string name;
        string power;
        uint8 price;
    }

    struct rawMaterial{
        uint8 id;
        string name;
        
    }

    //owner verification modifier
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
  

/************************************************************************************************
                            SignUp functions
**************************************************************************************************/



    function manufacturerSignUp(address _id, string memory _name) public onlyOwner() {
        manufacturer memory m= manufacturers[_id];
        require(!(m.id > address(0x0)));
        manufacturers[_id]= manufacturer({id:_id, name:_name,materialAmount:new uint8[](0)});
    }

    
    function supplierSignUp(address _id, string memory _name) public {
        supplier memory s= suppliers[_id];
        require(!(s.id > address(0x0)));
        suppliers[_id]= supplier({id:_id, name:_name,medicineAmount:new uint8[](0)});
    }

    
    function retailerSignUp( string memory _name) public {
        retailer memory r= retailers[msg.sender];
        require(!(r.id > address(0x0)));
        retailers[msg.sender]= retailer({id:msg.sender, name:_name,stock:new uint8[](0)});
    }

    
    function consumerSignUp( string memory _name) public{
        consumer memory c= consumers[msg.sender];
        require(!(c.id > address(0x0)));
        consumers[msg.sender]= consumer({id:msg.sender, name:_name});
    }

   

/************************************************************************************************
                            Utility functions
**************************************************************************************************/


    event Transfer(address from, address to, uint64 _value);
    function transfer(address _to, uint64 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    } 

    function getOwnerInfo() public view onlyOwner() returns(address){
        return owner;
    }
    function getManufacturerInfo() public view returns(address, string memory, uint8[] memory){
        manufacturer memory m = manufacturers[msg.sender];
        require(m.id > address(0x0));
        return (m.id, m.name, m.materialAmount);
    }

    function getSupplierInfo() public view returns(address, string memory, uint8[] memory){
        supplier memory s = suppliers[msg.sender];
        require(s.id > address(0x0));
        return (s.id, s.name, s.medicineAmount);
    }

    function getRetailerInfo() public view returns(address, string memory){
        retailer memory r = retailers[msg.sender];
        require(r.id > address(0x0));
        return (r.id, r.name);
    }

    function getConsumerInfo() public view returns(address, string memory){
        consumer memory c = consumers[msg.sender];
        require(c.id > address(0x0));
        return(c.id, c.name);
    }

    function placeOrder( address _to, uint8 _itemId, uint16 _quantity, string memory _quantity_scale, uint8 _quality) public {
        supplier memory s= suppliers[msg.sender];
        retailer memory r= retailers[msg.sender];
        consumer memory c= consumers[msg.sender];
        if(s.id > address(0x0))
        {
            rawMaterial memory rm = rawMaterials[_itemId];
            // manufacturer storage m = manufacturers[_to];
            // require(m.id > address(0x0));
            // require(m.availableMaterial[_itemId] >= _quantity);
            // m.availableMaterial[_itemId] = m.availableMaterial[_itemId] - _quantity;
            orders[0].push(order({id:orderno, from:msg.sender, to:_to, itemId: _itemId , item_name: rm.name, quantity: _quantity,  quantity_scale:_quantity_scale, quality: _quality}));
            supplierOrders[msg.sender].push(order({id:orderno, from:msg.sender, to:_to, itemId: _itemId, item_name: rm.name, quantity: _quantity, quantity_scale:_quantity_scale, quality: _quality}));
            orderno++;
        }

        else if(r.id > address(0x0))
        {
            // supplier storage s = suppliers[_to];
            // require(s.id > address(0x0));
            // require(s.availableMedicines[_itemId] >= _quantity);
            medicine memory m = medicines[_itemId];
            orders[1].push(order({id:orderno, from:msg.sender, to:_to, itemId: _itemId , item_name: m.name, quantity: _quantity, quantity_scale:_quantity_scale, quality: _quality}));
            retailerOrders[msg.sender].push(order({id:orderno, from:msg.sender, to:_to, itemId: _itemId , item_name: m.name, quantity: _quantity, quantity_scale:_quantity_scale, quality: _quality}));
            orderno++;
        }

        else if(c.id > address(0x0))
        {
            medicine memory m = medicines[_itemId];    
            consumerOrders[msg.sender].push(order({id:orderno, from:msg.sender, to:_to, itemId: _itemId , item_name: m.name, quantity: _quantity, quantity_scale:_quantity_scale, quality: _quality}));
            orderno++;
        }
    }

    function getConsumerOrders() public view returns(order[] memory){
        
        return consumerOrders[msg.sender];
    }

    function getRetailerOrders() public view returns(order[] memory){
        
        return retailerOrders[msg.sender];
    }
    function getSupplierOrders() public view returns(order[] memory){
        
        return supplierOrders[msg.sender];
    }

    function getOtherOrders() public view returns(order[] memory, order[] memory){
        // consumer memory c= consumers[msg.sender];
        // require(c.id > address(0x0));
        
        return (orders[0],orders[1]);
    }

    function addMedicines(uint8 _id, string memory _name, string memory _power, uint8 _price) public {
        
        medicine storage m = medicines[_id];
        require(m.id == 0);
        medicines[_id] = medicine({id: _id, name: _name, power: _power, price: _price});
    }

    
    function addRawMaterial(uint8 _id, string memory _name) public {
        
        rawMaterial storage rm = rawMaterials[_id];
        require(rm.id == 0);
        rawMaterials[_id]= rawMaterial({id: _id, name: _name});
    }

    // function updateRetailerStock(uint8 _itemId, uint8 _amount) public {
    //     retailer storage r = retailers[msg.sender];
    //     require(r.id > address(0x0));
    //     r.availableStock[_itemId] = _amount;
    // }

    // function updateSupplierStock(uint8 _itemId, uint8 _amount) public {
    //     supplier storage s = suppliers[msg.sender];
    //     require(s.id > address(0x0));
    //     s.availableMedicines[_itemId] = _amount;
    // }

    // function updateManufacturerStock(uint8 _itemId, uint8 _amount) public {
    //     manufacturer storage m = manufacturers[msg.sender];
    //     require(m.id > address(0x0));
    //     m.availableMaterial[_itemId] = _amount;
    // }
}