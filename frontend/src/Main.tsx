import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Mishnas from "./Mishnas/Mishnas";
import Search from './Search/Search';
const baseUrl = 'http://localhost:4000'

interface IMapData {
  id: number, 
  masechet: string, 
  startperek: string,
  done: string
}

interface IObjectReturn {
  results: [IMapData]
}


function Main() {
  const [mapData, setMapData] = useState<[IMapData] | undefined>(undefined);

  useEffect(() => {
    async function fetchDefaultData() {
      const url = `${baseUrl}/api`;
      const response = await fetch(url);
      const responseJson: IObjectReturn = await response.json()
      console.log(responseJson.results);
      setMapData(responseJson.results);
    }

    fetchDefaultData();
  }, [])

  const search = async (searchTerm: string) => {
    const url = `${baseUrl}/api/${searchTerm}`;
    const response = await fetch(url);
    const responseJson: IObjectReturn = await response.json()
    console.log(responseJson.results);
    setMapData(responseJson.results);
  }

  return (
    <div className="App">
      <Search searchFunc={search}/>
      <Mishnas results={mapData} message={undefined}/>
      <p></p>
    </div>
  );
}

export default Main;
