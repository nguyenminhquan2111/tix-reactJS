import { Box, makeStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actGetBookingChair } from "redux/actions/movieActions";

const useStyles = makeStyles(() => ({
  screen: {
    marginTop: "50px",
    marginBottom: "20px",
  },
  listChair: {},
  chair: {
    width: "35px",
    height: "35px",
    margin: "5px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "rgb(116,112,112)",
    color: "#FFF",
  },
  VipChair: {
    backgroundColor: "rgb(216,100,6)",
    color: "#FFF",
  },
  bookedChair: {
    backgroundColor: "rgb(32,32,32)",
    color: "#FFF",
  },
  bookingChair: {
    backgroundColor: "rgb(57,146,57)",
  },
}));

export default function DetailRoom({ detailRoom }) {
  const classes = useStyles();
  // console.log("DetailRoom", detailRoom);
  const listBookingChair = useSelector(
    (state) => state.movieReducer.listBookingChair
  );

  const dispatch = useDispatch();
  return (
    <>
      <Box className={classes.screen}>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAABcCAMAAAChpiF9AAABklBMVEUAAADj4+PT09Pr6+vKysrs7OzExMS9vb2+vr7k5OTHx8f4+Pj////7+/v6+vr////39/f4+Pj09PT29vbv7+/t7e3o6Ojn5+fg4ODj4+Pc3Nzf39/g4ODY2Nja2trb29vX19fV1dXR0dHS0tLQ0NDFxcXBwcHx8fHAwMDBwcG7u7vJycnPz8/Nzc3MzMzJycnDw8Pu7u7Nzc3Z2dnCwsL19fW/v7/p6enm5ubi4uLX19fExMT09PTd3d3W1tbQ0ND4+PjHx8fu7u7r6+vMzMzd3d3V1dXy8vL19fX09PT4+Pjm5ubd3d3y8vLv7+/x8fH6+vrKysr////o6Ojt7e3g4ODm5ubU1NT29vby8vLW1tb////o6OjY2NjR0dG9vb3Kysr19fXi4uLZ2dno6Ojz8/Pu7u7m5ubb29vAwMDs7OzGxsbPz88WFhYgICB5eXlsbGw3NzegoKC8vLy8vLyqqqqMjIwJCQkuLi5cXFyurq5KSkqbm5vFxcWysrLGxsbIyMjX19fExMTS0tLIyMgAAAA9DjvxAAAAhXRSTlMAaaRRxkvc+vZj0wUHChQQIB4pJj9FWFt1boR7d5GKh5qgramz2Og27uv+z7a8v8ziQrmN5TLwVV5xlN8tgJewDdU8ScJ+nTkaFyNggTEwJBvJF085cGSnDzydA1SWsfTCM2iTRiwtU43xN9K59vTW3uvHws/O0vvw3sHo07PMeZJhXDdE9bZbFgAABY5JREFUeNrs060OwjAUhuGj6BG7jgVQFU3NrmBqFofGzy5blnHfjGYCQ0PSBnHyPv1J3gv45AngKwYCMBCAgQAMBMhgIEAGAwEyGAiQwUCADAYC/JP8oHdXwJ5e6pgdYNAsVTStqjq3v+NXmrbQbSM1rKp630/63mjaRq9SwxhjfKR3oGkbPUoF2xkwapNy0wUwapJiQwuYNUipJXzywdO0mQ6LFLqdfNKlm3T0i3166U0bCOIAvopWHEia71BIT7FB8pVDGglV7SnilEqRKh96o/syfmIwhGS+d8eGmiY3jN0SZ348Zv8ztrSXofyGM9qfO9/ZcVad0WjU2X87lCm3Ka/YUc55h5AW4+fsGJtPhLTahh1jedu9Rd28FD/K9eZpql/PfT3Ns07/el4tTuS+7ctLdoSnLpp29yjXkH1Ii4MfmW43k+GreQB+8ZjR+/elPqH7tyw/serW16R+PkR+XjWYPGUvp1NckN1h35T6mjRkzSr7OiQN8CHWeZWxGQ5VHKULPGOVWFEAoYzibBhEftmW2kRCDUkTvrGqVhPOJ3wyKQrHQrmO7IOSeFqIxPAQdGgE50IkYRwX8wCkViLF6k/+tGWU4mMncv+25RWr6LPLSQN8yGTIeZrggnh4CCDgIsWNgRlOMWrOlcA6K9syzl9bcNIA9wOrZjN2xztufnQp15JnkGnjzqIsMRh0aiBwhcI5LMYogGzseuDiguza3lhqfFWo07h/6/KGVfLQH5AmzGCO26HNIDGDMDKJBm8gFA6wIlyMwWC7IGVbaqwYSBP6D6yKZ5s0AhfENokI7cTYcWLbIXi2UDjAiuYws20PlljLttRYpbJJI55ZFWvnl/MC5XoyLogTRsJxEuOk8TyMwXOEwgFWhIvhONsFKdtSY5XqNO7fvrxmFdxZpBlLmFuWTCwrMdbcRCIEzxIKB1gRLoZlbRekbEuNVSqLNOOOHW51Rf6F5RX571bsYJe9m5sfxRf/in/KlNuae5fsUI89Qt6NR3agi499Qt6NLxfsMD/Pzu7vz/IPygvl3+zY22oaURSA4dWKFyIm4Klqaw9XuS4ipgV7YTAKJirECdqJF7EDLb6GL961x5kEjIeZW9f/zdrL/YNPsOlz7kBS8VvvAUNavqSx+QaYspE0ar9vb924Fd5o+ry7JikMvwLGDNO88S5/Oct4LWn63DvFS++8+een87pp+ty7OZekgiZgTiAJ5Rv/Wi/CK02ffzfykszmM2DQRpLxvgAGeZLIpAGYNEn2xnvX7d65oztcNG2jE730XvT73W5fVzw0baUv5LTgI2BUICcVap8Ao2oFOWVdA8xaywn+6ofy9It4NG2nV74cV6x7dceLF01b6pIcV32n6vHSQ9OWuipHDfVfKz3Oyg1N2+qhHBPk1ONjLv5yNG2rAzlinhuNcuHR7YamrfVcDltfj651VPRD09Z6LQflqx8A46p5OaRYBcwrygF+ttN56rgTL5q211lf9ptmMk+Z0N/toWmLPZX9ypnMg366del5oGmLXZa9LrMA1KXsM87e3GxHl/uhaZs9lj0KlaCi84qmrXZB3pp8dyrRUjRttSfyRr5XBhDq5WXXtOcsFvFe0LTdnsqu9mw2GMwG0VI0bbfbsuPyamt9FaFpy7370ltqt5/bkWd3o2nLXdp5472/H+uMt6NX+n/7cY7DIAxFUfT1NlOyHQpKQ0NEheQ67H8Jsc0QQLAC7uHr4Us/uzPtVfW3DjfVi4mmn92VdswLwIHRX/4GcJBr48uu7/q+67YfTT+9S69VUwI4abRyFYATp4X9fFz80sWhado5q1nRtkM7hEkbhqbpdiiUmBzABaMoKwBcyBT4ZmyiMVwamqbnp5dkMwCXrCQL4IbkDYAbXoFPKx+Ppuld/wBSjlVUa3x54gAAAABJRU5ErkJggg=="
          alt="screen"
        />
      </Box>
      <Box className={classes.listChair}>
        {detailRoom?.danhSachGhe.map((item, index) => {
          let indexBooking = listBookingChair.findIndex(
            (chair) => chair.maGhe === item.maGhe
          );
          return (
            <Fragment key={index}>
              <button
                type="button"
                disabled={item.daDat}
                className={`${classes.chair} ${
                  item.daDat
                    ? classes.bookedChair
                    : indexBooking !== -1
                    ? classes.bookingChair
                    : item.loaiGhe === "Vip"
                    ? classes.VipChair
                    : ""
                }`}
                onClick={() => {
                  dispatch(actGetBookingChair(item));
                }}
              >
                {item.daDat ? <CloseIcon /> : item.stt}
              </button>
              {(index + 1) % 16 === 0 ? <br /> : ""}
            </Fragment>
          );
        })}
      </Box>
    </>
  );
}
