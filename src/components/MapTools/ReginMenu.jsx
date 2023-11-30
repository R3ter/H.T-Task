import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  FormControl,
  FormLabel,
  Switch,
  Text,
  InputGroup,
  AccordionIcon,
} from "@chakra-ui/react";
export default ({
  onclick = () => {},
  ontoggle,
  Content,
  title,
  number,
  citiesInfo,
}) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton
          onClick={() => {
            onclick(number);
          }}
          _expanded={{ bg: citiesInfo[number].color, color: "white" }}
        >
          <Box as="span" flex="1" textAlign="left" display={"flex"} gap={5}>
            <div
              style={{
                width: "20px",
                height: "20px",
                marginRight: "20px",
                borderRadius: "10px",
                alignSelf: "center",
                backgroundColor: citiesInfo[number].color,
              }}
            ></div>
            <div>{title}</div>
            <Switch
              onChange={(e) => ontoggle(number, e.target.value)}
              isChecked={!!citiesInfo[number].available}
              alignSelf={"center"}
              id="email-alerts"
            />
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        <div>
          <InputGroup
            style={{
              display: "flex",
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            {Content}
          </InputGroup>
        </div>
      </AccordionPanel>
    </AccordionItem>
  );
};
