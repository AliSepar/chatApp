import ChatList from "./chatList/chatList";
import UserInfo from "./UserInfo/userInfo";

function List() {
  return (
    <section className="hidden md:hidden lg:flex lg:max-w-[25%] flex-col">
      <UserInfo />
      <ChatList />
    </section>
  );
}

export default List;
