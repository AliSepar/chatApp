import { useEffect, useState } from "react";
import AddUser from "./addUser/AddUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";

function ChatList() {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);

  const { currentUser } = useUserStore();

  useEffect(() => {
    // will get data and store it in a useState chats
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        // setChats(doc.data());
        const items = res.data().chats;

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);
        setChats(chatData.sort((a, b) => b.updateAt - a.updateAt));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser.id]);
  // [currentUser.id] if user chang it has to run agin

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
      {chats.map((chat) => {
        <div
          key={chat.id}
          className="flex items-center gap-5 p-5 cursor-pointer border-b-[1px] border-[#dddddd35]"
        >
          <img
            src="./avatar.png"
            alt=""
            className="w-[50px] h-[50px] rounded-full"
          />
          <div className="flex flex-col gap-[10px]">
            <span className="font-medium">Jane Doe</span>
            <p className="font-light text-sm">{chat.lastMessage}</p>
          </div>
        </div>;
      })}
      {addMode && <AddUser />}
    </div>
  );
}

export default ChatList;
