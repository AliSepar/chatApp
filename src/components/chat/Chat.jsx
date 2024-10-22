import EmojiPicker from "emoji-picker-react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import upload from "../../lib/uploada";

function Chat() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [chat, setChat] = useState();

  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();
  const { currentUser } = useUserStore();

  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSend = async () => {
    if (text === "") return;

    let imgUrl = null;
    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
    setImg({
      file: null,
      url: "",
    });

    setText("");
  };
  return (
    <section className="lg:max-w-[55%] w-[100%] flex flex-col border-x-[1px] border-[#dddddd35] h-[100%]">
      <div className="p-3 flex items-center justify-between border-b-[1px] border-[#dddddd35]">
        {/* top */}
        <div className="flex items-center gap-5">
          <img
            src={user?.avatar || "./avatar.png"}
            alt=""
            className=" w-[60px] h-[60px] rounded-full object-cover"
          />
          <div className="flex flex-col gap-[5px]">
            <span className="text-lg font-bold">{user?.username}</span>
            <p className="text-sm font-light text-[#a5a5a5]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-5">
          <img src="./phone.png" alt="" className="w-5 h-5 cursor-pointer" />
          <img src="./video.png" alt="" className="w-5 h-5 cursor-pointer" />
          <img src="./info.png" alt="" className="w-5 h-5 cursor-pointer" />
        </div>
      </div>
      <div className="flex-1 p-5 scrollbar-custom flex flex-col gap-5">
        {/* center */}
        {/* <div className="max-w-[70%] flex gap-5">
          <img
            src="./avatar.png"
            alt=""
            className="w-[30px] h-[30px] rounded-full object-cover"
          />
          <div className="flex-1 flex flex-col gap-[5px]">
            <p className="p-5 bg-bgColor rounded-md">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi
              sed inventore nobis distinctio magnam, velit, error atque ab
              tenetur, voluptas beatae? Sunt reiciendis placeat nostrum
              obcaecati eum praesentium aliquid deserunt.
            </p>
            <span className="text-xs">1 min ago</span>
          </div>
        </div> */}
        {chat?.messages?.map((messages) => (
          <div
            className={
              messages.senderId === currentUser?.id
                ? "max-w-[70%] flex gap-5 own"
                : "max-w-[70%] flex gap-5 own sender"
            }
            key={messages?.createdAt}
          >
            <div>
              {messages.img && (
                <img
                  className="w-[100%] h-[300px] object-cover rounded-lg"
                  src={messages.img}
                  alt=""
                />
              )}
              <p>{messages.text}</p>
              {/* <span>{messages.createdAt}</span> */}
            </div>
          </div>
        ))}
        {img.url && (
          <div className="max-w-[70%] flex gap-5 own">
            <div className="text">
              <img src={img.url} className="w-[70%] h-[270px]" alt="image" />
            </div>
          </div>
        )}
        {/* <div className="max-w-[70%] flex gap-5">
          <img
            src="./avatar.png"
            alt=""
            className="w-[30px] h-[30px] rounded-full object-cover"
          />
          <div className="flex-1 flex flex-col gap-[5px]">
            <p className="p-5 bg-bgColor rounded-md">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi
              sed inventore nobis distinctio magnam, velit, error atque ab
              tenetur, voluptas beatae? Sunt reiciendis placeat nostrum
              obcaecati eum praesentium aliquid deserunt.
            </p>
            <span className="text-xs">1 min ago</span>
          </div>
        </div> */}
        <div ref={endRef}></div>
      </div>
      <div className="p-5  mt-auto flex items-center gap-5 justify-between border-t-[1px] border-[#dddddd35]">
        {/* bottom */}
        <div className="flex flex-row gap-5">
          <label htmlFor="file">
            <img
              src="./img.png"
              alt=""
              className={`w-5 h-5 cursor-pointer ${
                isCurrentUserBlocked || isReceiverBlocked
                  ? "cursor-not-allowed"
                  : ""
              }`}
              // className="w-5 h-5 cursor-pointer disabled:cursor-not-allowed"
            />
          </label>
          <input
            type="file"
            onChange={handleImg}
            id="file"
            disabled={isCurrentUserBlocked || isReceiverBlocked}
            style={{ display: "none" }}
          />
          <img
            src="./camera.png"
            alt=""
            className={`w-5 h-5 ${
              isCurrentUserBlocked || isReceiverBlocked
                ? "cursor-not-allowed"
                : ""
            }`}
          />
          <img
            src="./mic.png"
            alt=""
            className={`w-5 h-5 ${
              isCurrentUserBlocked || isReceiverBlocked
                ? "cursor-not-allowed"
                : ""
            }`}
          />
        </div>
        <input
          type="text"
          placeholder={
            isCurrentUserBlocked || isReceiverBlocked
              ? "You can not send message"
              : "Type a message...."
          }
          className="flex-1 bg-bgColor border-none outline-none text-white p-3 rounded-xl text-md disabled:cursor-not-allowed"
          onChange={(e) => setText(e.target.value)}
          value={text}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        />
        <div className="relative">
          <img
            src="./emoji.png"
            alt=""
            className={`w-5 h-5 cursor-pointer ${
              isCurrentUserBlocked || isReceiverBlocked
                ? "cursor-not-allowed"
                : ""
            }`}
            onClick={() => setOpen(!open)}
          />
          <div className="absolute bottom-[40px] left-0">
            <EmojiPicker
              open={open}
              onEmojiClick={handleEmoji}
              // disabled={isCurrentUserBlocked || isReceiverBlocked}
            />
          </div>
        </div>
        <button
          onClick={handleSend}
          type="button"
          disabled={isCurrentUserBlocked || isReceiverBlocked}
          className="text-white py-[10px] px-[20px] border-none bg-[#6a92f88a] rounded-md cursor-pointer disabled:bg-[#5182feb4] disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </section>
  );
}

export default Chat;
