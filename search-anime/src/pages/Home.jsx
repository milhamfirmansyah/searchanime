import { useCallback, useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';

function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  const getData = useCallback(
    debounce(async (q) => {
      if (q.trim() !== '') {
        const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${q}&sfw`);
        setData(response.data.data);
      } else {
        const response = await axios.get(`https://api.jikan.moe/v4/anime`);
        setData(response.data.data);
      }
    }, 300),
    []
  );

  useEffect(() => {
    getData(search);
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const redirect = (id) => {
    console.log(id);
    navigate(`detail/${id}`);
  };
  console.log(data);

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
              <button onClick={() => redirect(item.mal_id)}>Watch Anime</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
