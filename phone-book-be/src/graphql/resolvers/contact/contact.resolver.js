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
exports.ContactResolver = void 0;
const contact_service_1 = require("../../../services/contact/contact.service");
class ContactResolver {
    static get resolveAll() {
        return [this.resolveQueries(), this.resolveMutations()];
    }
    static resolveQueries() {
        return {
            Query: {
                contacts: (_, args) => __awaiter(this, void 0, void 0, function* () {
                    const query = args.lastName ? { lastName: args.lastName } : {};
                    return yield this.contactService.find(query);
                }),
                searchContact: (_, args) => __awaiter(this, void 0, void 0, function* () {
                    const { lastName } = args;
                    const contact = yield this.contactService.find({ lastName: lastName });
                    return contact;
                })
            }
        };
    }
    static resolveMutations() {
        return {
            Mutation: {
                createContact: (_, args, _context) => __awaiter(this, void 0, void 0, function* () {
                    const { input } = args;
                    const contact = yield this.contactService.create(input);
                    return contact;
                }),
                updateContact: (_, args, _context) => __awaiter(this, void 0, void 0, function* () {
                    const { id, input } = args;
                    const contact = yield this.contactService.updateOne({ _id: id }, input);
                    return contact;
                }),
                deleteContact: (_, args, _context) => __awaiter(this, void 0, void 0, function* () {
                    const deleteId = yield this.contactService.findOneAndDelete({ _id: args.id });
                    return deleteId;
                })
            }
        };
    }
}
exports.ContactResolver = ContactResolver;
ContactResolver.contactService = new contact_service_1.ContactService();
