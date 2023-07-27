import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Detail() {
  const [data, setData] = useState({});
  const { id } = useParams();

  const getDetailData = async () => {
    const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`);
    setData(response.data.data);
  };

  useEffect(() => {
    getDetailData();
  }, []);

  console.log(data);

  return <div>Detail</div>;
}

export default Detail;
