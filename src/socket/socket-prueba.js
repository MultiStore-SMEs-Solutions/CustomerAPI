const { Order, Op, OrdersMenu, MenuItem } = require("../db");
const {value} = require("../seeds/index")




module.exports = async (io) => {
  console.log("tuki");
  
  
  
//   console.log(orders);
  // console.log(result);
  // let data = await Promise.all(
  //   result.map(async (result) => {
  //     const resultMenu = result.MenuItems.map((menu) => {
  //       console.log('entramos');
  //       console.log(menu.dataValues.name);
  //       return {
  //         name: menu.dataValues.name,
  //       };
  //     });

  //     return {
  //       order_1: result.id,
  //       code: result.code,
  //       client: result.client_data,
  //       status: result.status,
  //       datas: resultMenu,
  //     };
  //   })
  // );

  // console.log(data);
  let menuAct = {}
  
  io.on("connection", (socket) => {
    console.log("a user connected" + socket.id);

    socket.on('asd',(data)=> {
      console.log(data,'asdas');
    })
    
    socket.on('update',()=>{
      
      socket.emit('refresh');
    })
    
    socket.on('complete',(data)=>{
      // console.log(data,'asdas');
      menuAct.send = true
      // console.log(menuAct);

      socket.emit('Completado', ('info nueva'))
    })

    // socket.on('front',(data)=>{
    //   console.log(data);
    //   socket.emit('read',('hola'))
    // })
    socket.on("updateOrders",async (data)=>{
        // console.log(menuAct,'acacaca');
      const orders = new Promise((resolve, reject) => {

        setTimeout(async () => {
          let result = await Order.findAll({
            where: { 
              client_data:{"email":data.email} ,
              // status: { [Op.notIn]: ["Sin Pagar"] } 
            },
            include: [{ model: MenuItem }],
          });
          resolve(result);
        }, 8000);
      });
      const result = await orders;
      if (result.length && menuAct.send === true){
        // console.log(result);
        socket.emit("sendOrders",(result) )
        menuAct.send = false
        // console.log(menuAct,'resss');

      }

    })
  });
};
