"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchemas = void 0;
const graphql_tools_1 = require("graphql-tools");
const contact_resolver_1 = require("../resolvers/contact/contact.resolver");
const typedefs_1 = require("../typedefs");
const registerSchemas = () => __awaiter(void 0, void 0, void 0, function* () {
    const MainSchema = (0, graphql_tools_1.makeExecutableSchema)({
        resolvers: [
            ...contact_resolver_1.ContactResolver.resolveAll
        ],
        typeDefs: [
            ...typedefs_1.typeDefs
        ],
    });
    const schema = (0, graphql_tools_1.mergeSchemas)({
        schemas: [MainSchema]
    });
    return schema;
});
exports.registerSchemas = registerSchemas;
