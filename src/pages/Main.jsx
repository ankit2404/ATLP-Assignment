import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import AppContext from "../context/Appcontext";
import Spinner from "../components/Spinner";
import usePagination from "../hooks/usePagination";
import { v4 as uuidv4 } from "uuid";
function Main() {
  const params = useParams();
  const [dishes, setDishes] = useState([]);
  const { isLoading, setLoading } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  const { previousPage, nextPage, totalPages, data } = usePagination(
    dishes,
    currentPage,
    12
  );
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data1 = await axios(
        `https://forkify-api.herokuapp.com/api/search?q=${params.id}`
      );
      setDishes(data1.data.recipes);
      setLoading(false);
    };
    getData();
  }, [params.id, setLoading]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <main className="projects">
        <section className="projectsList">
          <div className="container">
            <div className="grid grid--three">
              {data && data.length
                ? data.map((dish) => (
                    <div className="column" key={dish.recipe_id}>
                      <div className="card project">
                        <Link
                          to={`/dish/${dish.recipe_id}`}
                          className="project"
                        >
                          <img
                            className="project__thumbnail"
                            src={dish.image_url}
                            alt="project thumbnail"
                          />
                          <div className="card__body">
                            <h3 className="project__title">{dish.title}</h3>

                            <p>By {dish.publisher}</p>

                            <p className="project--rating">
                              <span>Social rank</span> {dish.social_rank}
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </section>

        <div className="pagination">
          <ul className="container">
            {previousPage && (
              <li>
                <div
                  onClick={() => setCurrentPage(previousPage)}
                  className="btn "
                >
                  &#10094; Prev
                </div>
              </li>
            )}

            {totalPages &&
              Array(totalPages)
                .fill(1)
                .map((_, idx) => (
                  <li key={uuidv4()}>
                    <div
                      className={`btn ${currentPage === idx + 1 && "btn--sub"}`}
                      onClick={() => setCurrentPage(idx + 1)}
                    >
                      {idx + 1}
                    </div>
                  </li>
                ))}
            {nextPage && (
              <li>
                <div onClick={() => setCurrentPage(nextPage)} className="btn">
                  Next &#10095;
                </div>
              </li>
            )}
          </ul>
        </div>
      </main>
    </>
  );
}

export default Main;
