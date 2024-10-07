import { useState } from "react";

function ChatList() {
  const [addMode, setAddMode] = useState(false);
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
      <div className="flex items-center gap-5 p-5 cursor-pointer border-b-[1px] border-[#dddddd35]">
        <img
          src="./avatar.png"
          alt=""
          className="w-[50px] h-[50px] rounded-full"
        />
        <div className="flex flex-col gap-[10px]">
          <span className="font-medium">Jane Doe</span>
          <p className="font-light text-sm">Hello</p>
        </div>
      </div>
      <div className="flex items-center gap-5 p-5 cursor-pointer border-b-[1px] border-[#dddddd35]">
        <img
          src="./avatar.png"
          alt=""
          className="w-[50px] h-[50px] rounded-full"
        />
        <div className="flex flex-col gap-[10px]">
          <span className="font-medium">Jane Doe</span>
          <p className="font-light text-sm">Hello</p>
        </div>
      </div>
      <div className="flex items-center gap-5 p-5 cursor-pointer border-b-[1px] border-[#dddddd35]">
        <img
          src="./avatar.png"
          alt=""
          className="w-[50px] h-[50px] rounded-full"
        />
        <div className="flex flex-col gap-[10px]">
          <span className="font-medium">Jane Doe</span>
          <p className="font-light text-sm">Hello</p>
        </div>
      </div>
      <div className="flex items-center gap-5 p-5 cursor-pointer border-b-[1px] border-[#dddddd35]">
        <img
          src="./avatar.png"
          alt=""
          className="w-[50px] h-[50px] rounded-full"
        />
        <div className="flex flex-col gap-[10px]">
          <span className="font-medium">Jane Doe</span>
          <p className="font-light text-sm">Hello</p>
        </div>
      </div>
      <div className="flex items-center gap-5 p-5 cursor-pointer border-b-[1px] border-[#dddddd35]">
        <img
          src="./avatar.png"
          alt=""
          className="w-[50px] h-[50px] rounded-full"
        />
        <div className="flex flex-col gap-[10px]">
          <span className="font-medium">Jane Doe</span>
          <p className="font-light text-sm">Hello</p>
        </div>
      </div>
    </div>
  );
}

export default ChatList;
