import { Contact } from "../../models/contact.model";
import { IContact } from "../../interfaces";
import { FilterQuery, QueryOptions, Types, UpdateQuery } from "mongoose";
import { isObject } from "lodash";

export class ContactService {

    public async find(filter: FilterQuery<IContact>, projection?: any, options?: QueryOptions): Promise<IContact[]> {
        try {
          const item: IContact[] = await Contact.find(filter, projection, options);
          return item;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
    
      public async findOneAndDelete(filter: FilterQuery<IContact>, options?: QueryOptions): Promise<Types.ObjectId | undefined> {
        try {
          if (!isObject(filter)) {
            throw new Error("Invalid filter");
          }
    
          const deletedObject = await Contact.findOneAndDelete(filter, options);
    
          return deletedObject?._id;
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    
      public async create(item: IContact): Promise<IContact> {
        try {
          if (!item) {
            throw new Error("Data is required");
          }
    
          const result = await Contact.create(item);
    
          return result;
        } catch (error) {
          throw error;
        }
      }
    
      public async updateOne(condition: FilterQuery<IContact>, body: UpdateQuery<IContact>, options?: QueryOptions): Promise<IContact> {
        if (!body) {
          throw new Error("Body is missing for update");
        }
    
        try {
          const item: IContact | null = await Contact.findOneAndUpdate(condition, body, options);
    
          if (!item) {
            throw new Error("No such item available for update");
          }
    
          return item;
        } catch (error) {
          throw error;
        }
      }
}