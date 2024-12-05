import React, {useState} from 'react';
import {BsSearch} from "react-icons/bs";

function Search(props: any) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleKeyPress = (event: any) => {
        console.log("event")
        if(event.key === 'Enter'){
            console.log(event)
          handleSearch();
        }
      }

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchTerm(e.currentTarget.value);
    }

    const handleSearch = () => {
        props.searchFunc(searchTerm);
    }

    return (
        <div className="search"
            style={{
                display: "flex",
                flexDirection: "row",
                width: "80%",
                margin: "50px auto",
                justifyContent: "space-around",
                alignItems: "center"
            }}
        >
            <h2 style={{margin: 0, padding: 0}}>חפש מסכת:</h2>
            <div style={{display: 'flex', flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <input placeholder="חפש מסכת" onKeyPress={handleKeyPress} onChange={handleInputChange} style={{
                height: "40px",
                width: "125px",
                borderRadius: "12px",
                border: "2px solid black",
                margin: "0 10px",
            }}
            />
            <BsSearch onClick={handleSearch} style={{
                width: "25px",
                height: "25px",
            }}/>
            </div>
        </div>
    );
}

export default Search;