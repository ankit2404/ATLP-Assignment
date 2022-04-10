import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/Appcontext";
import Spinner from "../components/Spinner";
function Login() {
  const { setLoggedIn, isLoading, setLoading } = useContext(AppContext);
  const [header, setHeader] = useState("");
  const [footer, setFooter] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const getHeaderAndFooter = async () => {
      setLoading(true);
      const headerData = await axios(
        "https://goquotes-api.herokuapp.com/api/v1/random?count=1"
      );
      const footerData = await axios("https://api.ipify.org");
      setHeader(headerData.data.quotes[0].text);
      setFooter(footerData.data);
      setLoading(false);
    };
    getHeaderAndFooter();
  }, [setLoading]);
  const { email, password, name, confirmPassword } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Enter Password Again");
      return;
    }
    setLoading(true);
    const data1 = await axios(`https://api.genderize.io?name=${name}`);
    const data2 = await axios(`https://api.agify.io?name=${name}`);
    const data3 = await axios(`https://api.nationalize.io?name=${name}`);
    localStorage.setItem("Name", name);
    localStorage.setItem("Email", email);
    localStorage.setItem("Password", password);
    localStorage.setItem("Gender", data1.data.gender);
    localStorage.setItem("Age", data2.data.age);
    if (data3.data.country.length !== 0) {
      localStorage.setItem("Nationality", data3.data.country[0].country_id);
    } else {
      localStorage.setItem("Nationality", null);
    }
    setLoggedIn(true);
    setLoading(false);
    toast.success("You are login successfully");
    navigate("/");
  };

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <main>
        <h6 style={{ margin: "10px", textAlign: "center" }}>{header}</h6>
        <div className="auth">
          <div className="card">
            <div className="auth__header text-center">
              <h3>Account Login</h3>
            </div>

            <form className="form auth__form" onSubmit={onSubmit}>
              <div className="form__field">
                <label>Name: </label>
                <input
                  className="input input--text"
                  type="text"
                  name="username"
                  required
                  onChange={onChange}
                  value={name}
                  id="name"
                  placeholder="Enter your username..."
                />
              </div>
              <div className="form__field">
                <label>Email: </label>
                <input
                  className="input input--text"
                  type="email"
                  name="email"
                  required
                  value={email}
                  id="email"
                  onChange={onChange}
                  placeholder="Enter your email..."
                />
              </div>

              <div className="form__field">
                <label>Password: </label>
                <input
                  className="input input--password"
                  type="password"
                  value={password}
                  required
                  name="password"
                  id="password"
                  onChange={onChange}
                  placeholder="Enter your password..."
                />
              </div>
              <div className="form__field">
                <label>Confirm password: </label>
                <input
                  className="input input--password"
                  type="password"
                  id="confirmPassword"
                  required
                  value={confirmPassword}
                  name="confirm-password"
                  onChange={onChange}
                  placeholder="Enter your password again..."
                />
              </div>
              <div className="auth__actions">
                <input
                  className="btn btn--sub btn--lg"
                  type="submit"
                  value="Log In"
                />
              </div>
            </form>
          </div>
        </div>
        <p style={{ textAlign: "-webkit-center" }}>
          Your Ip address id {footer}
        </p>
      </main>
    );
  }
}

export default Login;
