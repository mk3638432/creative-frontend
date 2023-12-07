import { useEffect, useState } from "react";
import { addUser, getAllUser, updateUser, deleteUser } from "./utils/HandleApi";
import UserList from "./components/Todo";
import { toast } from "react-toastify";

function App() {
  const [user, setUser] = useState([]);
  const [updating, setUpdating] = useState(false);
  console.log(user);
  const [data, setData] = useState({
    name: "",
    type: "",
    email: "",
    phone: null,
    alternatPhone: null,
  });
  const [error, setError] = useState({});
  const options = ["PHP", "Node-Js", "React-Js"];
  const handleValidation = (data) => {
    const error = {};
    if (!data?.name) {
      error.error = true;
      error.name = "Invalid Name";
    }
    if (!data?.type) {
      error.error = true;
      error.type = "Invalid type";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data?.email)) {
      error.error = true;
      error.email = "Invalid Email";
    }
    if (!data?.phone || data.phone.toString().length !== 10) {
      error.error = true;
      error.phone = " Phone Number Must have 10 digit";
    }

    if (!data.alternatPhone || data.alternatPhone.toString().length !== 10) {
      error.error = true;
      error.alternatPhone = "Phone Number Must have 10 digits";
    }

    if (data.phone === data.alternatPhone) {
      error.error = true;
      error.alternatPhone = "Phone Number Cannot be the same";
    }

    return error;
  };
  const updateMode = (
    id,
    newname,
    newtype,
    newemail,
    newphone,
    newalternatPhone
  ) => {
    setUpdating(true);
    setData({
      _id: id,
      name: newname,
      type: newtype,
      email: newemail,
      phone: newphone,
      alternatPhone: newalternatPhone,
    });
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const validation = handleValidation(data);
      setError(validation);
      if (validation.error) {
        return;
      }
      // const response = await axios.post("/api/topics", data);
      addUser(data, setData, setUser);
      toast.success(`User Added successfully!!!`);
    } catch (error) {
      toast.error("Somethinf Went Wrong While adding the User");
    }
  };
  useEffect(() => {
    getAllUser(setUser);
  }, []);
  return (
    <>
      <div className="flex justify-center items-center  ">
        <form>
          <div className="mt-5">
            <p className="flex gap-[1vw] flex-col	 ">
              <p> Name:</p>
              <input
                className="border border-[#1B1B1B]  w-[45vw] rounded-lg p-3 "
                type="text"
                name="name"
                value={data?.name}
                onChange={handleChange}
                placeholder="Enter Your First Name"
              />
            </p>
            <p className="text-red-600"> {error?.name} </p>
            <p className="flex gap-[1vw] flex-col	 ">
              <p> Type:</p>
              <select
                className="border border-[#1B1B1B] w-[45vw] rounded-lg p-3"
                value={data?.type}
                name="type"
                onChange={handleChange}
              >
                {options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
              </select>
            </p>
            <p className="text-red-600"> {error?.type} </p>

            <div className="mt-3 flex ">
              <p className="flex gap-[1vw] flex-col	 ">
                <p>Email id : </p>
                <input
                  className="border border-[#1B1B1B]  w-[45vw] rounded-lg p-3 "
                  type="email"
                  name="email"
                  value={data?.email}
                  onChange={handleChange}
                  placeholder="Enter Your Last Name"
                />
              </p>
            </div>
            <p className="text-red-600"> {error?.email} </p>

            <p className="flex gap-[1vw] flex-col	 ">
              <p> Mobile_no :</p>
              <input
                className="border border-[#1B1B1B]  w-[45vw] rounded-lg p-3 "
                type="number"
                name="phone"
                value={data?.phone}
                onChange={handleChange}
                placeholder="Enter Your ester_mobile_no"
              />
            </p>
            <p className="text-red-600"> {error?.phone} </p>
            <p className="flex gap-[1vw] flex-col	 ">
              <p> Alternative Mobile_no:</p>
              <input
                className="border border-[#1B1B1B]  w-[45vw] rounded-lg p-3 "
                type="number"
                name="alternatPhone"
                value={data?.alternatPhone}
                onChange={handleChange}
                placeholder="Enter Your Alternative No.:"
              />
            </p>
            <p className="text-red-600"> {error?.alternatPhone} </p>
          </div>
        </form>
      </div>
      <div className=" flex justify-center">
        <button
          onClick={
            updating
              ? () => updateUser(data, setData, setUser, setUpdating)
              : handleSubmit
          }
          className="bg-[#1B1B1B]  w-[20vw] mt-10 text-white font-bold py-2 px-4 "
        >
          {updating ? "Update" : "Submit"}
        </button>
      </div>
      <>
        <div className="my-10  ">
          {/* <h2 className=" text-2xl "> Php_test_mast </h2> */}
          <table className=" mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs mx-10  h-10 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3"> Email</th>
                <th className="px-6 py-3">Mobile No</th>
                <th className="px-6 py-3">Alternative No</th>
                <th className="px-6 py-3">Creation_date </th>
                <th className="px-6 py-3">last_updation_date </th>
                <th> </th>
                <th> </th>
              </tr>
            </thead>
            <tbody className="mt-10">
              {user.map((user, index) => (
                <UserList
                  user={user}
                  index={index}
                  deleteUser={() => deleteUser(user?._id, setUser)}
                  updateMode={() =>
                    updateMode(
                      user?._id,
                      user?.name,
                      user?.type,
                      user?.email,
                      user?.phone,
                      user?.alternatPhone
                    )
                  }
                />
              ))}
            </tbody>
          </table>
        </div>
      </>
    </>
  );
}

export default App;
