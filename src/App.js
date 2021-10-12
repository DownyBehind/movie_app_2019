import React from "react";
import axios from "axios";
import Movie from "./Movie";
//import PropTypes from "prop-types"; // this is a moudle for check props type

/*
const foodILike = [
  {
    id: 1,
    name: "Kimchi",
    image:
      "http://aeriskitchen.com/wp-content/uploads/2008/09/kimchi_bokkeumbap_02-.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Samgyeopsal",
    image:
      "https://3.bp.blogspot.com/-hKwIBxIVcQw/WfsewX3fhJI/AAAAAAAAALk/yHxnxFXcfx4ZKSfHS_RQNKjw3bAC03AnACLcBGAs/s400/DSC07624.jpg",
    rating: 3,
  },
  {
    id: 3,
    name: "Bibimbap",
    image:
      "http://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/recipes/ck/12/03/bibimbop-ck-x.jpg?itok=RoXlp6Xb",
    rating: 2,
  },
  {
    id: 4,
    name: "Doncasu",
    image:
      "https://s3-media3.fl.yelpcdn.com/bphoto/7F9eTTQ_yxaWIRytAu5feA/ls.jpg",
    rating: 3.4,
  },
  {
    id: 5,
    name: "Kimbap",
    image:
      "http://cdn2.koreanbapsang.com/wp-content/uploads/2012/05/DSC_1238r-e1454170512295.jpg",
    rating: 1.2,
  },
];

function Food({ name, picture, rating }) {
  return (
    <div>
      <h2>i like {name}</h2>
      <h4>{rating}/5.0</h4>
      <img src={picture} alt={name} />
    </div>
  );
}

Food.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
}; // props type check and "isRequired" means this props should be exist.

function App() {
  return (
    <div>
      {foodILike.map((dish) => (
        <Food
          key={dish.id}
          name={dish.name}
          picture={dish.image}
          rating={dish.rating}
        /> // key is not props
      ))}
    </div>
  );
}
*/

class App extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };

  getMovies = async () => {
    const {
      data: {
        data: { movies },
      }, // ES6 features, original path is .data.data.movies
    } = await axios.get(
      "https://yts.mx/api/v2/list_movies.json?sort_by=rating"
    );
    this.setState({
      movies,
      isLoading: false, // actually movies(from state) : movies(from axios) but, javascript can understand if we write only one movies
    });
    // axios is a layer on fetch, and it is get api from url

    // why we use async await? because axios.get function need time for get api from url
  }; // in arrow function, we use async await function like this.

  componentDidMount() {
    this.getMovies();
  }

  /* Theroy
  //this app class have all of React Component class things
  state = {
    count: 0,
  };
  add = () => {
    this.setState((current) => ({
      count: current.count + 1,
    }));
  };
  minus = () => {
    this.setState((current) => ({
      count: current.count - 1,
    }));
    // react will re-render when you call setState everytime
  };
  // we can write "this.setState({count : this.state.count + 1})"
  // but this style is not good for application. because this code is using "state" method
  // if you use "current" in "setState", you can get current state information
  // nicolas recommand "current" method for this type of usecase
  componentDidMount() {
    console.log("component Did mount");
  }
  componentDidUpdate() {
    console.log("I just updated");
  }
  componetWillUnmount() {
    console.log("component will unmout");
  }
  */
  render() {
    //console.log("I'm rendering");
    // class doesn't have return method, but React Component class have a render method
    // function component is a function and they have return method
    // so why we study this class component, because class component have "state", "state" is changable object
    const { isLoading, movies } = this.state; // ES6 -> this.state.isLoading -> isLoading
    return (
      <section class="container">
        {isLoading ? (
          <div class="loader">
            <span class="loader__text">Loading...</span>
          </div>
        ) : (
          <div class="movies">
            {movies.map((movie) => {
              return (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                ></Movie>
              );
            })}
          </div>
        )}
      </section>
    );
  }
}

export default App;
