
const { conn } = require("../src/db");
const { MenuItem } = conn.models;
const { INTEGER, TEXT, STRING, BOOLEAN, FLOAT } = require("sequelize").DataTypes;
const {
  ERROR_NAME,
  ERROR_PRICE,
  ERROR_CREATE_NEW_MENU_ITEM,
} = require("../src/models/utils/MenuItem-ErrorMSGs");


 

  describe("MenuItem Model structure", () => {

    beforeAll(async () => {
      await conn.sync({ force: true });
    });
    it("should define a MenuItem model with the correct schema", () => {


      // Comprobar que el modelo se ha definido correctamente
      expect(MenuItem).toBeDefined();
      expect(MenuItem.tableName).toBe("MenuItems");

      // Comprobar que el modelo tiene las columnas correctas
      const columns = Object.keys(MenuItem.rawAttributes);
      expect(columns).toContain("id");
      expect(columns).toContain("name");
      expect(columns).toContain("description");
      expect(columns).toContain("price");
      expect(columns).toContain("recomend_first");
      expect(columns).toContain("stock");
      expect(columns).toContain("is_active");
      expect(columns).toContain("url_image");

      // Comprobar los tipos de datos de las columnas
      expect(MenuItem.rawAttributes.id.type).toEqual(INTEGER());
      expect(MenuItem.rawAttributes.name.type).toEqual(STRING(70));
      expect(MenuItem.rawAttributes.description.type).toEqual(TEXT());
      expect(MenuItem.rawAttributes.price.type).toEqual(FLOAT());
      expect(MenuItem.rawAttributes.recomend_first.type).toEqual(BOOLEAN());
      expect(MenuItem.rawAttributes.stock.type).toEqual(INTEGER());
      expect(MenuItem.rawAttributes.is_active.type).toEqual(BOOLEAN());
      expect(MenuItem.rawAttributes.url_image.type).toEqual(STRING());

      //comprobar las restricciones de datos de las columnas
      expect(MenuItem.rawAttributes.id.allowNull).toEqual(false);
      expect(MenuItem.rawAttributes.id.autoIncrement).toEqual(true);
      expect(MenuItem.rawAttributes.id.primaryKey).toEqual(true);
      expect(MenuItem.rawAttributes.id.field).toEqual("menu_item_id");
      expect(MenuItem.rawAttributes.name.allowNull).toEqual(false);
      expect(MenuItem.rawAttributes.price.allowNull).toEqual(false);
      expect(MenuItem.rawAttributes.price.defaultValue).toEqual(0);
      expect(MenuItem.rawAttributes.recomend_first.defaultValue).toEqual(false);
      expect(MenuItem.rawAttributes.stock.defaultValue).toEqual(0);
      expect(MenuItem.rawAttributes.is_active.defaultValue).toEqual(true);
      expect(MenuItem.rawAttributes.url_image.allowNull).toEqual(false);
    });
  });


  // describe("Part One", () => {
  //   it("Should not create menu if name is not send", async () => {
  //     expect.assertions(1);
  //     try {
  //       await MenuItem.create({
  //         description: "lorem",
  //         price: 100,
  //         recomend_first: true,
  //         is_active: true,
  //         url_image:
  //           "https://thumbs.dreamstime.com/z/covered-tration-125303590.jpg",
  //       });
  //     } catch (error) {
  //       expect(error.message).toEqual(
  //         `notNull Violation: MenuItem.name cannot be null`
  //       );
  //     }
  //   });
  //   it("Should not create Menu if name is send Empty", async () => {
  //     expect.assertions(1);
  //     try {
  //       await MenuItem.create({
  //         name:undefined,
  //         description: "lorem",
  //         price: 100,
  //         recomend_first: true,
  //         is_active: true,
  //         url_image:
  //           "https://thumbs.dreamstime.com/z/con-125303590.jpg",
  //       });
  //     } catch (error) {
  //       expect(error.message).toEqual("notNull Violation: MenuItem.name cannot be null");
  //     }
  //   });

  //   it("Should not create Menu if name is send with just Blanks", async () => {
  //     expect.assertions(1);
  //     try {
  //       await MenuItem.create({
  //           name:"    ",
  //           description: "lorem",
  //           price: 100,
  //           recomend_first: true,
  //           is_active: true,
  //           url_image:
  //             "https://thumbs.dreamstime.com/z/con-125303590.jpg",
  //         });
  //     } catch (error) {
  //       expect(error.message).toEqual("notNull Violation: MenuItem.url_image cannot be null");
  //     }
  //   });
  //   it("Should not create Menu if price is not a Numeric value", async () => {
  //     expect.assertions(1);
  //     try {
  //       await MenuItem.create({
  //         name: "Hamburguesa",
  //         description:
  //           "carne , ceboola , tomate , lechuga , tocineta , jamon , queso",
  //         price: "a",
  //       });
  //     } catch (error) {
  //       expect(error.message).toEqual(
  //         "Validation error: " + ERROR_PRICE.PRICE_IS_STRING
  //       );
  //     }
  //   });
  //   it("Should not create Recipe if produced_amount is lower that 0", async () => {
  //     expect.assertions(1);
  //     try {
  //       await MenuItem.create({
  //         name: "Hamburguesa",
  //         description:
  //           "carne , ceboola , tomate , lechuga , tocineta , jamon , queso",
  //         price: -0.2,
  //       });
  //     } catch (error) {
  //       expect(error.message).toEqual(
  //         "notNull Violation: MenuItem.url_image cannot be null"
  //       );
  //     }
  //   });
  //   it("Should create Recipe", async () => {
  //     //expect.assertions(1);
  //     let product = await MenuItem.create({
  //       name: "Hamburguesa ranchera",
  //       description:
  //         "carne , ceboola , tomate , lechuga , tocineta , jamon , queso",
  //     });
  //     expect(product.toJSON()).toHaveProperty("id", 1);
  //     expect(product.toJSON()).toHaveProperty("name", "Hamburguesa ranchera");
  //     expect(product.toJSON()).toHaveProperty(
  //       "description",
  //       "carne , ceboola , tomate , lechuga , tocineta , jamon , queso"
  //     );
  //     expect(product.toJSON()).toHaveProperty("price", 100);
  //   });

  //   it("Should not create Recipe if the name alredy exist", async () => {
  //     //expect.assertions(1);
  //     try {
  //       await MenuItem.create({ name: "Hamburguesa ranchera" });
  //     } catch (error) {
  //       expect(error.message).toEqual(
  //         "notNull Violation: MenuItem.url_image cannot be null"
  //       );
  //     }
  //   });
  // });

