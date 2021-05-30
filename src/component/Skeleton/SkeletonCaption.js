import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";

function TypographyDemo() {
  return (
    <div>
      <Typography component="div" variant="caption">
        <Skeleton width={230} height={30} />
      </Typography>
    </div>
  );
}
TypographyDemo.propTypes = {
  loading: PropTypes.bool,
};

export default function SkeletonCaption() {
  return <TypographyDemo loading />;
}
