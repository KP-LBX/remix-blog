import {} from "@remix-run/react";
import { Link, useLoaderData } from "remix";
import { db } from "~/utils/db.server";

export const loader = async () => {
  const data = await fetch(`https://gxwebhackathon.herokuapp.com/menu`).then((res) => res.json());
  return data;
};

function Home() {
  const menu = useLoaderData();

  return (
    <div>
      <h1>Welcome to IsraelEat!</h1>
      <p className="about">
        IsraelEat is where you can have it all: the best ethically sourced ingredients, an
        allergy-friendly kitchen (yes, we have dedicated fryers), big flavor and big fun.
      </p>
      <Menu menu={menu} />
    </div>
  );
}

function Menu({ menu }) {
  return (
    <section className="food-menu">
      {menu.map((item) => (
        <div className="food-menu-box">
          <div className="food-menu-img">
            <img
              src={item.image}
              alt={item.title}
              className="img-responsive img-curve"
            />
          </div>
          <div className="food-menu-desc">
            <h4>{item.title}</h4>
            <p className="food-price">${item.price}</p>
            <p className="food-detail">
              {item.description}
            </p>
            <br />
            <a href="#" className="btn btn-primary">
              Order Now
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Home;
