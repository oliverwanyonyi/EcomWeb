import FormsContainer from "../../components/Forms/FormsContainer";
import logo from "../../assets/shopyetu.png";
import { useState } from "react";
import Spinner from "../../components/Preloader/Spinner";
import Button from "../../components/Button/Button";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils/getErrorMessage";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Profile = ({ authData, setAuthData, auth, setAuth }) => {
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const submit = async (e) => {
    e.preventDefault();
    const { email, phone,name } = authData;

    if (!email  || !phone || !name) {
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
    try {
      setLoading(true);

      const { data } = await axiosPrivate.put("/auth/users/update", authData);
     
      setAuth((prev) => {
        return { ...prev, user: data.user };
      });
      localStorage.setItem(
        "auth",
        JSON.stringify({ ...auth, user: data.user })
      );
      setAuthData({
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
      });
      setLoading(false);

      toast.success("Profile Updated", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
        <div className="col-md-8 mx-auto">
          <div className="bg-white">
            <form className="auth-form" onSubmit={submit}>
              <div className="form-header profile-header">
                Update Your profile
              </div>
              <div className="form-body">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="name"
                    name="name"
                    placeholder="e.g johndoe"
                    value={authData?.name}
                    onChange={(e) => changeHandler(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={authData?.email}
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
                    value={authData?.phone}
                    placeholder="e.g +254100000000"
                    onChange={(e) => changeHandler(e)}
                  />
                </div>
              </div>
              <div className="form-footer">
                <Button type="submit" loading={loading}>
                  {loading ? <Spinner /> : "Update Profile"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </FormsContainer>
    </div>
  );
};

export default Profile;
