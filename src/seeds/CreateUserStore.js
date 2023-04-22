const { Role, Store } = require('../db');
const {ROLES_ENUM} = require("../models/utils/constants")
const { userPostController } = require("../controllers/user/user-post_controller")

const managerRoleId = 2;
const fakeRoles = [
    {id: 1, name: ROLES_ENUM[0], description: "Este es el rol Consumidor / Cliente" },
    {id: 2, name: ROLES_ENUM[1], description: "Este es el rol correspondiente al Gerente general o Dueño del estabecimiento" },
    {id: 3, name: ROLES_ENUM[2], description: "Este es el rol correspondiente al Cajero del estabecimiento" },
    {id: 4, name: ROLES_ENUM[3], description: "Este es el rol correspondiente al Cocinero del estabecimiento, que puede procesar las ordenes a media que van llegando" },
]
const profile_image = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png";

const description = `Una tienda tan buena que usa Lorem Ipsum
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pretium dui et tempor condimentum. Proin sollicitudin neque ut arcu blandit maximus. Nam urna dolor, consectetur eu efficitur sed, aliquet vestibulum elit. Proin lobortis consequat velit, at posuere sapien molestie ac. Sed nec euismod nunc, quis tempus tortor. Aliquam erat volutpat. Nulla in nisi at est placerat rutrum eget non est. Nunc vitae sem at risus scelerisque aliquam vitae vitae libero. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec aliquet fermentum metus, et rhoncus dolor convallis sit amet. In et commodo felis.

Ut congue interdum luctus. Nunc gravida rutrum risus, eu suscipit massa laoreet dapibus. Vestibulum dictum nisi a dolor fermentum, ut aliquam ligula ornare. Sed imperdiet elit in venenatis vestibulum. Mauris venenatis ligula eget hendrerit pharetra. Nulla facilisi. Curabitur nec euismod enim. Suspendisse in nisl sed diam commodo porta quis non ligula. Sed rhoncus purus eget iaculis sodales. Suspendisse lacinia nibh ac mauris vulputate, gravida gravida felis imperdiet. Aliquam tempor, tellus viverra faucibus dignissim, tellus lectus varius nulla, interdum pharetra dui urna sit amet odio.
`
const logo1 = "https://cdn-icons-png.flaticon.com/512/158/158344.png"
const logo2 = "https://png.pngtree.com/png-clipart/20190515/original/pngtree-coffee-time-png-image_3626459.jpg";
const id = "f3bc0474-620c-429d-a46c-df2460c7725a"
const id2 = "eb311a9e-7c64-4c3d-bce3-1ce5e474e532"
const fakeStores = [
        {id, name: "Tienda de Pepita", short_name: "pepitas",description, logo: logo1, store_type: "Traveling Business",
        mercado_pago: "Esto es texto plano", ownerId: 3, is_active: true},
        {id: id2, name: "Tienda de Maria", short_name: "mari4",description, logo: logo2, store_type: "Traveling Business",
        mercado_pago: "Esto es texto plano", ownerId: 2, is_active: true}
]
module.exports = async function() {
    await Role.bulkCreate(fakeRoles)
    await new Promise(resolve => setTimeout(resolve, 400)); // Esperar 400 ms
    await userPostController( "Carlos", "Mengano", "CarlosM", "12345678", "a@a.com", "555888666", profile_image, roleId = managerRoleId )
    await userPostController( "Maria", "Perez", "MPerex", "12345678", "c@c.com", "55555555", profile_image, roleId = managerRoleId)
    await userPostController( "Maria", "Perez", "MPerex2", "12345678", "x@x.com", "55555556", profile_image, roleId = managerRoleId)
    await new Promise(resolve => setTimeout(resolve, 400)); 
    await Store.bulkCreate(fakeStores)
    await new Promise(resolve => setTimeout(resolve, 400)); 

}
