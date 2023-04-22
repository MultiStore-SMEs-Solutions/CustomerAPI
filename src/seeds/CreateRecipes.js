const {recipesPostController} = require("../controllers/recipe/recipe-post_controller")

const store_id = "f3bc0474-620c-429d-a46c-df2460c7725a"
const name = "Medallon de Carne 160gr Especial"
const details = "Medallon de carne especial"
const produced_amount = 8
const type_measure= "un"
const ingredArray = [
        {id: 12, name: "Carne Molida", layer: 0, waste_rate: 0, amount: 130, type_measure: "gr"},
        {id: 3, name: "Huevo", layer: 0, waste_rate: 0, amount: 0.6, type_measure: "un"},
        {id: 7, name: "Cebolla", layer: 0, waste_rate: 12,amount: 26, type_measure: "gr"},
        {id: 5, name: "Sal", layer: 0, waste_rate: 0, amount: 0.2, type_measure: "gr"},
        {id: 10, name: "Pimienta", layer: 0, waste_rate: 0, amount: 0.6, type_measure: "gr"},
        {id: 2, name: "Harina", layer: 0, waste_rate: 0, amount: 12.6, type_measure: "gr"}
]


const name1 = "Hambuerguesa Doble"
const details1 = "Con un espectacular medallon de carne especial"
const produced_amount1 = 1
const type_measure1 = "un"
const ingredArray1 = [
        {id: 23, name: "Medallon de Carne 160gr Especial", layer: 1, waste_rate: 0, amount: 2, type_measure: "un"},
        {id: 13, name: "Pan Hamburguesa", layer: 0, waste_rate: 0, amount: 1, type_measure: "un"},
        {id: 7, name: "Cebolla", layer: 0, waste_rate: 12,amount: 26, type_measure: "gr"},
        {id: 9, name: "Lechuga", layer: 0, waste_rate: 0, amount: 50, type_measure: "gr"},
        {id: 8, name: "Tomate", layer: 0, waste_rate: 0, amount: 50, type_measure: "gr"},
        {id: 14, name: "Ketchup", layer: 0, waste_rate: 0, amount: 14, type_measure: "gr"}
]


module.exports = async function() {
    setTimeout(() => { recipesPostController(name, details, produced_amount, type_measure, ingredArray, store_id )}, 300)
    setTimeout(() => { recipesPostController(name1, details1, produced_amount1, type_measure1, ingredArray1, store_id )}, 360)

}
