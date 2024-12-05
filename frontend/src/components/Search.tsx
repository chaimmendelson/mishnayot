import React, { useState } from "react";
import { InputGroup, FormControl, Container, Row } from "react-bootstrap";

interface SearchProps {
  onValueChange: (value: string) => void; // Function to handle value updates on change
}

const Search: React.FC<SearchProps> = ({ onValueChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  // Update the value in the parent component
  React.useEffect(() => {
    onValueChange(searchTerm);
  }, [searchTerm]);
  
  return (
    <Container className="my-5">
      <Row>
        <InputGroup>
          <FormControl
            placeholder="חפש מסכת"
            value={searchTerm}
            onChange={handleInputChange}
            style={{
              borderRadius: "12px",
              border: "2px solid black",
              margin: "0 auto",
            }}
          />
        </InputGroup>
      </Row>
    </Container>
  );
};

export default Search;
