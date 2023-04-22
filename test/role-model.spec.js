const { conn } = require("../src/db");
const { Role } = conn.models;
const { INTEGER, ENUM, TEXT, BOOLEAN } = require("sequelize").DataTypes;
const { ROLES_ENUM } = require("../src/models/utils/constants");

describe("Role Model", () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
  });

  describe("Role Model structure", () => {
    it("should define a Role model with the correct schema", () => {
      // Comprobar que el modelo se ha definido correctamente
      expect(Role).toBeDefined();
      expect(Role.tableName).toBe("Roles");

      // Comprobar que el modelo tiene las columnas correctas
      const columns = Object.keys(Role.rawAttributes);
      expect(columns).toContain("id");
      expect(columns).toContain("name");
      expect(columns).toContain("description");
      expect(columns).toContain("is_active");

      // Comprobar los tipos de datos de las columnas
      expect(Role.rawAttributes.id.type).toEqual(INTEGER());
      expect(Role.rawAttributes.name.type).toEqual(ENUM(ROLES_ENUM));
      expect(Role.rawAttributes.description.type).toEqual(TEXT());
      expect(Role.rawAttributes.is_active.type).toEqual(BOOLEAN());

      //comprobar las restricciones de datos de las columnas
      expect(Role.rawAttributes.id.allowNull).toEqual(false);
      expect(Role.rawAttributes.id.autoIncrement).toEqual(true);
      expect(Role.rawAttributes.id.primaryKey).toEqual(true);
      expect(Role.rawAttributes.id.field).toEqual("role_id");
      expect(Role.rawAttributes.name.allowNull).toEqual(false);
      expect(Role.rawAttributes.name.values).toEqual(ROLES_ENUM);
      expect(Role.rawAttributes.description.allowNull).toEqual(true);
      expect(Role.rawAttributes.is_active.defaultValue).toEqual(true);
    });
  });

});
