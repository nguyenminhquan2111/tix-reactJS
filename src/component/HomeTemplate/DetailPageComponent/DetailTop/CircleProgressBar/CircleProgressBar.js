import CircleProgressBarBase from "./CircleProgressBarBase";
import styled from "styled-components";

const CircleProgressBar = styled(CircleProgressBarBase)`
  .circle-label {
    transform: translateY(0.25em);
  }

  .circle-percentage {
    font-size: 0.7em;
    line-height: 1;
    text-anchor: middle;
    position: absolute;
    z-index: 10;
    color: white;
    font-size: 3rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .circle-text {
    font-size: 0.2em;
    text-transform: uppercase;
    text-anchor: middle;
    transform: translateY(0.7em);
  }
`;
export default CircleProgressBar;
