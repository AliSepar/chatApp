import Chat from "./components/chat/Chat";
import Details from "./components/details/Details";
import List from "./components/list/List";
import Login from "./components/login/Login";

const App = () => {
  const user = false;

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
    </main>
  );
};

export default App;
