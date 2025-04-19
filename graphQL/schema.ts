import { buildSchema } from "graphql";

export const schema = buildSchema(`
 type CatGql {
    id:ID!
    name: String!
    position: Int
    template: Int
  }

type ObjCatGql {
    id:ID!    
}

type ObjGql {
    id:ID!
    name: String!
    template: Int
    cat : ObjCatGql!
  }

type YearGql {
    name: String!
  }


input objectsWhereInput {
  id: ID
  catId : ID
}

type Query {
    categories: [CatGql!]!
    objects (where: objectsWhereInput): [ObjGql!]!
    years :  [YearGql!]!
  }

`)
