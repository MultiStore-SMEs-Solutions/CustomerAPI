const { Tag } = require('../db');

const id = "f3bc0474-620c-429d-a46c-df2460c7725a"
const id2 = "eb311a9e-7c64-4c3d-bce3-1ce5e474e532"

const fakeTags = [
    {name: "Aniversario", store_id: id},
    {name: "Vegano", store_id: id2},
    {name: "Extra Fresco", store_id: id},
    {name: "Vegetariano", store_id: id2},
    {name: "Impresionante", store_id: id},
    {name: "De estación", store_id: id},
    {name: "Naturista", store_id: id2},
    {name: "Toda ocación", store_id: id},
    {name: "Organico", store_id: id2},
    {name: "Recomendacion nuestra", store_id: id},
]

module.exports = async function() {
    await Tag.bulkCreate(fakeTags)
    await new Promise(resolve => setTimeout(resolve, 400)); // Esperar 400 ms

}