import React, { useState, useEffect } from "react";
const INITIAL_OFFSET = 25;
const circleConfig = {
  viewBox: "0 0 38 38",
  x: "19",
  y: "19",
  radio: "15.91549430918954",
};

const CircleProgressBarBase = ({
  className,
  trailStrokeColor,
  strokeColor,
  percentage,
}) => {
  const [progressBar, setProgressBar] = useState(0);
  const updatePercentage = () => {
    setTimeout(() => {
      setProgressBar(progressBar + 1);
    }, 10);
  };
  useEffect(() => {
    if (percentage > 0) updatePercentage();
  }, [percentage]);

  useEffect(() => {
    if (progressBar < percentage) updatePercentage();
  }, [progressBar]);
  return (
    <figure
      className={className}
      style={{
        transform: "scale:(0.5)",
        width: "10rem",
        margin: "0",
        position: "relative",
      }}
    >
      <svg viewBox={circleConfig.viewBox}>
        <circle
          className="ring"
          cx={circleConfig.x}
          cy={circleConfig.y}
          r={circleConfig.radio}
          fill="transparent"
          stroke={trailStrokeColor}
        />

        <circle
          className="path"
          cx={circleConfig.x}
          cy={circleConfig.y}
          r={circleConfig.radio}
          fill="transparent"
          stroke={strokeColor}
          strokeDasharray={`${progressBar} ${100 - progressBar}`}
          strokeDashoffset={INITIAL_OFFSET}
        />
      </svg>
      <p className="circle-percentage">{progressBar / 10}</p>
    </figure>
  );
};
export default CircleProgressBarBase;
