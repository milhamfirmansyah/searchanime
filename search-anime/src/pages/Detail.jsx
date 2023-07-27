import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function Detail() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  const getDetailData = async () => {
    const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`);
    setData(response.data.data);
  };

  useEffect(() => {
    getDetailData();
  }, []);

  console.log(data);

  return (
    <div className="detail-wrapper">
      <div className="detail-container">
        <p>Title : {data?.title}</p>
        <p>Year : {data?.year}</p>
        <p>Score : {data?.score}</p>
        <p>Episodes : {data?.episodes}</p>
        <p>Duration : {data?.duration}</p>
        <p>Background : {data?.background}</p>
        <p>Synopsis : {data?.synopsis}</p>
      </div>
    </div>
  );
}

export default Detail;
