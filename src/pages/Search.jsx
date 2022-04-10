import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/Appcontext";
import { toast } from "react-toastify";
function Search() {
  const { isLoggedIn } = useContext(AppContext);
  const [dishName, setDishName] = useState("");
  const onchange = (e) => {
    setDishName(e.target.value);
  };

  const navigate = useNavigate();
  const onsubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.info("You are not logged in");
    } else {
      navigate(`/food/${dishName}`);
    }
  };
  return (
    <>
      <main className="hero-section text-center">
        <div className="container container--narrow">
          <div className="hero-section__box">
            <h2>
              Search <span>Dish</span>
            </h2>
          </div>

          <div className="hero-section__search">
            <form className="form" action="#" method="get" onSubmit={onsubmit}>
              <div className="form__field">
                <label htmlFor="formInput#search">Search By Dish </label>
                <input
                  className="input input--text"
                  id="dishName"
                  onChange={onchange}
                  type="text"
                  name="text"
                  placeholder="Search by dish"
                />
              </div>

              <input
                className="btn btn--sub btn--lg"
                type="submit"
                value="Search"
              />
            </form>
          </div>
        </div>
      </main>
      {/* <section style={{ height: "45vh" }}></section> */}
    </>
  );
}

export default Search;
