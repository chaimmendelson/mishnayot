import { Container, Stack } from "react-bootstrap";
import Mishna from "./Mishna";
import { Api } from "../utils/api";

interface IProps {
  results:
    | {
        id: number;
        masechet: string;
        startperek: string;
        done: boolean;
      }[]
    | undefined;
  toggleDone: (MishnaId: number) => void;
}

function Mishnas(props: IProps) {
  let itemsToRender;
  const items = props.results;
  const orderedItems = items?.sort((a, b) => {
    // First, move done items to the end
    if (a.done && !b.done) return 1; // `a` is done, `b` is not
    if (!a.done && b.done) return -1; // `b` is done, `a` is not

    // If both are the same (both done or not done), sort by id
    return a.id - b.id;
  });

  if (orderedItems && orderedItems.length !== 0) {
    itemsToRender = orderedItems.map((item) => {
      return (
        <Mishna
          masechet={item.masechet}
          startperek={item.startperek}
          done={item.done}
          id={item.id}
          key={item.id}
          toggleDone={props.toggleDone}
        />
      );
    });
    return (
      <Container
        style={{
          height: "70vh", // Adjust height for showing 5 items (example: 40px per item)
          overflowY: "auto",
        }}
      >
        <Stack gap={0.5}>{itemsToRender}</Stack>
      </Container>
    );
  } else {
    return <Container>{"לא נמצאו משניות"}</Container>;
  }
}

export default Mishnas;
