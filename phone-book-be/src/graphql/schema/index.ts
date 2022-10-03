import { makeExecutableSchema, mergeSchemas } from "graphql-tools";
import { ContactResolver } from "../resolvers/contact/contact.resolver";
import { typeDefs } from "../typedefs";

export const registerSchemas = async () => {
  
    const MainSchema = makeExecutableSchema({
      resolvers: [
        ...ContactResolver.resolveAll
      ],
      typeDefs: [
        ...typeDefs
      ],
    });
  
    const schema = mergeSchemas({
      schemas: [MainSchema]
    });
  
    return schema;
  };