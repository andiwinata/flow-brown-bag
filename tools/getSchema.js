const introspectSchema = require('apollo-codegen').introspectSchema

introspectSchema('schema.graphql', 'schema.json')
