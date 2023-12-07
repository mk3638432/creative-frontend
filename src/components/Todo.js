import moment from "moment/moment";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const UserList = ({ user, index, updateMode, deleteUser }) => {
  return (
    <tr
      key={user?.user_id}
      className={`text-xs mx-10 h-10 text-gray-700 uppercase ${
        user?.type === "PHP"
          ? "bg-green-400"
          : user.type === "Node-js"
          ? "bg-yellow-400"
          : "bg-orange-400"
      }`}
    >
      <td className="px-6 py-3">{index + 1}</td>
      <td className="px-6 py-3">{user?.name}</td>
      <td className="px-6 py-3">{user?.type}</td>
      <td className="px-6 py-3">{user?.email}</td>
      <td className="px-6 py-3">{user?.phone}</td>
      <td className="px-6 py-3">{user?.alternatPhone}</td>
      <td className="px-6 py-3">
        {" "}
        {moment(user?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
      </td>
      <td className="px-6 py-3">
        {" "}
        {moment(user?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}{" "}
      </td>
      <td>
        <button onClick={updateMode}>
          <FaEdit size={20} />
        </button>
      </td>
      <td>
        <button onClick={deleteUser}>
          <MdDelete color="red" size={20} />
        </button>
      </td>
    </tr>
  );
};

export default UserList;
