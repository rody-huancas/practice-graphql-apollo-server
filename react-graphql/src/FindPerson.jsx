import { gql, useLazyQuery } from "@apollo/client";

const FIND_PERSON = gql`
  query findPersonByName($nameToSeach: String!) {
    findPerson(name: $nameToSeach) {
      id
      name
      phone
      address {
        street
        city
      }
    }
  }
`;

export const FindPerson = () => {
  const [ getPerson, result ] = useLazyQuery(FIND_PERSON);

  return <div>FindPerson</div>;
};
