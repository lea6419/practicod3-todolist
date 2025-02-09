import axios from 'axios';

<<<<<<< HEAD
const apiUrl =process.env.REACT_APP_Api;
=======
const apiUrl = "process.env.REACT_APP_Api";
axios.defaults.baseURL = apiUrl;

axios.interceptors.response.use(
  response => response,
  error => {
    console.error("שגיאה ב-response:", error.response ? error.response.data : "Unknown error");
    return Promise.reject(error);
  }
);
>>>>>>> 051272e82158b623ec7ad4125f15056c700924b8

export default {
  getTasks: async () => {
    const result = await axios.get('/');
    return result.data;
  },

  addTask: async (taskName) => {
    const response = await axios.post('/', {
      name: taskName,
      isComplete: false,
    });
    return response.data;
  },


  setCompleted: async (  todo, isComplete) => {
    try {
   
      const result = await axios.put(`/${todo.id}?isDone=${isComplete}`, {
            id: todo.id,
            name: todo.name
        });
      return { result };
    } catch (error) {
      console.error("שגיאה בעידכון משימה:", error);
      return { error: error.response ? error.response.data : "Unknown error" };
    }
  },

  deleteTask: async (id) => {
    await axios.delete(`/${id}`);
  }
};
