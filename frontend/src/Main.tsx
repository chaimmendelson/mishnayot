import React, { useState, useEffect } from "react";
import Mishnas from "./components/Mishnas";
import Search from "./components/Search";
import { Api } from "./utils/api";
import { Container, Row, Col, Button, ToastContainer } from "react-bootstrap";
import ToastNotification from "./components/Toast";

interface IMapData {
  id: number;
  masechet: string;
  prakim: string;
  done: boolean;
}

interface IObjectReturn {
  results: IMapData[];
}

function Main() {
  const [mapData, setMapData] = useState<IMapData[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [filteredData, setFilteredData] = useState<IMapData[]>([]);
  const [toastMessages, setToastMessages] = useState<
    { message: string; variant: "success" | "error" | "info" }[]
  >([]);

  const refreshData = async () => {
    try {
      const response = await Api.fetchAllMishnas();
      const responseJson: IObjectReturn = response;
      const res: IMapData[] = responseJson.results;
      setMapData(res);
      setToastMessages([
        ...toastMessages,
        { message: "הרשימה עודכנה בהצלחה", variant: "success" },
      ]);
    } catch (error) {
      setToastMessages([
        ...toastMessages,
        { message: "עידכון הרשימה נכשל", variant: "error" },
      ]);
    }
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
    try {
      const mishna = mapData.find((mishna) => mishna.id === mishnaId);
      if (mishna?.done) {
        await Api.markMishnaAsUndone(mishnaId);
      } else {
        await Api.markMishnaAsDone(mishnaId);
      }
      const updatedData = mapData.map((mishna) => {
        if (mishna.id === mishnaId) {
          return { ...mishna, done: !mishna.done };
        }
        return mishna;
      });
      setMapData(updatedData);
      setToastMessages([
        ...toastMessages,
        { message: "הרשימה עודכנה בהצלחה", variant: "success" },
      ]);
    } catch (error) {
      setToastMessages([
        ...toastMessages,
        { message: "עידכון הרשימה נכשל", variant: "error" },
      ]);
    }
  };

  const filterData = () => {
    const filtered = mapData.filter((mishna) => {
      for (const word of filter.split(" ")) {
        if (
          !mishna.masechet.toLowerCase().includes(word.toLowerCase()) &&
          !mishna.prakim.toLowerCase().includes(word.toLowerCase())
        ) {
          return false;
        }
      }
      return true;
    });
    setFilteredData(filtered);
  };

  const updateFilter = (term: string) => {
    setFilter(term);
  };

  return (
    <Container style={{ width: "70%" }}>
      <Row className="align-items-center my-5">
        <Col xs={11}>
          <Search onValueChange={updateFilter} />
        </Col>
        <Col xs={1} className="text-end">
          <Button variant="info" onClick={refreshData}>
            רענן
          </Button>
        </Col>
      </Row>
      <Mishnas results={filteredData} toggleDone={toggleDone} />
      {/* Toast container */}
      <ToastContainer
        position="bottom-end"
        className="p-3"
        style={{ width: "15%" }}
      >
        {toastMessages.map((toast, index) => (
          <ToastNotification
            key={index}
            message={toast.message}
            variant={toast.variant}
          />
        ))}
      </ToastContainer>
    </Container>
  );
}

export default Main;
