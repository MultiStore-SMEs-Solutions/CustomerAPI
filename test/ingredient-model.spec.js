
const { conn } = require("../src/db");
const { Ingredient } = conn.models;
const { INTEGER,  BOOLEAN, STRING, ENUM, JSON } = require("sequelize").DataTypes;
const { INVALID_INGREDIENT_NAME, NOT_A_NUMERIC } = require("../src/models/utils/Ingredient-ErrorMSGs")
const { MEASURES_SHORT } = require("../src/models/utils/constants")



describe("Ingredient Model", () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
  });

  it("should define a Ingredient model with the correct schema", () => {
    // Comprobar que el modelo se ha definido correctamente
    expect(Ingredient).toBeDefined();
    expect(Ingredient.tableName).toBe("Ingredients");

    // Comprobar que el modelo tiene las columnas correctas
    const columns = Object.keys(Ingredient.rawAttributes);
    expect(columns).toContain("id");
    expect(columns).toContain("name");
    expect(columns).toContain("layer");
    expect(columns).toContain("type_measure");
    expect(columns).toContain("ingredients_all");


    // Comprobar los tipos de datos de las columnas
    expect(Ingredient.rawAttributes.id.type).toEqual(INTEGER());
    expect(Ingredient.rawAttributes.name.type).toEqual(STRING(70));
    expect(Ingredient.rawAttributes.layer.type).toEqual(INTEGER());
    expect(Ingredient.rawAttributes.type_measure.type).toEqual(ENUM(MEASURES_SHORT));
    expect(Ingredient.rawAttributes.ingredients_all.type).toEqual(JSON());


      //comprobar las restricciones de datos de las columnas
      expect(Ingredient.rawAttributes.id.allowNull).toEqual(false);
      expect(Ingredient.rawAttributes.id.autoIncrement).toEqual(true);
      expect(Ingredient.rawAttributes.id.primaryKey).toEqual(true);
      expect(Ingredient.rawAttributes.id.field).toEqual("ingredient_id");
      expect(Ingredient.rawAttributes.name.allowNull).toEqual(false);
      expect(Ingredient.rawAttributes.name.unique).toEqual(true);
      expect(Ingredient.rawAttributes.name.validate).toEqual( {
        notNull: {
            msg: INVALID_INGREDIENT_NAME
        },
        notEmpty: {
            msg: INVALID_INGREDIENT_NAME
        },
    });
      expect(Ingredient.rawAttributes.layer.allowNull).toEqual(false);
      expect(Ingredient.rawAttributes.layer.defaultValue).toEqual(0);
      expect(Ingredient.rawAttributes.layer.validate).toEqual({
        isNumeric: {
            msg: NOT_A_NUMERIC
        },
        min: 0,
    });
      expect(Ingredient.rawAttributes.type_measure.defaultValue).toEqual(MEASURES_SHORT[0]);
      expect(Ingredient.rawAttributes.type_measure.values).toEqual(MEASURES_SHORT);
      expect(Ingredient.rawAttributes.type_measure.validate).toEqual({
        isIn: [MEASURES_SHORT]
    });
      expect(Ingredient.rawAttributes.ingredients_all.allowNull).toEqual(true);
  });
});
































// xdescribe("Ingredient Model", () => {
//     beforeAll(async () => {
//         await conn.sync({ force: true });
//     });
//     xdescribe("Part Two", () => {
//         it("Should not create Ingredient if name is not send", async () => {
//             expect.assertions(1);
//             try {
//                 await Ingredient.create({layer: 0, type_measure: MEASURES_SHORT[0] })
//             } catch (error) {
//                 expect(error.message).toEqual("notNull Violation: "+INVALID_INGREDIENT_NAME);
//             }
//         });
//         it("Should not create Ingredient if name is send Empty", async () => {
//             expect.assertions(1);
//             try {
//                 await Ingredient.create({name: "", layer: 0, type_measure: MEASURES_SHORT[0] })
//             } catch (error) {
//                 expect(error.message).toEqual("Validation error: "+INVALID_INGREDIENT_NAME);
//             }
//         });

//         it("Should not create Ingredient if name is send with just Blanks", async () => {
//             expect.assertions(1);
//             try {
//                 await Ingredient.create({name: "     ", layer: 0, type_measure: MEASURES_SHORT[0] })
//             } catch (error) {
//                 expect(error.message).toEqual("Validation error: "+INVALID_INGREDIENT_NAME);
//             }
//         });

//         it("Should not create Ingredient if layer is not an Integer value", async () => {
//             expect.assertions(1);
//             try {
//                 await Ingredient.create({name: "Papa", layer: 0.1 , type_measure: MEASURES_SHORT[0] })
//             } catch (error) {
//                 expect(error.message).toEqual("la sintaxis de entrada no es válida para tipo integer: «0.1»");
//             }
//         });

//         it("Should not create Ingredient if layer is lower that 0", async () => {
//             expect.assertions(1);
//             try {
//                 await Ingredient.create({name: "Papa", layer: -1 , type_measure: MEASURES_SHORT[0] })
//             } catch (error) {
//                 expect(error.message).toEqual("Validation error: Validation min on layer failed");
//             }
//         });

//         it("Should not create Ingredient if layer is not Numeric", async () => {
//             expect.assertions(1);
//             try {
//                 await Ingredient.create({name: "Papa", layer: "a" , type_measure: MEASURES_SHORT[0] })
//             } catch (error) {
//                 expect(error.message).toEqual("Validation error: "+NOT_A_NUMERIC);
//             }
//         });

//         it("Should create Ingredient", async () => {
//             //expect.assertions(1);
//             let ingred = await Ingredient.create({name: "Papa", layer: 0 , type_measure: MEASURES_SHORT[0] })
//             expect(ingred.toJSON()).toHaveProperty("id", 1);
//             expect(ingred.toJSON()).toHaveProperty("name", "Papa");
//             expect(ingred.toJSON()).toHaveProperty("layer", 0);
//             expect(ingred.toJSON()).toHaveProperty("type_measure", "un");

//             let ingred2 = await Ingredient.create({name: "Papa Negra"})
//             expect(ingred2.toJSON()).toHaveProperty("id", 2);
//             expect(ingred2.toJSON()).toHaveProperty("name", "Papa Negra");
//             expect(ingred2.toJSON()).toHaveProperty("layer", 0);
//             expect(ingred2.toJSON()).toHaveProperty("type_measure", "un");
//         });

//         it("Should not create Ingredient if the name alredy exist", async () => {
//             try {
//                 await Ingredient.create({name: "Papa Negra"})
//             } catch (error) {
//                 expect(error.message).toEqual("llave duplicada viola restricción de unicidad «Ingredients_name_key»");
//             }
//         });


//     })
// })
