const { conn } = require("../src/db");
const { Password } = conn.models;
const { INTEGER,  BOOLEAN, STRING } = require("sequelize").DataTypes;

describe("Password Model", () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
  });

  it("should define a Password model with the correct schema", () => {
    // Comprobar que el modelo se ha definido correctamente
    expect(Password).toBeDefined();
    expect(Password.tableName).toBe("Passwords");

    // Comprobar que el modelo tiene las columnas correctas
    const columns = Object.keys(Password.rawAttributes);
    expect(columns).toContain("id");
    expect(columns).toContain("user_id");
    expect(columns).toContain("password");
    expect(columns).toContain("is_active");
    expect(columns).toContain("password_question");
    expect(columns).toContain("password_answer");

    // Comprobar los tipos de datos de las columnas
    expect(Password.rawAttributes.id.type).toEqual(INTEGER());
    expect(Password.rawAttributes.user_id.type).toEqual(INTEGER());
    expect(Password.rawAttributes.password.type).toEqual(STRING());
    expect(Password.rawAttributes.is_active.type).toEqual(BOOLEAN());
    expect(Password.rawAttributes.password_question.type).toEqual(STRING());
    expect(Password.rawAttributes.password_question.type).toEqual(STRING());
  });

   //comprobar las restricciones de datos de las columnas
   expect(Password.rawAttributes.id.allowNull).toEqual(false);
   expect(Password.rawAttributes.id.autoIncrement).toEqual(true);
   expect(Password.rawAttributes.id.primaryKey).toEqual(true);
   expect(Password.rawAttributes.id.field).toEqual("password_id");
   expect(Password.rawAttributes.user_id.allowNull).toEqual(false);
   expect(Password.rawAttributes.password.allowNull).toEqual(false);
   expect(Password.rawAttributes.password_question.allowNull).toEqual(false);
   expect(Password.rawAttributes.password_answer.allowNull).toEqual(false);
   
});

