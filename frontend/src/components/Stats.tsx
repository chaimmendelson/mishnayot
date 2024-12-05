import React, { useEffect, useState } from "react";
import { ProgressBar, Row, Col, Container } from "react-bootstrap";
import {Api} from "../utils/api"; // Adjust the path to your API file

interface IMapData {
  id: number;
  masechet: string;
  startperek: string;
  done: boolean; // Assuming `done` is a boolean for clarity
}

const Stats: React.FC = () => {
  const [mishnas, setMishnas] = useState<IMapData[]>([]);
  const [percentage, setPercentage] = useState<string>("0");

  const fetchMishnas = async () => {
    try {
      const allMishnas: IMapData[] = (await Api.fetchAllMishnas()).results;
      setMishnas(allMishnas);

      // Calculate percentage
      const total = allMishnas.length;
      const completed = allMishnas.filter((mishna) => mishna.done).length;
      if (total > 0) {
        setPercentage(((completed / total) * 100).toFixed(2));
      }
    } catch (error) {
      console.error("Error fetching mishnas:", error);
    }
  };

  useEffect(() => {
    fetchMishnas(); // Fetch initially

    // Refresh every 5 seconds
    const intervalId = setInterval(() => {
      fetchMishnas();
    }, 5000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <Container style={{ direction: "rtl", marginTop: "20px" }}>
      <Row className="mb-4" style={{ marginTop: "10vh"}}>
        <Col className="text-center">
          <h1>אחוז המשניות שנלמדו: - {percentage}%</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <ProgressBar
            animated
            variant="info"
            style={{
              border: "1px solid black",
              width: "100%",
              height: "7vh",
              marginTop: "10vh",
            }}
            now={parseFloat(percentage)}
            label={`${percentage}%`}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Stats;
