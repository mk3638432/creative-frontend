import axios from "axios";

const baseURL = "http://localhost:4000";

const getAllUser = (setUser) => {
  axios.get(baseURL).then(({ data }) => {
    console.log("data", data);
    setUser(data);
  });
};

const addUser = (data, setData, setUser) => {
  const { name, type, email, phone, alternatPhone } = data;
  console.log(name, type, email, phone, alternatPhone);
  console.log(data);

  axios
    .post(`${baseURL}/save`, { name, type, email, phone, alternatPhone })
    .then((data) => {
      console.log(data);
      setData({
        name: "",
        type: "",
        email: "",
        phone: "",
        alternatPhone: "",
      });
      getAllUser(setUser);
    });
};

const updateUser = (data, setData, setUser, setUpdating) => {
  const { _id, name, type, email, phone, alternatPhone } = data;

  axios
    .post(`${baseURL}/update`, { _id, name, type, email, phone, alternatPhone })
    .then((data) => {
      console.log(data);
      setData({
        name: "",
        type: "",
        email: "",
        phone: "",
        alternatPhone: "",
      });
      setUpdating(false);
      getAllUser(setUser);
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteUser = (_id, setUser) => {
  console.log(setUser);
  console.log(_id);
  axios
    .post(`${baseURL}/delete`, { _id })
    .then((data) => {
      console.log(data);
      getAllUser(setUser);
    })
    .catch((error) => {
      console.log(error);
    });
};

export { getAllUser, addUser, updateUser, deleteUser };
