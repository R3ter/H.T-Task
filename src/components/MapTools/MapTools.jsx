import ReginMenu from "./ReginMenu";
import { Accordion } from "@chakra-ui/react";

export default ({ onclick, ontoggle, content, citiesInfo, open }) => {
  return (
    <div style={{ width: "100%" }}>
      <Accordion index={open}>
        {citiesInfo.map((e, i) => (
          <ReginMenu
            citiesInfo={citiesInfo}
            key={i}
            number={i}
            onclick={onclick}
            ontoggle={ontoggle}
            Content={content}
            title={e.name}
          />
        ))}
      </Accordion>
    </div>
  );
};
