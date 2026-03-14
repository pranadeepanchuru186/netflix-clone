import Banner from "./components/Banner";
import Row from "./components/Row";
import TrailerModal from "./components/TrailerModal";
import requests from "./requests";
import { useAuth } from "./contexts/AuthContext";
import { useState } from "react";

export default function Home() {
  const { user } = useAuth();
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="app">
      <div className="home__welcome">
        <h2>Welcome{user?.email ? `, ${user.email}` : ""}!</h2>
      </div>
      <Banner />
      <Row
        title="Trending"
        fetchUrl={requests.trending}
        isLargeRow
        onMovieClick={setSelectedMovie}
      />
      <Row
        title="Netflix Originals"
        fetchUrl={requests.netflixOriginals}
        isLargeRow
        onMovieClick={setSelectedMovie}
      />
      <Row
        title="Top Rated"
        fetchUrl={requests.topRated}
        isLargeRow
        onMovieClick={setSelectedMovie}
      />
      <Row
        title="Action Movies"
        fetchUrl={requests.action}
        isLargeRow
        onMovieClick={setSelectedMovie}
      />
      <Row
        title="Comedy Movies"
        fetchUrl={requests.comedy}
        isLargeRow
        onMovieClick={setSelectedMovie}
      />
      <Row
        title="Horror Movies"
        fetchUrl={requests.horror}
        isLargeRow
        onMovieClick={setSelectedMovie}
      />
      <Row
        title="Romance Movies"
        fetchUrl={requests.romance}
        isLargeRow
        onMovieClick={setSelectedMovie}
      />
      <Row
        title="Documentaries"
        fetchUrl={requests.documentaries}
        isLargeRow
        onMovieClick={setSelectedMovie}
      />
      <TrailerModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
}
