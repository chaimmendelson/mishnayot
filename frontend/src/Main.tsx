import React, { useState, useEffect } from "react";
import Mishnas from "./components/Mishnas";
import Search from "./components/Search";
import { Api } from "./utils/api";
import { Container } from "react-bootstrap";

interface IMapData {
  id: number;
  masechet: string;
  startperek: string;
  done: boolean;
}

interface IObjectReturn {
  results: IMapData[];
}

function Main() {
  const [mapData, setMapData] = useState<IMapData[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [filteredData, setFilteredData] = useState<IMapData[]>([]);

  const refreshData = async () => {
    const response = await Api.fetchAllMishnas();
    const responseJson: IObjectReturn = response;
    console.log(responseJson);
    const res: IMapData[] = responseJson.results;
    console.log(res); //array full
    setMapData(res);
  };

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    filterData();
  }, [mapData]);

  useEffect(() => {
    filterData();
  }, [filter]);

  const toggleDone = async (mishnaId: number) => {
    const mishna = mapData.find((mishna) => mishna.id === mishnaId);
    if (mishna?.done === true) {
      await Api.markMishnaAsUndone(mishnaId);
    } else {
      await Api.markMishnaAsDone(mishnaId);
    }
    const updatedData = mapData.map((mishna) => {
      if (mishna.id === mishnaId) {
        mishna.done = !mishna.done;
      }
      return mishna;
    });
    setMapData(updatedData);
  };

  const filterData = () => {
    // filter the the mapData by the term no request to the server
    const filtered = mapData.filter((mishna) => {
      return mishna.masechet.toLowerCase().includes(filter.toLowerCase());
    });
    setFilteredData(filtered);
  };

  const updateFilter = (term: string) => {
    setFilter(term);
  };

  return (
    <Container className="App">
      <Search onValueChange={updateFilter} />
      <Mishnas results={filteredData} toggleDone={toggleDone} />
      <p></p>
    </Container>
  );
}

export default Main;
