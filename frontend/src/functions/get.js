import axios from "axios";
// ${process.env.REACT_APP_API}
export const getExpenses = async (email) => {
  console.log("triggered.")
  return await axios.get(`http://localhost:8000/api/get`, {
    params:{
      email: email
    }
  });
};
