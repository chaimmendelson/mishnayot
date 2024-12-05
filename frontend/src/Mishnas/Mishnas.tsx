import Mishna from "../Mishna/Mishna";

interface IProps {
    results: {
        id: number, 
        masechet: string, 
        startperek: string,
        done: string,
    }[] | undefined,
    message: string | null |undefined,
}

function Mishnas(props: IProps) {
    let itemsToRender;
    const items = props.results;
    let count = 0;

    if(items && items.length !== 0) {
        itemsToRender = items.map(item => {
            count+= 1;
            return (
                <Mishna 
                    masechet={item.masechet} 
                    startperek={item.startperek}
                    key={count + 1}
                    message={props.message}
                />
            );
        });
        return (
            <div className="mishna" style={{
                width: "80%",
                margin: "15px auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                border: "3px solid lightblue",
                borderRadius: "15px",
            }}>
                <div style={{display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: 'center'}}>
                    {props.message ? <h1>משניות שנלמדו</h1> : ""}
                    {itemsToRender}
                </div>
            </div>
        );
    } else {
        return (
            <div className="mishnas">
                <h2>No results for that search</h2>
            </div>
        );
    }
}

export default Mishnas;