import { useEffect, useState } from "react";
import AddUser from "./addUser/AddUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";

function ChatList() {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");

  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const items = res.data().chats;

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser.id]);
  // [currentUser.id] if user chang it has to run agin

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    userChats[chatIndex].isSeen = true;

    // updating userchats
    const userChatsRef = doc(db, "userchats", currentUser.id);

    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });

      changeChat(chat.chatId, chat.user);
    } catch (err) {
      console.log(err);
    }
  };

  //filter chat based on the search
  const filteredChat = chats.filter((c) =>
    c.user.username.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="flex-1 scrollbar-custom">
      <div>
        {/* search */}
        <div className="flex items-center gap-5 p-5">
          <div className="searchBar flex-1 flex bg-bgColor items-center gap-5 p-2 rounded-xl">
            <img src="./search.png" alt="" className="w-5" />
            <input
              type="text"
              placeholder="search"
              className="w-[75%] border-none outline-none text-white"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <img
            src={addMode ? "./minus.png" : "./plus.png"}
            onClick={() => setAddMode(!addMode)}
            alt=""
            className="w-9 bg-bgColor p-[10px] rounded-lg cursor-pointer"
          />
        </div>
      </div>
      {filteredChat.map((chat) => {
        return (
          <div
            onClick={() => handleSelect(chat)}
            key={chat.chatId}
            style={{
              backgroundColor: chat?.isSeen ? "transparent" : "#5183fe",
            }}
            className="flex items-center gap-5 p-5 cursor-pointer border-b-[1px] border-[#dddddd35]"
          >
            <img
              src={
                chat.user.blocked.includes(currentUser.id)
                  ? "./avatar.png"
                  : chat.user.avatar || "./avatar.png"
              }
              alt=""
              className="w-[50px] h-[50px] rounded-full"
            />
            <div className="flex flex-col gap-[10px]">
              <span className="font-medium">
                {chat.user.blocked.includes(currentUser.id)
                  ? "User"
                  : chat.user.username}
              </span>
              <p className="font-light text-sm">{chat.lastMessage}</p>
            </div>
          </div>
        );
      })}
      {addMode && <AddUser />}
    </div>
  );
}

export default ChatList;
