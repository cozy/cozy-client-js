function indexKey (doc) {
  return doc.type + '/' + doc.id
}

function findByRef (resources, ref) {
  return resources[indexKey(ref)]
}

function handleResource (rawResource, resources) {
  let resource = {
    _id: rawResource.id,
    _type: rawResource.type,
    _rev: rawResource.meta.rev,
    attributes: rawResource.attributes,
    relations: (name) => {
      let rels = rawResource.relationships[name]
      if (rels === undefined || rels.data === undefined) return undefined
      if (rels.data === null) return null
      if (!Array.isArray(rels.data)) return findByRef(resources, rels.data)
      return rels.data.map(ref => findByRef(resources, ref))
    }
  }

  resources[indexKey(rawResource)] = resource

  return resource
}

function handleTopLevel (doc, resources = {}) {
  // build an index of included resource by Type & ID
  const included = doc.included

  if (Array.isArray(included)) {
    included.forEach((r) => handleResource(r, resources))
  }

  if (Array.isArray(doc.data)) {
    return doc.data.map((r) => handleResource(r, resources))
  } else {
    return handleResource(doc.data, resources)
  }
}

export default handleTopLevel
