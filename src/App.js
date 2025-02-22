import React, { createContext, useContext, useEffect, useState } from "react";

// Context oluşturma
const UserContext = createContext();

function App() {
  const [userState, setUserState] = useState({
    Namık: true,
    Eda: true,
    Suzan: true,
    Engin: true,
    Samet: true,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const users = Object.keys(userState);
      const randomUser = users[Math.floor(Math.random() * users.length)];

      setUserState((prevState) => ({
        ...prevState,
        [randomUser]: !prevState[randomUser],
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [userState]);

  return (
    <UserContext.Provider value={{ userState, setUserState }}>
      <UserList />
    </UserContext.Provider>
  );
}

const UserList = () => {
  const { userState } = useContext(UserContext);

  return (
    <div>
      <h2>Kullanıcı Durumları</h2>
      <ul>
        {Object.entries(userState).map(([name, isOnline]) => (
          <li key={name}>
            {name} {isOnline ? "🟢" : "🔴"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
