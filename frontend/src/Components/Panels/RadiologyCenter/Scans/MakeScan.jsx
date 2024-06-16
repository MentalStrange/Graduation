import { useState } from "react";
import {  Button, Input, Flex, Image, Heading } from "@chakra-ui/react";

function MakeScan() {
  const [scan, setScan] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setScan(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Flex direction="column" align="center" justify="center" height="100%">
      <Heading as="h1" size="xl" mb={6} textAlign="center">
        Make a Scan
      </Heading>
      <Input type="file" onChange={handleFileChange} display="none" id="file-upload" />
      <label htmlFor="file-upload">
        <Button as="span" mt={2}>
          Browse
        </Button>
      </label>
      {scan && (
        <>
          <Image src={scan} alt="Selected Scan" boxSize="400px" objectFit="cover" mt={4} />
          <Button mt={2} onClick={() => console.log("Scan uploaded:", scan)}>
            Upload Scan
          </Button>
        </>
      )}
    </Flex>
  );
}

export default MakeScan;