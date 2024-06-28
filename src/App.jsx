import { useState, useEffect } from "react";
import Phone from "./components/Phone";
//import Notification from "./components/Notification";
import Footer from "./components/Footer";
import phonesService from "./services/phones";

const App = () => {
  const [phones, setPhones] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [showAll, setShowAll] = useState(true);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [errorMessage, setErrorMessage] = useState("Some error happened...");

  useEffect(() => {
    phonesService.getAll().then((initialPhones) => {
      console.log(initialPhones);
      setPhones(initialPhones);
    });
  }, []);
  console.log("render", phones.length, "phones");

  const handlePhoneChange = (event) => {
    console.log(event.target.value);
    setNewPhone(event.target.value);
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const phonesToShow = showAll
    ? phones
    : phones.filter((phone) => phone.important);

  const toggleImportanceOf = (id) => {
    const phone = phones.find((p) => p.id === id);
    const changedPhone = { ...phone, important: !phone.important };

    phonesService
      .update(id, changedPhone)
      .then((returnedPhone) => {
        setPhones(
          phones.map((phone) => (phone.id !== id ? phone : returnedPhone))
        );
      })
      .catch((error) => {
        setErrorMessage(
          `Phone '${phone.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setPhones(phones.filter((p) => p.id !== id));
      });
  };

  const addContact = (event) => {
    event.preventDefault();
    const phoneObject = {
      name: newName,
      phone: newPhone,
      important: true,
    };
    console.log(phoneObject)
    phonesService.create(phoneObject).then((returnedPhone) => {
      setPhones(phones.concat(returnedPhone));
      setNewPhone("");
      setNewName("");
    });
  };

  return (
    <div>
      <h1>Phones</h1>
      {/*<Notification message={errorMessage} />*/}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? "favorites contacts" : "all contacts"}
        </button>
      </div>
      <ul>
        {phonesToShow.map((phone) => (
          <Phone
            key={phone.id}
            phone={phone}
            toggleImportance={() => toggleImportanceOf(phone.id)}
          />
        ))}
      </ul>
      <form onSubmit={addContact}>
        Name: <input value={newName} onChange={handleNameChange} />
        Number: <input value={newPhone} onChange={handlePhoneChange} />
        <button type="submit">Save contact</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
