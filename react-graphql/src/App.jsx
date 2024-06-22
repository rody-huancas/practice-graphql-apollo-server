import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Notify } from "./Notify";
import { Persons } from "./Persons";
import { useState } from "react";
import { PhoneForm } from "./PhoneForm";
import { usePersons } from "./persons/custom-hooks";
import { PersonsForm } from "./PersonsForm";
import "./App.css";

function App() {
  const { data, loading, error } = usePersons();

  const [errorMessage, setErrorMessage] = useState(null);

  if (error) return <span style="color: red">{error}</span>;

  const notifyError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Persons persons={data?.allPersons} />
        </>
      )}
      <Notify errorMessage={errorMessage} />
      <PhoneForm />
      <PersonsForm notifyError={notifyError} />
    </>
  );
}

export default App;
