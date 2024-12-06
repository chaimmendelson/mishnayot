import { Card, Button } from "react-bootstrap";
interface MishnaProps {
  masechet: string;
  prakim: string;
  done: boolean;
  id: number;
  toggleDone: (MishnaId: number) => void;
}

function Mishna(props: MishnaProps) {
  const toggleDone = () => {
    props.toggleDone(props.id);
  };

  return (
    <Card className="mb-3" bg={props.done ? "success" : "info"}>
      <Card.Body
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Card.Title>{props.masechet}</Card.Title>
          <Card.Text>
            {props.prakim.includes("-") ? "פרקים" : "פרק"} {props.prakim}
          </Card.Text>
        </div>
        {props.done ? (
          <Button variant="light" onClick={toggleDone}>
            בטל סימון
          </Button>
        ) : (
          <Button variant="primary" onClick={toggleDone}>
            סמן כנלמד
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Mishna;
