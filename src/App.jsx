import { useEffect } from "react";
import Chat from "./components/chat/Chat";
import Details from "./components/details/Details";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";

const App = () => {
  const user = false;

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log(user);
    });

    // cleanup function
    return () => {
      unSub();
    };
  }, []);

  return (
    <main className="w-[90vw] h-[90vh] flex bg-bgColor rounded-xl backdrop-blur-lg saturate-150 border border-borderColor">
      {user ? (
        <>
          <List />
          <Chat />
          <Details />
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </main>
  );
};

export default App;
