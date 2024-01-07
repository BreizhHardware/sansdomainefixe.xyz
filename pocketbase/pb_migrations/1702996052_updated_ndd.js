/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("69ugenu27jv7al7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9nn32mg0",
    "name": "associatedIP",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yxg4qozj",
    "name": "TYPE",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "A",
        "CNAME",
        "AAAA"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("69ugenu27jv7al7")

  // remove
  collection.schema.removeField("9nn32mg0")

  // remove
  collection.schema.removeField("yxg4qozj")

  return dao.saveCollection(collection)
})
