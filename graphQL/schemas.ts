import { buildSchema } from "graphql";

export const schema = buildSchema(`
 type Category {
    id:ID!
    name: String!
    position: Int
    template: Int
  }

type ObjCat {
    id:ID!    
}

type Object {
    id:ID!
    name: String!
    template: Int
    cat : ObjCat
  }


 type Query {
    categories: [Category!]!,
    objects: [Object!]!
  }
`)
