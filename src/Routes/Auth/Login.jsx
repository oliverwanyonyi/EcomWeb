
import FormsContainer from "../../components/Forms/FormsContainer";
import logo from "../../assets/shopyetu.png";
import Button from "../../components/Button/Button";
import axios from '../../axios'
import "./auth.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { AppState } from "../../Store/store";
import Spinner from "../../components/Preloader/Spinner";
const Register = () => {
  const [loading,setLoading] = useState(false)
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const search = useLocation().search;
  const next = search.split('=')[1] || "/"
  const {setAuth} = AppState()
  const changeHandler = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };
  const submit = async (e) => {
    e.preventDefault();

    if (!authData.email || !authData.password) {
      toast.error("Please fill in all the fields", {
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
    try {
      setLoading(true);

      const { data } = await axios.post(
        "/auth/login",
        { ...authData },
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
      
     setLoading(false)

      toast.success("Login successful",{
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
  return (
    <div className="auth login">
      <FormsContainer>
        <div className="col-md-4 mx-auto">
          <div className="bg-white">
            <form className="auth-form" onSubmit={submit}>
              <div className="form-header">
                <img src={logo} alt="shopyetu" />
              </div>
              <div className="form-body">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => changeHandler(e)}
                    placeholder="Input your email here"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => changeHandler(e)}
                    placeholder="Input your password here"
                  />
                </div>
              </div>
              <div className="form-footer">
                <Button type="submit" loading={loading}>{loading ? <Spinner/>:"Login"}</Button>
                <p className="auth-redirect">
                  Don't have an account <Link to="/register">Register</Link>
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
