import { Flex, IconButton, Input, Stack } from "@chakra-ui/react";
import { useRef } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Link } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";

const FileInputIcon = () => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
      // You can handle the file here (e.g., upload it or process it)
    }
  };

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Input type="text" placeholder="Message" mr={3} bg={"white"} />
        <Link>
        <IconButton bg={'transparent'}>
          <SendIcon />
        </IconButton>
        </Link>
        <Stack direction="row" spacing={4} align="center">
          <IconButton
            icon={<AttachFileIcon />}
            onClick={handleClick}
            aria-label="Upload file"
            bg={'transparent'}
          />
          <Input
            type="file"
            ref={inputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </Stack>
      </Flex>
    </>
  );
};

export default FileInputIcon;
