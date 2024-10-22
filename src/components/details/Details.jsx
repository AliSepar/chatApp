import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";

function Details() {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
    useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;
    const userDocRef = doc(db, "users", currentUser.id);
    try {
      updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="hidden lg:flex flex-col max-w-[25%]">
      {/* Details */}
      <div className="p-[25px] flex flex-col items-center gap-5  border-b-[1px] border-[#dddddd35]">
        <img
          src={user?.avatar || "./avatar.png"}
          alt=""
          className="w-[100px] h-[100px] object-cover rounded-full"
        />
        <h2 className="text-xl font-bold mt-[-5px]">{user?.username}</h2>
        <p>Lorem ipsum dolor, sit amet .</p>
      </div>
      <div className="p-5 flex flex-col gap-[25px] scrollbar-custom">
        {/* info */}
        <div className="options">
          {/* option */}
          <div className="flex items-center justify-between">
            {/* title */}
            <span>Chat Settings</span>
            <img
              src="./arrowUp.png"
              alt=""
              className="cursor-pointer w-[30px] h-[30px] bg-bgColor p-[10px] rounded-full"
            />
          </div>
        </div>
        <div className="options">
          {/* option */}
          <div className="flex items-center justify-between">
            {/* title */}
            <span>Privacy & help</span>
            <img
              src="./arrowUp.png"
              alt=""
              className="cursor-pointer w-[30px] h-[30px] bg-bgColor p-[10px] rounded-full"
            />
          </div>
        </div>
        <div className="options">
          {/* option */}
          <div className="flex items-center justify-between">
            {/* title */}
            <span>Sheared Photo</span>
            <img
              src="./arrowDown.png"
              alt=""
              className="cursor-pointer w-[30px] h-[30px] bg-bgColor p-[10px] rounded-full"
            />
          </div>
          <div className="photos flex flex-col gap-5 mt-5">
            <div className="flex items-center justify-between">
              {/* photoitem */}
              <div className="flex items-center gap-[20px]">
                {/* photodetails */}
                <img
                  className="w-[40px] h-[40px] rounded-xl object-cover"
                  src="https://media.istockphoto.com/id/603164912/photo/suburb-asphalt-road-and-sun-flowers.jpg?s=612x612&w=0&k=20&c=qLoQ5QONJduHrQ0kJF3fvoofmGAFcrq6cL84HbzdLQM="
                  alt=""
                />
                <span className="text-sm text-[#fcfcfc9a] font-light">
                  photo_2024_2.png
                </span>
              </div>
              <img
                src="./download.png"
                alt=""
                className="cursor-pointer w-[30px] h-[30px] bg-bgColor p-[10px] rounded-full"
              />
            </div>
          </div>
          <div className="photos flex flex-col gap-5 mt-5">
            <div className="flex items-center justify-between">
              {/* photoitem */}
              <div className="flex items-center gap-[20px]">
                {/* photodetails */}
                <img
                  className="w-[40px] h-[40px] rounded-xl object-cover"
                  src="https://media.istockphoto.com/id/603164912/photo/suburb-asphalt-road-and-sun-flowers.jpg?s=612x612&w=0&k=20&c=qLoQ5QONJduHrQ0kJF3fvoofmGAFcrq6cL84HbzdLQM="
                  alt=""
                />
                <span className="text-sm text-[#fcfcfc9a] font-light">
                  photo_2024_2.png
                </span>
              </div>
              <img
                src="./download.png"
                alt=""
                className="cursor-pointer w-[30px] h-[30px] bg-bgColor p-[10px] rounded-full"
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleBlock}
          className="p-[15px] bg-[rgba(230,74,105,0.553)] text-white border-none rounded-md cursor-pointer hover:bg-[rgba(230,74,105,0.796)] transition-all duration-150"
        >
          {isCurrentUserBlocked
            ? "You are Blocked"
            : isReceiverBlocked
            ? "User Blocked"
            : "Block User"}
        </button>
        <button
          type="button"
          className="p-[10px] bg-[#1a73e8]"
          onClick={() => auth.signOut()}
        >
          Logout
        </button>
      </div>
    </section>
  );
}

export default Details;
