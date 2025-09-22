import { useState } from 'react';
import Search from './components/Search';

// Movie data
const trendingMovies = [
  {
    id: 1,
    title: "Squid-Game 2",
    poster: "/squid games.png",
    rating: 4.2
  },
  {
    id: 2,
    title: "Oppenheimer",
    poster: "/oppenheimer.png",
    rating: 4.5
  },
  {
    id: 3,
    title: "Flash",
    poster: "/flash.png",
    rating: 4.3
  },
  {
    id: 4,
    title: "SRI ASIH",
    poster: "/sri asih.png",
    rating: 4.1
  },
  {
    id: 5,
    title: "Dungeon & Dragons",
    poster: "/dungeons and dragons.png",
    rating: 4.7
  },
  {
    id: 6,
    title: "The Last of Us",
    poster: "/last of us.png",
    rating: 4.4
  }
];

const popularMovies = [
  {
    id: 1,
    title: "Ant-Man and The Wasp: Quantumania",
    poster: "/antman.png",
    rating: 4.2,
    genre: "Action",
    year: 2023,
    type: "Movie"
  },
  {
    id: 2,
    title: "Air: Creating A Legend",
    poster: "/air.png",
    rating: 4.8,
    genre: "Action",
    year: 2023,
    type: "Movie"
  },
  {
    id: 3,
    title: "John Wick; Chapter 4",
    poster: "/john wick.png",
    rating: 4.6,
    genre: "Action",
    year: 2023,
    type: "Movie"
  },
  {
    id: 4,
    title: "Mechamato Movie",
    poster: "/mechamato.png",
    rating: 4.4,
    genre: "Animation",
    year: 2023,
    type: "Movie"
  },
  {
    id: 5,
    title: "Wednesday Season 1",
    poster: "/wednesday.png",
    rating: 4.7,
    genre: "Comedy",
    year: 2022,
    type: "Series",
    seasons: 1
  },
  {
    id: 6,
    title: "Beef",
    poster: "/beef.png",
    rating: 4.5,
    genre: "Drama",
    year: 2023,
    type: "Series",
    seasons: 1
  },
  {
    id: 7,
    title: "Valhalla Murders",
    poster: "/valhalla murders.png",
    rating: 4.3,
    genre: "Crime",
    year: 2020,
    type: "Series",
    seasons: 2
  },
  {
    id: 8,
    title: "The Witcher",
    poster: "/the witcher.png",
    rating: 4.2,
    genre: "Fantasy",
    year: 2019,
    type: "Series",
    seasons: 2
  },
  {
    id: 9,
    title: "Toxic",
    poster: "/toxic.png",
    rating: 4.6,
    genre: "Thriller",
    year: 2023,
    type: "Movie"
  },
  {
    id: 10,
    title: "Insider",
    poster: "/korean.png",
    rating: 4.3,
    genre: "Drama",
    year: 2023,
    type: "Movie"
  },
  {
    id: 11,
    title: "Race Season 1",
    poster: "/race.png",
    rating: 4.6,
    genre: "Drama",
    year: 2023,
    type: "Series",
    seasons: 1
  },
  {
    id: 12,
    title: "Ghost Doctor",
    poster: "/ghost doctor.png",
    rating: 4.4,
    genre: "Fantasy",
    year: 2022,
    type: "Series",
    seasons: 1
  }
];

// Trending Section Component
const TrendingSection = () => {
  return (
    <section className="trending">
      <h2 className="text-white text-2xl font-bold mb-6">Trending</h2>
      <div className="flex flex-row overflow-x-auto gap-6 w-full hide-scrollbar">
        {trendingMovies.map((movie, index) => (
          <div key={movie.id} className="flex-shrink-0 relative group">
            <div className="relative">
              <span className="absolute -left-12 top-1/2 -translate-y-1/2 text-9xl font-black text-white/25 fancy-text z-0">
                {index + 1}
              </span>
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-[160px] h-[200px] rounded-lg object-cover relative z-10 shadow-lg"
              />
            </div>
            <div className="mt-3 text-center">
              <h3 className="text-white font-bold text-base leading-tight">{movie.title}</h3>
              <div className="flex items-center justify-center gap-1 mt-1">
                <img src="/star.svg" alt="Star" className="w-4 h-4" />
                <span className="text-white font-bold text-sm">{movie.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Movie Card Component
const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} className="rounded-lg h-auto w-full" />
      <div className="content">
        <h3 className="text-white font-bold text-base line-clamp-1">{movie.title}</h3>
        <div className="rating">
          <img src="/star.svg" alt="Star" className="size-4 object-contain" />
          <p className="font-bold text-base text-white">{movie.rating}</p>
        </div>
        <span className="text-sm text-gray-100">{movie.genre} • {movie.type}</span>
        {movie.seasons && (
          <div className="flex items-center gap-1">
            <span className="bg-light-100/20 text-light-100 px-2 py-1 rounded text-xs font-bold">S</span>
            <span className="text-light-100 font-bold">{movie.seasons}</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Popular Section Component
const PopularSection = () => {
  return (
    <section className="all-movies">
      <h2 className="text-white text-2xl font-bold mb-6">Popular</h2>
      <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {popularMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find
            <span className="text-gradient"> Movies</span>
            You'll Enjoy Without Any Hassle
          </h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

        <TrendingSection />
        <PopularSection />
      </div>
    </main>
  );
};

export default App;
