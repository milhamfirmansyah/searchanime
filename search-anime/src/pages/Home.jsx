import { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  const url = `https://api.jikan.moe/v4/anime?q=${search}&sfw`;
  const navigate = useNavigate();

  const getData = async () => {
    const response = await axios.get(url);
    setData(response.data.data);
  };

  useEffect(() => {
    getData();
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const redirect = (id) => {
    console.log(id);
    navigate(`detail/${id}`);
  };

  return (
    <div>
      <div className="header-wrapper">
        <div className="header-container">
          <input className="search-bar" type="search" placeholder="search anime..." onChange={handleSearch} />
        </div>
      </div>

      <div className="card-wrapper">
        <div className="card-container">
          {data.map((item) => (
            <div className="card">
              <div className="image">
                <img src={item.images.jpg.large_image_url} alt="" />
              </div>
              <h4>{item.title}</h4>
              <button onClick={() => redirect(item.id)}>Watch Anime</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
