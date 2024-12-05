import React, {useState, useEffect} from 'react';
import Mishnas from "../Mishnas/Mishnas";
import {ProgressBar, Row, Col} from 'react-bootstrap';
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

function Stats() {
    const [all, setAll] = useState<[IMapData] | undefined>(undefined);
    const [done, setDone] = useState<[IMapData] | undefined>(undefined);
    const [percentage, setPercentage] = useState<string>("0");

    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.reload();
        }, 20000);
        return () => clearTimeout(timer);
    })

    useEffect(() => {
        async function fetchData(){
            const resultAll = await fetch(`${baseUrl}/api/mishnas/all`);
            const resultAllJson: IObjectReturn = await resultAll.json();
            await setAll(resultAllJson.results);
        }

        fetchData();
    }, [])

    useEffect(() => {
        async function fetchData(){
            const resultDone = await fetch(`${baseUrl}/api/mishnas/done`);
            const resultDoneJson: IObjectReturn = await resultDone.json();
            await setDone(resultDoneJson.results)
        }

        fetchData();
    }, [all])

    useEffect(() => {
        async function fetchData(){
            if (all && done) {
                const percent = (done.length / all.length) * 100;
                console.log(done.length + " / " + all.length + " * 100 = " + percent);
                console.log(percent.toFixed(2))
                setPercentage(percent.toFixed(2));
            }
        }
        
        fetchData();
    }, [done])


    const getDone = () => {
    }

    const getAll = () => {}

    const getPercent = () => {}

    return (
        <div className="stats" style={{direction : "rtl",}}>
            <div className="percentage" style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: 'center',
                alignItems: "center",
                margin: "30px 5px",
            }}>
                <h1 style={{margin: "10px"}}> אחוז המשניות שנלמדו:</h1>
                <h1  style={{
                    margin: "10px",
                    textDecoration: "underline",
                }}>{percentage}%</h1>
            </div>
            <Row>
                <Col>
                    <ProgressBar 
                        animated
                        variant="info" 
                        style={{border: "1px solid black", width: "70%", margin: "20px auto 50px", height: "50px", color: "black"}} 
                        now={parseFloat(percentage)} 
                        label={`${percentage}%`}
                    />
                </Col>
            </Row>
            <div className="learnt">
                <Mishnas results={done} message="yes"/>
            </div>
        </div>
    );
}

export default Stats;