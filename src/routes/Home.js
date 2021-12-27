import React from "react";
import axios from "axios";
import Movie from "../components/Movie";
import "./Home.css";
//import PropTypes from "prop-types"; // this is a moudle for check props type

class Home extends React.Component {
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
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map((movie) => {
              return (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres={movie.genres}
                ></Movie>
              );
            })}
          </div>
        )}
      </section>
    );
  }
}

export default Home;
