import { useEffect } from "react";
import Chat from "./components/chat/Chat";
import Details from "./components/details/Details";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    // cleanup function
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) {
    return (
      <div className="p-[50px] text-[36px] rounded-[10px] bg-[rgba(17,25,40,0.9)]">
        Loading....
      </div>
    );
  }

  return (
    <main className="w-[90vw] h-[90vh] flex bg-bgColor rounded-xl backdrop-blur-lg saturate-150 border border-borderColor">
      {currentUser ? (
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
