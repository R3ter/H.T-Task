import { Wrap, WrapItem, Button, Box } from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Portal,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
export default ({ onSave, onCancel, onDelete }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        marginTop: "50px",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <Wrap width="80%" spacing={10}>
        <WrapItem display={"flex"} width={"100%"}>
          <Button
            flexGrow={1}
            colorScheme="red"
            onClick={onCancel}
            variant="ghost"
          >
            Prevent
          </Button>
          <Button flexGrow={1} onClick={() => onSave()} colorScheme="green">
            Save
          </Button>
        </WrapItem>
        <WrapItem zIndex={10000} width={"100%"}>
          <Popover>
            {({ isOpen, onClose }) => (
              <>
                <PopoverTrigger>
                  <Button width={"100%"} colorScheme="red">
                    <DeleteIcon />
                    <Box>Delete</Box>
                  </Button>
                </PopoverTrigger>
                <Portal>
                  <PopoverContent float={"right"} width={"70%"}>
                    <PopoverArrow />
                    <PopoverHeader>
                      Are you sure you want to delete it?
                    </PopoverHeader>
                    <PopoverBody>
                      <Button
                        onClick={() => {
                          onDelete();
                          onClose();
                        }}
                        colorScheme="red"
                      >
                        Delete
                      </Button>
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </>
            )}
          </Popover>
        </WrapItem>
      </Wrap>
    </div>
  );
};
