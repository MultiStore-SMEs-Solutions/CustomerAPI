const { IngredientsMenuItems, MenuItem } =require("../db")


const FAKE_RELATIONS = [
{ quantity: 500, MenuItemId: 1,  IngredientId:1 },
{ quantity: 1, MenuItemId:  1,  IngredientId:2 },
{ quantity: 6, MenuItemId: 1,  IngredientId:3 },
{ quantity: 840, MenuItemId: 1,  IngredientId: 4 },
{ quantity: 630, MenuItemId: 1,  IngredientId: 5 },
{ quantity: 770, MenuItemId: 1,  IngredientId: 8 },
{ quantity: 700, MenuItemId: 1,  IngredientId:28 },
{ quantity: 750, MenuItemId: 2,  IngredientId:12 },
{ quantity: 7, MenuItemId: 2,  IngredientId:3 },
{ quantity: 7, MenuItemId: 2,  IngredientId:11 },
{ quantity: 1, MenuItemId: 2,  IngredientId:24 },
{ quantity: 1, MenuItemId: 2,  IngredientId:10 },
{ quantity: 800, MenuItemId: 2,  IngredientId:29 },
{ quantity: 500, MenuItemId: 2,  IngredientId:9 },
{ quantity: 350, MenuItemId: 2,  IngredientId:1 },
{ quantity: 1, MenuItemId: 3,  IngredientId:25 },
{ quantity: 1000, MenuItemId: 3,  IngredientId:15 },
{ quantity: 4, MenuItemId: 3,  IngredientId:11 },
{ quantity: 500, MenuItemId: 3,  IngredientId:13 },
{ quantity: 600, MenuItemId: 3,  IngredientId: 4 },
{ quantity: 400, MenuItemId: 3,  IngredientId:28 },
{ quantity: 2, MenuItemId: 5,  IngredientId:25 },
{ quantity: 2000, MenuItemId: 5,  IngredientId:15 },
{ quantity: 8, MenuItemId: 5,  IngredientId:11 },
{ quantity: 1000, MenuItemId: 5,  IngredientId:13 },
{ quantity: 1200, MenuItemId: 5,  IngredientId: 4 },
{ quantity: 800, MenuItemId: 5,  IngredientId:28 },
{ quantity: 1, MenuItemId: 6,  IngredientId:26 },
{ quantity: 130, MenuItemId: 6,  IngredientId:13 },
{ quantity: 700, MenuItemId: 6,  IngredientId: 4 },
{ quantity: 350, MenuItemId: 6,  IngredientId: 31 },
{ quantity: 500, MenuItemId: 6,  IngredientId: 5 },
{ quantity: 500, MenuItemId: 6,  IngredientId: 8 },
{ quantity: 1, MenuItemId: 1,  IngredientId: 23 },
{ quantity: 700, MenuItemId: 7,  IngredientId: 19 },
{ quantity: 560, MenuItemId: 7,  IngredientId: 31 },
{ quantity: 400, MenuItemId: 7,  IngredientId: 5 },
{ quantity: 400, MenuItemId: 7,  IngredientId: 8 },
{ quantity: 5, MenuItemId: 7,  IngredientId:3 },
{ quantity: 800, MenuItemId: 7,  IngredientId:29 },
{ quantity: 950, MenuItemId: 7,  IngredientId: 4 },
{ quantity: 380, MenuItemId: 7,  IngredientId:1 },
{ quantity: 1, MenuItemId: 7,  IngredientId:27 },
{ quantity: 1, MenuItemId: 8,  IngredientId:32 },
{ quantity: 850, MenuItemId: 8,  IngredientId: 5 },
{ quantity: 450, MenuItemId: 8,  IngredientId: 8 },
{ quantity: 700, MenuItemId: 8,  IngredientId: 4 },
{ quantity: 2, MenuItemId: 8,  IngredientId:18 },
{ quantity: 1, MenuItemId: 8,  IngredientId:20 },
{ quantity: 800, MenuItemId: 8,  IngredientId:37 },
{ quantity: 5, MenuItemId: 8,  IngredientId:39 },
{ quantity: 760, MenuItemId: 8,  IngredientId:16 },
{ quantity: 860, MenuItemId: 8,  IngredientId:17 },
{ quantity: 850, MenuItemId: 8,  IngredientId:9 },
{ quantity: 680, MenuItemId: 8,  IngredientId:15 },
{ quantity: 1, MenuItemId: 9,  IngredientId:22 },
{ quantity: 7, MenuItemId: 9,  IngredientId:6 },
{ quantity: 1, MenuItemId: 9,  IngredientId:7 },
{ quantity: 8, MenuItemId: 9,  IngredientId:3 },
{ quantity: 1, MenuItemId: 9,  IngredientId:2 },
{ quantity: 1, MenuItemId: 9,  IngredientId:21 },
{ quantity: 900, MenuItemId: 9,  IngredientId:29 },
{ quantity: 600, MenuItemId: 9,  IngredientId: 4 },
{ quantity: 500, MenuItemId: 9,  IngredientId:16 },
{ quantity: 350, MenuItemId: 9,  IngredientId: 5 },
{ quantity: 2, MenuItemId: 10,  IngredientId:22 },
{ quantity: 14, MenuItemId: 10,  IngredientId:6 },
{ quantity: 2, MenuItemId: 10,  IngredientId:7 },
{ quantity: 16, MenuItemId: 10,  IngredientId:3 },
{ quantity: 2, MenuItemId: 10,  IngredientId:2 },
{ quantity: 2, MenuItemId: 10,  IngredientId:21 },
{ quantity: 1800, MenuItemId: 10,  IngredientId:29 },
{ quantity: 1200, MenuItemId: 10,  IngredientId: 4 },
{ quantity: 1000, MenuItemId: 10,  IngredientId:16 },
{ quantity: 700, MenuItemId: 10,  IngredientId: 5 },
{ quantity: 2, MenuItemId: 11,  IngredientId:22 },
{ quantity: 14, MenuItemId: 11,  IngredientId:6 },
{ quantity: 3, MenuItemId: 11,  IngredientId:7 },
{ quantity: 24, MenuItemId: 11,  IngredientId:3 },
{ quantity: 3, MenuItemId: 11,  IngredientId:2 },
{ quantity: 3, MenuItemId: 11,  IngredientId:21 },
{ quantity: 2700, MenuItemId: 11,  IngredientId:29 },
{ quantity: 1800, MenuItemId: 11,  IngredientId: 4 },
{ quantity: 1500, MenuItemId: 11,  IngredientId:16 },
{ quantity: 1050, MenuItemId: 11,  IngredientId: 5 },
]

const FAKE_MENUITEMS = [
{ name: "Canasto de frutas orgánico clásico", description: "Ideal para cualquier ocasión", price: 45, recomend_first: true, stock: 333, is_active: true, url_image: "https://res.cloudinary.com/group7foodexpress/image/upload/v1678148725/d0bcupmphfqxiq7ugsy9.jpg", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" }, 
{ name: "Canasto Floral Aniversario", description: "Agasaje a la persona amada con este ramo espectacular presente", price: 36, recomend_first: true, stock: 26, is_active: true, url_image: "https://res.cloudinary.com/group7foodexpress/image/upload/v1678150203/gxlimir3mkwvxxsjns1t.jpg", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Fruta de estación Organica", description: "La más fresca, directo de la granja, para los paladares más caprichosos", price: 26, recomend_first: true, stock: 15, is_active: true, url_image: "https://res.cloudinary.com/group7foodexpress/image/upload/v1678150481/ynl2zkvzbkrx2i2ojgtx.jpg", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Fruta de estación Organica x2", description: "Son dos canastos de  la más fresca, fruta directo de la granja, para disfrutar y compartir. Incluye canasto artesanal de beneficencia", price: 26, recomend_first: true, stock: 15, is_active: true, url_image: "https://res.cloudinary.com/group7foodexpress/image/upload/v1678150736/sqfcsn0i1oydsliscbw6.jpg", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Timpo de cosecha", description: "Una espectacular selección de lo lo más maduro de las frutas europeas", price: 28.95, recomend_first: true, stock: 45, is_active: true, url_image: "https://res.cloudinary.com/group7foodexpress/image/upload/v1678151172/e3ssoconjc3ypj84huix.jpg", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Fin del verano", description: "Super fresca . La más fresca, directo de la granja, para los paladares más caprichosos", price: 32.05, recomend_first: false, stock: 888, is_active: true, url_image: "https://res.cloudinary.com/group7foodexpress/image/upload/v1678152085/b4fmqiq0onbyjtxlnnei.jpg", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Dulce Gigante `Tutti Frutti`", description: "Agasaje a la persona amada o a un escuadrón de familiares con este ramo espectacular presente", price: 96.95, recomend_first: true, stock: 23, is_active: true, url_image: "https://res.cloudinary.com/group7foodexpress/image/upload/v1678153986/wbwiqhamhutqwdiiodtl_mpyyv9.jpg", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Mi Fresco Valentín", description: "Le presente mas espectacular para el día de los enamorados", price: 41.05, recomend_first: true, stock: 144, is_active: true, url_image: "https://res.cloudinary.com/group7foodexpress/image/upload/v1678155335/zeikezgi4vqbvqx5ozpq_mkrbkq.jpg", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Mi Fresco Valentín x2", description: "Le presente mas espectacular para el día de los enamorados, y por que no, para ti también. Dese el gusto!", price: 79.45, recomend_first: true, stock: 57, is_active: true, url_image: "https://res.cloudinary.com/group7foodexpress/image/upload/v1678155423/zeikezgi4vqbvqx5ozpq_o8iliu.jpg", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Mi Fresco Valentín x3", description: "Los Poliamoroso están de fiesta. El presente mas espectacular para el día de los enamorados. Dense el gusto!", price: 114.95, recomend_first: true, stock: 25, is_active: true, url_image: "https://res.cloudinary.com/group7foodexpress/image/upload/v1678155593/zeikezgi4vqbvqx5ozpq_noyndh.jpg", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },
{ name: "Mi Fresco Valentín x3 10% off", description: "Los Poliamoroso están de fiesta. El presente mas espectacular para el día de los enamorados. Dense el gusto!", price: 104.85, recomend_first: true, stock: 25, is_active: true, url_image: "https://res.cloudinary.com/group7foodexpress/image/upload/v1678155593/zeikezgi4vqbvqx5ozpq_noyndh.jpg", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a" },

]
module.exports = async function() {
    await MenuItem.bulkCreate(FAKE_MENUITEMS);
    await new Promise(resolve => setTimeout(resolve, 400)); // Esperar 400 ms
    await IngredientsMenuItems.bulkCreate(FAKE_RELATIONS);
    await new Promise(resolve => setTimeout(resolve, 400)); 
    /*setTimeout(async () => {
        const promises = [
            await MenuItem.bulkCreate(FAKE_MENUITEMS)
          ];
        await Promise.all(promises);
      }, 490)
    setTimeout(async () => {
        const promises = [
            await IngredientsMenuItems.bulkCreate(FAKE_RELATIONS)
          ];
        await Promise.all(promises);
      },890)*/
}
