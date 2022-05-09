// import React, { Component } from "react";
// import { Card } from "antd";
// class DisplayOrders extends Component {
//   //use of props here
//   state = {
//     from: "",
//     to: "",
//     itemId: "",
//     itemName: "",
//     quality: "",
//     quantity: "",
//     quantity_scale: "",
//     order_id: "",
//   };
//   orders = this.props.props;

//   //  loadStates(order){
//   //   this.setState({
//   //     from: order[0],
//   //     to: order[1],
//   //     order_id: order[2],
//   //     itemId: order[3],
//   //     quantity: order[4],
//   //     quantity_scale: order[5],
//   //     itemName: order[6],
//   //     quality: order[7],
//   //   });
//   // // }
//   // componentDidMount() {

//   // }

//   render() {
//     // let {
//     //   from,
//     //   to,
//     //   itemId,
//     //   itemName,
//     //   quality,
//     //   quantity,
//     //   quantity_scale,
//     //   order_id,
//     // } = this.state;
//     // console.log(from);

//     return (
//       <div class="card card-block">
//         {
//           this.orders.map((
//               from,
//               to,
//               order_id,
//               itemId,
//               quantity,
//               quantity_scale,
//               itemName,
//               quality, index
//             ) => {
//               //  this.loadStates(order);

//               return (
//                 <table>
//                   <tr>
//                     <span><td>Order Id: {order_id} </td></span>
//                   </tr>

//                   <tr>
//                     <td>From: {from} </td>
//                   </tr>
//                   <tr>
//                     <td>To: {to} </td>
//                   </tr>
//                   <tr>
//                     <td>Item Id: {itemId}</td>
//                   </tr>
//                   <tr>
//                     <td>Item Name: {itemName}</td>
//                   </tr>
//                   <tr>
//                     <td>Quality: {quality}</td>
//                   </tr>
//                   <tr>
//                     <td>Quantity: {quantity} </td>
//                   </tr>

//                   <tr>
//                     <td>Quantity Units: {quantity_scale} </td>
//                   </tr>
//                   <tr>
                  
//                   </tr>
//                 </table>
//               );
//           })
            
//         }
//       </div>
//     );
//   }
// }

// export default DisplayOrders;
