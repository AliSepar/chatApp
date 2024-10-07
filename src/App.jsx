import Chat from "./components/chat/Chat";
import Details from "./components/details/Details";
import List from "./components/list/List";

const App = () => {
  return (
    <main className="w-[90vw] h-[90vh] flex bg-bgColor rounded-xl backdrop-blur-lg saturate-150 border border-borderColor">
      <List />
      <Chat />
      <Details />
    </main>
  );
};

export default App;
