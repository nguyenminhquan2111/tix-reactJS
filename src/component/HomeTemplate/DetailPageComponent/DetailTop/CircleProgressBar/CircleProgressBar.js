import React from "react";
import CircleProgressBarBase from "./CircleProgressBarBase";
import styled from "styled-components";

const CircleProgressBar = styled(CircleProgressBarBase)`
  .circle-label {
    transform: translateY(0.25em);
  }

  .circle-percentage {
    font-size: 0.6em;
    line-height: 1;
    text-anchor: middle;
    transform: translateY(-0.25em);
  }

  .circle-text {
    font-size: 0.2em;
    text-transform: uppercase;
    text-anchor: middle;
    transform: translateY(0.7em);
  }
`;
export default CircleProgressBar;
