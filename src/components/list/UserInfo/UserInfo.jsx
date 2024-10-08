import { useUserStore } from "../../../lib/userStore";

function UserInfo() {
  const { currentUser } = useUserStore();
  return (
    <div className="flex items-center p-5 justify-between">
      <div className="flex items-center gap-5">
        <img
          src={currentUser.avatar || "./avatar.png"}
          alt="user avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <h2>{currentUser.username}</h2>
      </div>
      <div className=" flex gap-5">
        <img src="./more.png" alt="" className="w-5 h-5 cursor-pointer" />
        <img src="./video.png" alt="" className="w-5 h-5 cursor-pointer" />
        <img src="./edit.png" alt="" className="w-5 h-5 cursor-pointer" />
      </div>
    </div>
  );
}

export default UserInfo;
