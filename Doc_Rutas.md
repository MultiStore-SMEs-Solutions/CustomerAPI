
--------------------------------- NEW --------------------------------
# USERS
### .../users/create"
>   *** Espera: ***
>       - METHOD: POST
>       - Body: { name, last_name, account_name, password, email, phone, role_id, profile_image }
>   *** Retorna: ***
>       - Success: { profile_image, id, name, last_name, account_name, email, phone,
                    roleId, updatedAt, createdAt, deletedAt }
>       - Error: Mensaje
### .../users/login"
>   *** Espera: ***
>       - Body: { email, password }
>       - METHOD: POST
>   *** Retorna: ***
>       - Success: { valid, user: { id, name, last_name, email, phone, profile_image, roleId }, storeName }
>       - Error: Mensaje


# ROLES
### .../roles/get"
>   *** Espera: ***
>       - METHOD: GET
>   *** Retorna: ***
>       - Success: [{id, name},{id, name},{id, name}]
>       - Error: Mensaje


# CLOUDINARY - Images Processor
### .../processImage/post
>   *** Espera: ***
>       - Body: { imageStr: String }    imageStr es archivo de Imagen parseado a String
>   *** Retorna: ***
>       - Success: URL de la imagen
>       - Error: Mensaje


# TAGS
### .../tags/create
>   *** Espera: ***
>       - METHOD: POST
>       - Body:  { name }
>       - Headers: { storeName }
>   *** Retorna: ***
>       - Success: { id, name }
>       - Error: Message

### .../tags/delete
>   *** Espera: ***
>       - METHOD: DELETE
>       - Query:  { id }
>       - Headers: { storeName }
>   *** Retorna: ***
>       - Success: 1
>       - Error: Message

### .../tags/get
>   *** Espera: ***
>       - METHOD: GET
>       - Headers: { storeName }
>   *** Retorna: ***
>       - Success: [{id,name},{id,name}...]
>       - Error: Message

### .../tags/update
>   *** Espera: ***
>       - METHOD: PATCH
>       - Body: { id, name }
>       - Headers: { storeName }
>   *** Retorna: ***
>       - Success: { 1 }
>       - Error: Message

### .../tags/apply
>   *** Espera: ***
>       - METHOD: POST
>       - { tagsIds [], menuItemId }
>       - Headers: { storeName }
>         En Esencia borra la el id de menuItemId de la tabla intermedia y setea los tagsIds recibidos
>   *** Retorna: ***
>       - Success: "Done"
>       - Error: Message

# Ingredient
### .../ingredients/create
>   *** Espera: ***
>       - METHOD: POST
>       - Body: { name: String, layer: Integer, type_measure: String, ingredients_all: JSON ARRAY }
>   *** Retorna: ***
>       - Success: { id, name, layer, type_measure, ingredients_all }
>       - Error: Mensaje
### .../ingredients/get
>   *** Espera: ***
>       - METHOD: GET
>   *** Retorna: ***
>       - Success: [{ id, name, layer, type_measure, ingredients_all }, { id, name, layer, type_measure, ingredients_all }, ...]
>       - Error: Mensaje
### .../ingredients/get/:id
>   *** Espera: ***
>       - METHOD: GET
>       - Params: { id }
>   *** Retorna: ***
>       - Success: { id, name, layer, type_measure, ingredients_all  }
>       - Error: Mensaje
### .../ingredients/update
>   *** Espera: ***
>       - METHOD: PATCH
>       - Body: { id, name, type_measure }
>   *** Retorna: ***
>       - Success: { "1" }
>       - Error: Mensaje
### .../ingredients/delete
>   *** Espera: ***
>       - METHOD: DELETE
>       - Params: { id }
>       - Internamente cambia el name agregandole OLD + caracteres Random y aplica borrado logico
>           Nota: Posibilidad de agregar cambio en los JSON en todas las recetas que usan esto
>   *** Retorna: ***
>       - Success: { 1 }
>       - Error: Mensaje


# Recipe
### .../recipes/create
>   *** Espera: ***
>       - Method: POST
>       - Body: { name: String , details: String, produced_amount: Double, type_measure: String, ingredArray: [
                { id: Integer, name: String, layer: 0, waste_rate: Double, amount: Double, type_measure: String },
                { id: Integer, name: String, layer: 0, waste_rate: Double, amount: Double, type_measure: String }, ...
                ]}
>   *** Retorna: ***
>       - Success: { id, name, details, produced_amount }
>       - Error: Mensaje

### .../recipes/get"
>   *** Espera: ***
>       - Method: GET

>   *** Retorna: ***
>       - Success: [
	    { id, name, details, produced_amount, ingredientsList: [
			{ id, name, amount},
            { id, name, amount},
			{ id, name, amount}, ... ]
	    },
        { id, name, details, produced_amount, ingredientsList: [
			{ id, name, amount},
            { id, name, amount},
			{ id, name, amount}, ... ]
	    }
    ]
>       - Error: Mensaje
### .../recipes/get/:id"
>   *** Espera: ***
>       - Params: { id: Integer }
>   *** Retorna: ***
>       - Success: Object Recipe { id, name, details, produced_amount, updatedAt, createdAt }
>       - Error: Mensaje
### .../recipes/delete"
>   *** Espera: ***
>       - Query: { id }
>       - También borrará el Ingrediente con el mismo nombre, de forma logica cambiandoles el nombre primero, agregando " OLD ******".  * representa un caracter random alfanumerico
>   *** Retorna: ***
>       - Success: { 1 }
>       - Error: Mensaje
### .../recipes/update"
>   *** Espera: ***
>       - METHOD: PATCH
>       - Body: { id, name, details }
>       - Actualmente cambia nombre y details de Recipe e Ingredients
>   *** Retorna: ***
>       - Success: { 1 }
>       - Error: Mensaje



# MenuItem
### .../menu/create
>   *** Espera: ***
>       - METHOD: POST
>       - Body: { name,description,price,recomend_first,stock,is_active,url_image, ingredArray: [{ id, quantity },{ id, quantity }, ...], tagsIds: [1,2,3,4...] }
>   *** Retorna: ***
>       - Success: { id, name, description, price, recomend_first, stock, is_active, url_image }
>       - Error: Mensaje

### .../menu/get
>   *** Espera: ***
>       - METHOD: GET
>   *** Retorna: ***

>       - Success: 	[{ id, rating, name, description, price, recomend_first, stock, is_active, url_image, TagsFull: [{name, TagsMenuItems {TagId, MenuItemId}}, ....] Tags: ["","",""...], Ingredients:[] }, .... ]
>       - Error: Mensaje

### .../menu/get/recomended
>   *** Espera: ***
>       - METHOD: GET
>   *** Retorna: ***
>       - Success: 	[{ id, rating, name, description, price, recomend_first, stock, is_active, url_image, Tags: ["","",""...], Ingredients:[] }, ...]
>       - Error: Mensaje

### .../menu/get/:id
>   *** Espera: ***
>       - METHOD: GET
>       - Params: { id }
>   *** Retorna: ***
>       - Success: 	{ id, rating, name, description, price, recomend_first, stock, is_active, url_image, Tags: ["","",""...], Ingredients:[] }
>       - Error: Mensaje

### .../menu/update
>   *** Espera: ***
>       - METHOD: PATCH
>       - Body: { id, name, description, price, recomend_first, stock, is_active, url_image } 
>       - Actualmente cambia TODOS LOS CAMPOS menos el de ingrediente con los valores enviados
>       - IMPORTANTE!! Este metodo cambia, REEMPLAZA TODO en el MenuItem con el id pasado
>   *** Retorna: ***
>       - Success: { 1 }
>       - Error: Mensaje

### .../menu/delete
>   *** Espera: ***
>       - METHOD: DELETE
>       - Query: { id }
>       - Actualmente DESHABILITADO

>   *** Retorna: ***
>       - Success: {  }
>       - Error: Mensaje



---------------------- OLD ---------------------------------
# auth google
### .../auth
>   *** Espera: ***
>       - METHOD: GET
>       - 
>   *** Retorna: ***
>       - 
>       - 


# Cart
### .../carts/get/:id
>   *** Espera: ***
>       - METHOD: GET
>       - Params: { id }
>       - Id de usuario
>   *** Retorna: ***
>       - Success: { my_cart }  // JSON
>       - Error: Mensaje

### .../carts/patch
>   *** Espera: ***
>       - METHOD: PATCH
>       - Body: { id, my_cart }
>       - Id de usuario y el JSON, probablemente ARRAY
>   *** Retorna: ***
>       - Success: { "1" }
>       - Error: Mensaje

# UTILS

### .../orders/predict
>       METHOD: PUT
>       Body: { toPredict :[{MenuItemId:1, quantity:10},{MenuItemId:2, quantity:12}, {MenuItemId:3, quantity:12}] }
>   *** Retorna: ***
>       - Success: [{id, name, amount, type_measure},{id, name, amount, type_measure}, ...]
>       - Error: Mensaje


Hay otras rutas que existen pero no estan implementadas

[{ MenuItemId: 1, quantity : 10}, { MenuItemId: 2, quantity : 12}, { MenuItemId: 3, quantity : 12}]



/** !!! 

        LOGIN
//! TEST AUTH
        headers = {
            authorization: "",
            user_id: ""
        }
        axios.get("url", {body}, headers)
        const token = req.headers.authorization;
        const user_id = req.headers.user_id;
        if (!token)  throw Error('Token no proporcionado');
        if ( !await validateToken(user_id, token) ) throw Error("Token is invalid or expired, Please log in again.")
        const store_id = await getStoreIdByUserId(user_id);
        !!! **\
