import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";

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

export const Persons = ({ persons }) => {
  const [getPerson, result] = useLazyQuery(FIND_PERSON);

  const [person, setPerson] = useState(null);

  const showPerson = (name) => {
    getPerson({ variables: { nameToSeach: name } });
  };

  useEffect(() => {
    if (result.data) {
      setPerson(result.data.findPerson);
    }
  }, [result]);

  if (person) {
    return (
      <div>
        <h2>{person.name}</h2>
        <div>
          {person.address.street}, {person.address.city}
        </div>
        <div>{person.phone}</div>
        <button onClick={() => setPerson(null)}>close</button>
      </div>
    );
  }
  if (persons === null) return null;

  return (
    <div>
      <h2>Persons</h2>
      {persons.map((person) => (
        <div key={person.id} onDoubleClick={() => showPerson(person.name)}>
          {person.name} {person.phone}
        </div>
      ))}
    </div>
  );
};
