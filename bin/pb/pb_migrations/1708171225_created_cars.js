/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "mtnhufpv3lwfuwt",
    "created": "2024-02-17 12:00:25.932Z",
    "updated": "2024-02-17 12:00:25.932Z",
    "name": "cars",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("mtnhufpv3lwfuwt");

  return dao.deleteCollection(collection);
})
