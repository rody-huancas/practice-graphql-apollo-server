import { useMutation } from "@apollo/client";
import { useState } from "react";
import { EDIT_NUMBER } from "./persons/graphql-mutations";

export const PhoneForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [changeNumber] = useMutation(EDIT_NUMBER)

  const handleSubmit = (e) => {
    e.preventDefault();

    changeNumber({ variables: { name, phone } });

    setName("");
    setPhone("");
  };

  return (
    <div>
      <h2>Edit Phone Number</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(evt) => setName(evt.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(evt) => setPhone(evt.target.value)}
        />

        <button>Change Phone</button>
      </form>
    </div>
  );
};
