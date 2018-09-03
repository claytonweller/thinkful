import React from "react";
import { shallow, mount } from "enzyme";

import HotOrCold from "./HotOrCold";

describe("<HotOrCold />", () => {
  it("Renders w/out crashing", () => {
    shallow(<HotOrCold />);
  });
});
