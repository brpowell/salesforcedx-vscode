const fs = require('fs');
const { join } = require('path');

// Prep the registry
const REGISTRY_FILE = 'registry.json';
const EMPTY_REGISTRY = { types: {}, suffixes: {}, bundles: {} };
const registryPath = join(__dirname, REGISTRY_FILE);
const registry = fs.existsSync(registryPath)
  ? JSON.parse(fs.readFileSync(registryPath))
  : EMPTY_REGISTRY;

// TODO: Replace with api call
const describe = JSON.parse(fs.readFileSync(join(__dirname, 'describe.json')));

for (const object of describe.metadataObjects) {
  const typeId = object.xmlName.toLowerCase();
  const { xmlName: name, suffix, directoryName, inFolder } = object;
  registry.types[typeId] = {
    name,
    suffix,
    directoryName,
    inFolder: inFolder === 'true'
  };
  registry.suffixes[suffix] = typeId;

  // if (!suffix) {
  //   registry.bundles[directoryName] = typeId;
  // }
}

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));

console.log('Registry updated');