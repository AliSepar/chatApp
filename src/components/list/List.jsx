import ChatList from "./chatList/ChatList.jsx";
import UserInfo from "./UserInfo/UserInfo.jsx";

function List() {
  return (
    <section className="hidden md:hidden lg:flex lg:max-w-[25%] flex-col">
      <UserInfo />
      <ChatList />
    </section>
  );
}

export default List;
