/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mtnhufpv3lwfuwt")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dgde92bj",
    "name": "brand",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mtnhufpv3lwfuwt")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dgde92bj",
    "name": "mercedes",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
