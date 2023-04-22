const { STRING } = require("sequelize");
const { conn } = require("../src/db");
const { User } = conn.models;
const { INTEGER, ENUM, TEXT, BOOLEAN } = require("sequelize").DataTypes;
const { INVALID_NAME, INVALID_EMAIL } = require("../src/models/utils/User-ErrorMSGs");

describe("User Model", () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
  });

  describe("User Model structure", () => {
    it("should define a User model with the correct schema", () => {
      // Comprobar que el modelo se ha definido correctamente
      expect(User).toBeDefined();
      expect(User.tableName).toBe("Users");

      // Comprobar que el modelo tiene las columnas correctas
      const columns = Object.keys(User.rawAttributes);
      expect(columns).toContain("id");
      expect(columns).toContain("name");
      expect(columns).toContain("last_name");
      expect(columns).toContain("account_name");
      expect(columns).toContain("email");
      expect(columns).toContain("secret");
      expect(columns).toContain("phone");

      expect(columns).toContain("is_active");
      expect(columns).toContain("activation_token");


      // Comprobar los tipos de datos de las columnas
      expect(User.rawAttributes.id.type).toEqual(INTEGER());
      expect(User.rawAttributes.name.type).toEqual(STRING(70));
      expect(User.rawAttributes.last_name.type).toEqual(STRING(70));
      expect(User.rawAttributes.account_name.type).toEqual(STRING(35));
      expect(User.rawAttributes.email.type).toEqual(STRING());
      expect(User.rawAttributes.secret.type).toEqual(TEXT());
      expect(User.rawAttributes.phone.type).toEqual(STRING());

      expect(User.rawAttributes.is_active.type).toEqual(BOOLEAN());
      expect(User.rawAttributes.activation_token.type).toEqual(STRING());


      //comprobar las restricciones de datos de las columnas
      expect(User.rawAttributes.id.allowNull).toEqual(false);
      expect(User.rawAttributes.id.autoIncrement).toEqual(true);
      expect(User.rawAttributes.id.primaryKey).toEqual(true);
      expect(User.rawAttributes.id.field).toEqual("user_id");
      expect(User.rawAttributes.name.allowNull).toEqual(false);
      expect(User.rawAttributes.name.validate).toEqual({
        is: /^[a-zA-Z íáúóéÍÁÓÚÉñÑ]*$/,
        notEmpty: true,
        notNull: {
          msg: INVALID_NAME
        }
      },);
      expect(User.rawAttributes.account_name.allowNull).toEqual(false);
      expect(User.rawAttributes.account_name.unique).toEqual(true);
      expect(User.rawAttributes.email.allowNull).toEqual(false);
      expect(User.rawAttributes.email.unique).toEqual(true);
      expect(User.rawAttributes.email.validate).toEqual( {
        isEmail: {
          msg: INVALID_EMAIL
        },
        notEmpty: true,
        notNull: {
          msg: INVALID_EMAIL
        }
      });
      expect(User.rawAttributes.secret.allowNull).toEqual(false);
      expect(User.rawAttributes.phone.allowNull).toEqual(true);

      expect(User.rawAttributes.is_active.defaultValue).toEqual(false);
      expect(User.rawAttributes.activation_token.allowNull).toEqual(false);

    });
  });

});






// xdescribe("User Model", () => {
//   beforeAll(async () => {
//     await conn.sync({ force: true });
//   });
//   xdescribe("Part One", () => {
//     it("Should not create User if name is not send", async () => {
//       expect.assertions(1);
//       try {
//         await User.create({
//           last_name: "kamarasov",
//           account_name: "alexrasov45",
//           email: "a_kararasov45@gmail.com",
//         });
//       } catch (error) {
//         expect(error.message).toEqual("notNull Violation: " + INVALID_NAME);
//       }
//     });
//     it("Should not create User if name is send Empty", async () => {
//       expect.assertions(1);
//       try {
//         await User.create({
//           name: "",
//           last_name: "kamarasov",
//           account_name: "alexrasov45",
//           email: "a_kararasov45@gmail.com",
//         });
//       } catch (error) {
//         expect(error.message).toEqual("notNull Violation: " + INVALID_NAME);
//       }
//     });
//     it("Should not create User if name is send with just Blanks", async () => {
//       expect.assertions(1);
//       try {
//         await User.create({
//           name: "    ",
//           last_name: "kamarasov",
//           account_name: "alexrasov45",
//           email: "a_kararasov45@gmail.com",
//         });
//       } catch (error) {
//         expect(error.message).toEqual("notNull Violation: " + INVALID_NAME);
//       }
//     });
//     it("Should not create User if last_name is not send", async () => {
//       expect.assertions(1);
//       try {
//         await User.create({
//           name: "alexander",
//           account_name: "alexrasov45",
//           email: "a_kararasov45@gmail.com",
//         });
//       } catch (error) {
//         expect(error.message).toEqual("Validation error: " + INVALID_LAST_NAME);
//       }
//     });
//   });
//   it("Should not create User if last_name is send Empty", async () => {
//     expect.assertions(1);
//     try {
//       await User.create({
//         name: "alexander",
//         last_name: "",
//         account_name: "alexrasov45",
//         email: "a_kararasov45@gmail.com",
//       });
//     } catch (error) {
//       expect(error.message).toEqual("Validation error: " + INVALID_LAST_NAME);
//     }
//   });

//   it("Should not create User if last_name is  send with just Blanks", async () => {
//     expect.assertions(1);
//     try {
//       await User.create({
//         name: "alexander",
//         last_name: "    ",
//         account_name: "alexrasov45",
//         email: "a_kararasov45@gmail.com",
//       });
//     } catch (error) {
//       expect(error.message).toEqual("Validation error: " + INVALID_LAST_NAME);
//     }
//   });

//   it("Should not create User if account_name  is not send", async () => {
//     expect.assertions(1);
//     try {
//       await User.create({
//         name: "alexander",
//         last_name: "kamarasov",
//         email: "a_kararasov45@gmail.com",
//       });
//     } catch (error) {
//       expect(error.message).toEqual(
//         "Validation error: " + INVALID_ACCOUNT_NAME
//       );
//     }
//   });
//   it("Should not create User if email is not send", async () => {
//     expect.assertions(1);
//     try {
//       await User.create({
//         nname: "alexander",
//         last_name: "kamarasov",
//         account_name: "alexrasov45",
//       });
//     } catch (error) {
//       expect(error.message).toEqual("Validation error: " + INVALID_EMAIL_EMPTY);
//     }
//   });
//   it("Should create User", async () => {
//     //expect.assertions(1);
//     let User = await User.create({
//       name: "alexander",
//       last_name: "kamarasov",
//       account_name: "alexrasov45",
//       email: "a_kararasov45@gmail.com",
//     });
//     expect(User.toJSON()).toHaveProperty("id", 1);
//     expect(User.toJSON()).toHaveProperty("name", "alexander");
//     expect(User.toJSON()).toHaveProperty("last_name", "kamarasov");
//     expect(User.toJSON()).toHaveProperty(" account_name", "alexrasov45");
//     expect(User.toJSON()).toHaveProperty(" email", "a_kararasov45");
//   });

//   it("Should not create User if the name alredy exist", async () => {
//     //expect.assertions(1);
//     try {
//       await User.create({
//         name: "andrey",
//         last_name: "silvano",
//         account_name: "alexrasov45",
//         email: "silvano_Andrey91@gmail.com",
//       });
//     } catch (error) {
//       expect(error.message).toEqual(
//         "llave duplicada viola restricción de unicidad «Users_account_name_key»"
//       );
//     }
//   });
// });
