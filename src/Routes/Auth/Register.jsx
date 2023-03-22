import FormsContainer from "../../components/Forms/FormsContainer";
import logo from "../../assets/shopyetu.png";
import Button from "../../components/Button/Button";
import axios from "../../axios";
import "./auth.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { AppState } from "../../Store/store";
import Spinner from "../../components/Preloader/Spinner";
const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const search = useLocation().search;
  const next = search.split("=")[1] || "/";
  const { setAuth } = AppState();
  const [authData, setAuthData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const submit = async (e) => {
    e.preventDefault();
    const { email, phone, password, name } = authData;

    if (!email || !password || !phone || !name) {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setLoading(true);

    try {
      const { data } = await axios.post(
        "/auth/register",
        { name, email, phone, password },
        { withCredentials: true }
      );
      setAuth(
        {
          user:data.user,
          access_token:data.access_token
        }
      );
      localStorage.setItem("auth", JSON.stringify({
        user:data.user,
        access_token:data.access_token
      }));
      axios.defaults.headers.common['Authorization'] =
        "Bearer " + data.access_token;
        
      setLoading(false);

      toast.success("Registaration was succesful", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(()=>{
        navigate(next)
      },2000)
    } catch (error) {
      toast.error(getErrorMessage(error), {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
    }
  };

  const changeHandler = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };
  return (
    <div className="auth register">
      <FormsContainer>
        <div className="col-md-4 mx-auto">
          <div className="bg-white">
            <form className="auth-form" onSubmit={submit}>
              <div className="form-header">
                <img src={logo} alt="shopyetu" />
              </div>
              <div className="form-body">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="name"
                    name="name"
                    placeholder="e.g johndoe"
                    onChange={(e) => changeHandler(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="e.g johndoe@example.com"
                    onChange={(e) => changeHandler(e)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    id="phoneNumber"
                    placeholder="e.g +254100000000"
                    onChange={(e) => changeHandler(e)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    placeholder="Input your password here"
                    onChange={(e) => changeHandler(e)}
                    name="password"
                  />
                </div>
              </div>
              <div className="form-footer">
                <Button type="submit" loading={loading}>
                  {loading ? <Spinner /> : "Register"}
                </Button>
                <p className="auth-redirect">
                  Already have an account <Link to={"/login?next="+ next}>Login</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </FormsContainer>
    </div>
  );
};

export default Register;
