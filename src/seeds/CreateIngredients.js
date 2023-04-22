const { Ingredient } = require('../db');
const FAKE_INGREDEINTS = [
{ name: "Banana organica", type_measure: "gr", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Ananá orgánico caribeño", type_measure: "un", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Kiwi orgánico neozelandes", type_measure: "un", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Manzanas organicas Oregon", type_measure: "gr", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Uva orgánica verde de Canadá", type_measure: "gr", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a"  },
{ name: "Rosas naturistas", type_measure: "un", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a"  },
{ name: "Flores decorativas de ramo", type_measure: "un", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Uva negra orgánica californiana", type_measure: "gr", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Ciruela orgánica", type_measure: "gr", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Flores silvestres deco", type_measure: "un", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Granada Italiana organic", type_measure: "un", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Uva perita amarilla", type_measure: "gr", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Manzana verde", type_measure: "gr", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Pomelo de Florída", type_measure: "gr", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Banana orgánica Ecuador", type_measure: "gr", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Frutilla de Oregon ", type_measure: "gr", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Frambuesa de Oregon", type_measure: "gr", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Fruta de Dragon", type_measure: "un", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Pelón South Organics", type_measure: "gr", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Melón naranja", type_measure: "un", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a"  },
{ name: "Melón Verde", type_measure: "un", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a"  },
{ name: "Canasto rectangular con tapa", type_measure: "un", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a"  },
{ name: "Canasto modelo 1", type_measure: "un", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Canasto modelo 2", type_measure: "un", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Canasto modelo 3", type_measure: "un", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a"  },
{ name: "Canasto modelo 4", type_measure: "un", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a"  },
{ name: "Canasto modelo 5", type_measure: "un", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Naranja organica de Florida", type_measure: "gr", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a"  },
{ name: "Naranja Dakota Organics", type_measure: "gr", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Mango Venezolano", type_measure: "un", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Pera Exttra Organics Farms", type_measure: "gr", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "canasto modelo 7", type_measure: "un", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "canasto modelo 6", type_measure: "un", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "canasto modelo 8", type_measure: "un", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Mora Silvestre 100%", type_measure: "gr", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Calabaza Dulce", type_measure: "un", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Kaki turco de la granja", type_measure: "gr", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Higo Gigante ", type_measure: "gr", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Mango Colombiano", type_measure: "un", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
]


/* const FAKE_INGREDEINTS = [
    {name: "Agua",layer: 0, ingredients_all: [], type_measure: "ml", store_id: ", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" "},
    {name: "Harina",layer: 0 , ingredients_all: [], type_measure: "gr", store_id: ", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" "},
    {name: "Huevo",layer: 0 , ingredients_all: [], type_measure: "un", store_id: ", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" "},
    {name: "Azucar",layer: 0 , ingredients_all: [], type_measure: "gr", store_id: ", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" "},
    {name: "Sal", layer: 0 , ingredients_all: [], type_measure: "gr", store_id: ", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" "},
    {name: "Carne",layer: 0 , ingredients_all: [], type_measure: "gr", store_id: ", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" "},
    {name: "Cebolla",layer: 0 , ingredients_all: [], type_measure: "gr", store_id: ", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" "},
    {name: "Tomate",layer: 0 , ingredients_all: [], type_measure: "gr", store_id: ", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" "},
    {name: "Lechuga",layer: 0 , ingredients_all: [], type_measure: "gr", store_id: ", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" "},
    {name: "Pimienta",layer: 0 , ingredients_all: [], type_measure: "gr", store_id: ", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" "},
    {name: "Queso Mozzarella",layer: 0 , ingredients_all: [], type_measure: "gr", store_id: ", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" "},
    {name: "Carne Molida",layer: 0 , ingredients_all: [], type_measure: "gr", store_id: ", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" "},
    {name: "Pan Hamburguesa",layer: 0 , ingredients_all: [], type_measure: "un", store_id: ", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" "},
    {name: "Ketchup",layer: 0 , ingredients_all: [], type_measure: "gr", store_id: ", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" "},
    {name: "Mayonesa",layer: 0 , ingredients_all: [], type_measure: "gr", store_id: ", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" "},
    {name: "Levadura Fresca",layer: 0 , ingredients_all: [], type_measure: "gr", store_id: ", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" "},
    {name: "Aceite de Oliva",layer: 0 , ingredients_all: [], type_measure: "ml", store_id: ", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" "},
    {name: "Queso Cheddar",layer: 0 , ingredients_all: [], type_measure: "gr", store_id: ", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" "},
    {name: "Papa",layer: 0 , ingredients_all: [], type_measure: "gr", store_id: ", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" "},
    {name: "Gaseosa",layer: 0 , ingredients_all: [], type_measure: "un", store_id: ", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" "},
    {name: "Limonada",layer: 0 , ingredients_all: [], type_measure: "un", store_id: ", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" "},
    {name: "Te",layer: 0 , ingredients_all: [], type_measure: "un", store_id: ", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" "},
    ]
*/

module.exports = async function() {
      await Ingredient.bulkCreate(FAKE_INGREDEINTS)
      await new Promise(resolve => setTimeout(resolve, 400)); // Esperar 400 ms
 

};