export interface ContactInterface {
  _id: string;
  firstName: string;
  lastName: string;
  number: string;
}

export interface ContactInput extends Omit<ContactInterface, "_id"> {}