import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import { useState } from "react";

function AddUser() {
  const [user, setUser] = useState(null);
  const handleSearch = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapShot = await getDocs(q);
      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-max h-max p-[30px] bg-[rgb(13,19,31)] rounded-lg absolute top-0 bottom-0 left-0 right-0 m-auto">
      <form action="" className="flex gap-5" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="p-5 rounded-[10px] bg-white text-bgColor border-none outline-none"
        />
        <button className="p-5 bg-[#1a73e8] rounded-[10px] border-none outline-none cursor-pointer">
          Search
        </button>
      </form>
      {user && (
        <div className="mt-[50px] flex items-center justify-between">
          <div className="flex items-center gap-5">
            <img
              src={user.avatar || "./avatar.png"}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <span>{user.username}</span>
          </div>
          <button className="p-2 bg-[#1a73e8] rounded-[10px] border-none outline-none cursor-pointer">
            Add Friend
          </button>
        </div>
      )}
    </div>
  );
}

export default AddUser;
