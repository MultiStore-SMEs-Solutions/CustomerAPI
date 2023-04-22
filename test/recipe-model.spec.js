const { conn } = require("../src/db");
const { INTEGER, STRING, TEXT, FLOAT } = require("sequelize").DataTypes;

const { Recipe } = conn.models;
const {
  INVALID_RECIPE_NAME,
  INVALID_PRODUCED_AMOUNT,MIN_PROD_AMOUNT
} = require("../src/models/utils/Recipe-ErrorMSGs");

describe("Recipe Model structure", () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
  });
  it("should define a Recipe model with the correct schema", () => {
    // Comprobar que el modelo se ha definido correctamente
    expect(Recipe).toBeDefined();
    expect(Recipe.tableName).toBe("Recipes");

    // Comprobar que el modelo tiene las columnas correctas
    const columns = Object.keys(Recipe.rawAttributes);
    expect(columns).toContain("id");
    expect(columns).toContain("name");
    expect(columns).toContain("details");
    expect(columns).toContain("produced_amount");

    // Comprobar los tipos de datos de las columnas
    expect(Recipe.rawAttributes.id.type).toEqual(INTEGER());
    expect(Recipe.rawAttributes.name.type).toEqual(STRING(70));
    expect(Recipe.rawAttributes.details.type).toEqual(TEXT());
    expect(Recipe.rawAttributes.produced_amount.type).toEqual(FLOAT());

    //comprobar las restricciones de datos de las columnas

    expect(Recipe.rawAttributes.id.autoIncrement).toEqual(true);
    expect(Recipe.rawAttributes.id.primaryKey).toEqual(true);
    expect(Recipe.rawAttributes.id.field).toEqual("recipe_id");
    expect(Recipe.rawAttributes.name.unique).toEqual(true);
    expect(Recipe.rawAttributes.name.allowNull).toEqual(false);
    expect(Recipe.rawAttributes.name.validate).toEqual({
      notNull: { msg: INVALID_RECIPE_NAME },
      notEmpty: {
        msg: INVALID_RECIPE_NAME,
      },
    });
    
    expect(Recipe.rawAttributes.details.allowNull).toEqual(true);
    expect(Recipe.rawAttributes.produced_amount.defaultValue).toEqual(MIN_PROD_AMOUNT);
    expect(Recipe.rawAttributes.produced_amount.validate).toEqual({
        isNumeric: {
            msg: INVALID_PRODUCED_AMOUNT
        },
        min: MIN_PROD_AMOUNT,
      });
  });
});

// xdescribe("Recipe Model", () => {
//     beforeAll(async () => {
//         await conn.sync({ force: true });
//     });
//     xdescribe("Part One", () => {
//         it("Should not create Recipe if name is not send", async () => {
//             expect.assertions(1);
//             try {
//                 await Recipe.create({details: "La mejor receta del mundo"})
//             } catch (error) {
//                 expect(error.message).toEqual("notNull Violation: "+INVALID_RECIPE_NAME);
//             }
//         });
//         it("Should not create Recipe if name is send Empty", async () => {
//             expect.assertions(1);
//             try {
//                 await Recipe.create({name: "", details: "La mejor receta del mundo"})
//             } catch (error) {
//                 expect(error.message).toEqual("Validation error: "+INVALID_RECIPE_NAME);
//             }
//         });

//         it("Should not create Recipe if name is send with just Blanks", async () => {
//             expect.assertions(1);
//             try {
//                 await Recipe.create({name: "    ", details: "La mejor receta del mundo"})
//             } catch (error) {
//                 expect(error.message).toEqual("Validation error: "+INVALID_RECIPE_NAME);
//             }
//         });
//         it("Should not create Recipe if produced_amount is not a Numeric value", async () => {
//             expect.assertions(1);
//             try {
//                 await Recipe.create({name: "Hamburguesa", details: "La mejor receta del mundo", produced_amount: "a"})
//             } catch (error) {
//                 expect(error.message).toEqual("Validation error: "+INVALID_PRODUCED_AMOUNT);
//             }
//         });
//         it("Should not create Recipe if produced_amount is lower that 1", async () => {
//             expect.assertions(1);
//             try {
//                 await Recipe.create({name: "Hamburguesa", details: "La mejor receta del mundo", produced_amount: 0.3})
//             } catch (error) {
//                 expect(error.message).toEqual("Validation error: Validation min on produced_amount failed");
//             }
//         });
//         it("Should create Recipe", async () => {
//             //expect.assertions(1);
//             let recipe = await Recipe.create({name: "Hamburguesa test", details: "La mejor receta del mundo"})
//             expect(recipe.toJSON()).toHaveProperty("id", 1);
//             expect(recipe.toJSON()).toHaveProperty("name", "Hamburguesa test");
//             expect(recipe.toJSON()).toHaveProperty("details", "La mejor receta del mundo");
//             expect(recipe.toJSON()).toHaveProperty("produced_amount", 1);
//         });

//         it("Should not create Recipe if the name alredy exist", async () => {
//             //expect.assertions(1);
//             try {
//                 await Recipe.create({name: "Hamburguesa", details: "La segunda mejor receta del mundo"})
//             } catch (error) {
//                 expect(error.message).toEqual("llave duplicada viola restricción de unicidad «Recipes_name_key»");
//             }
//         });

//     })
// })
