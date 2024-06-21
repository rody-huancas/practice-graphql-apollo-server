import axios from "axios";
import { v1 as uuid } from "uuid";
import { gql, ApolloServer, UserInputError } from "apollo-server";

const persons = [
  {
    name: "Rody",
    phone: "907979796",
    street: "La victoria",
    city: "Chiclayo",
    id: "ee022533-a3ea-4965-81ec-5c2396dc2d73",
  },
  {
    name: "Ana",
    phone: "",
    street: "Avenida Principal",
    city: "Lima",
    id: "d2f3f158-1f70-4c98-b8c2-0a02bb7d58b7",
  },
  {
    name: "Juan",
    phone: "999888777",
    street: "Calle Central",
    city: "Arequipa",
    id: "c8b43e0a-83fc-4d0c-aab5-05c8e0c3d23b",
  },
];

const typeDefs = gql`
  enum YesNo {
    YES
    NO
  }

  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person

    editNumber(name: String!, phone: String!): Person
  }
`;

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: async (root, args) => {
      const { data: personsFromApi } = await axios.get("http://localhost:3333/persons");
      
      if (!args.phone) return personsFromApi;

      const byPhone = (persons) => args.phone === "YES" ? persons.phone : !persons.phone;

      return personsFromApi.filter(byPhone);
    },
    findPerson: (root, args) => {
      const { name } = args;
      return persons.find((person) => person.name === name);
    },
  },
  Mutation: {
    addPerson: (root, args) => {
      if (persons.find((p) => p.name === args.name)) {
        throw new UserInputError("Name is unique", {
          invalidArgs: args.name,
        });
      }
      const person = { ...args, id: uuid() };
      persons.push(person);
      return person;
    },
    editNumber: (root, args) => {
      const personIndex = persons.findIndex((p) => p.name === args.name);
      if (personIndex === -1) return null;

      const person = persons[personIndex];

      const updatedPerson = { ...person, phone: args.phone };
      persons[personIndex] = updatedPerson;

      return updatedPerson;
    },
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`);
});
