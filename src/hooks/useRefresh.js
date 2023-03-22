import axios from "../axios";
import { AppState } from "../Store/store";
const useRefresh = () => {
  const { setAuth } = AppState();
  const refresh = async () => {
    const { data } = await axios.get("/auth/token/refresh", {
      withCredentials: true,
    });

    const auth = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : null;
      
    if (auth) {
      setAuth({ ...auth, access_token: data.access_token });
      localStorage.setItem(
        "auth",
        JSON.stringify({ ...auth, access_token: data.access_token })
      );
    }

    return data.access_token;
  };
  return refresh;
};

export default useRefresh;
