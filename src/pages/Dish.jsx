import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import AppContext from "../context/Appcontext";
import Spinner from "../components/Spinner";
import { v4 as uuidv4 } from "uuid";

function Dish() {
  const params = useParams();
  const [dish, setDish] = useState(null);
  const { isLoading, setLoading } = useContext(AppContext);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data1 = await axios(
        `https://forkify-api.herokuapp.com/api/get?rId=${params.recipt}`
      );
      setDish(data1.data.recipe);
      setLoading(false);
    };
    getData();
  }, [params.recipt, setLoading]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      {dish ? (
        <main className="singleProject my-md">
          <div className="container">
            <div className="layout">
              <div className="column column--1of3">
                <h3 className="singleProject__subtitle">Links</h3>

                <a
                  className="singleProject__liveLink"
                  href={dish.publisher_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="im im-external-link"></i>Publisher Url
                </a>
                <br />
                <br />

                <a
                  className="singleProject__liveLink"
                  href={dish.source_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="im im-external-link"></i>Source Url
                </a>
              </div>
              <div className="column column--2of3">
                <img
                  className="singleProject__preview"
                  src={dish.image_url}
                  alt="portfolio thumbnail"
                />
                <p href="profile.html" className="singleProject__developer">
                  {dish.publisher}
                </p>
                <h2 className="singleProject__title">{dish.title}</h2>
                <h3 className="singleProject__subtitle">Ingredients</h3>
                <div className="singleProject__info">
                  {dish.ingredients.map((ingre) => (
                    <p key={uuidv4()}>{ingre}</p>
                  ))}
                </div>

                <div className="comments">
                  <h3 className="singleProject__subtitle">Social Rank</h3>
                  <h5 className="project--rating">{dish.social_rank}</h5>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : null}
    </>
  );
}

export default Dish;
