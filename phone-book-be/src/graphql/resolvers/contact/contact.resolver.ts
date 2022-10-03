import { IResolvers } from "graphql-tools";
import { Types } from "mongoose";
import { IContact } from "../../../interfaces";
import { ContactService } from "../../../services/contact/contact.service";

export class ContactResolver {

    private static contactService = new ContactService();

    public static get resolveAll(): IResolvers[] {
      return [this.resolveQueries(), this.resolveMutations()];
    }

    private static resolveQueries(): IResolvers {
      return {
        Query: {
          contacts: async (_, args: { lastName?: string}): Promise<IContact[]> => {
            const query = args.lastName ? { lastName: args.lastName } : {};
            return await this.contactService.find(query);
          },
          searchContact: async (_, args: { lastName: string }): Promise<IContact[]> => {
            const { lastName } = args;
            const contact = await this.contactService.find({ lastName: lastName });

            return contact;
          }
        }
      };
    }

    private static resolveMutations(): IResolvers {
      return {
        Mutation: {
          createContact: async (_: any, args: { input: IContact }, _context: any): Promise<IContact> =>  {
              const { input } = args;
              const contact = await this.contactService.create(input);
              return contact;
          },
          updateContact: async (_: any, args: {id: string; input: IContact }, _context: any): Promise<IContact> => {
              const { id, input } = args;
              const contact = await this.contactService.updateOne({ _id: id}, input);
              return contact;
          },
          deleteContact: async (_: any, args: {id: string}, _context: any): Promise<Types.ObjectId | undefined> => {
              const deleteId = await this.contactService.findOneAndDelete({ _id: args.id});
              return deleteId;
          }
        }
      };
    }
}