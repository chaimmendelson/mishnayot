import {useState} from 'react';
const baseUrl = ''
interface mishnaProps {
    masechet: string,
    startperek: string,
    message: string | undefined | null,
}

function Mishna(props: any) {
    const [finished, setFinished] =useState("no");

    const goBack = async () => {
        const data = {
            masechet: props.masechet,
            startperek: props.startperek
        };
        const url = `${baseUrl}/api/mishnas/go-back`;
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        if (response) {
            setFinished("no")
        }
    }

    

    const handleClick = async () => {
        const data = {
            masechet: props.masechet,
            startperek: props.startperek
        };
        const url = `${baseUrl}/api/mishnas/done`;
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        if (response) {
            setFinished("yes")
        }
    }

    return finished === "no" ? (
        <div className="mishna"
            style={{
                display: "flex",
                width: "90%",
                margin: "10px auto",
                borderRadius: "15px",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                backgroundColor: "lightblue"
            }}
        >
            <div className="mishna-info"
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <h3>{props.masechet}</h3>
                <p>פרק / פרקים -  {props.startperek}</p>
            </div>
            { !props.message ? 
                <button onClick={handleClick} style={{height: "50px", width: "110px", borderRadius: "10px"}}>סמן כנלמד</button>
                : ""}
            </div>
        ) : (
            <div className="mishna"
            style={{
                display: "flex",
                width: "90%",
                margin: "10px auto",
                borderRadius: "15px",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                backgroundColor: "lightblue"
            }}
            >
                <h2>ישר כוח על לימודך!!!</h2>
                <button onClick={goBack}>בטל</button>
            </div>
        );
}

export default Mishna;