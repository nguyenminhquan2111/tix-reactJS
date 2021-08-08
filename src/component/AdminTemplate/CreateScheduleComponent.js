import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import { FreeBreakfastOutlined } from "@material-ui/icons";
import {
  actCreateSchedule,
  actFetchTheater,
} from "redux/actions/theaterManagerAction";
const useStyles = makeStyles({
  input: {
    margin: "10px",
    width: "40%",
    "@media(max-width: 960px)": {
      width: "90%",
      margin: "0 auto",
      marginTop: "10px",
    },
  },
});
export default function CreateScheduleComponent() {
  let moment = require("moment");
  const classes = useStyles();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    tenPhim: "",
    ngayChieuGioChieu: "",
    heThongRap: "",
    cumRap: "",
    tenRap: "",
    giaVe: 0,
  });
  const [validation, setValidation] = useState(false);
  const [arr1, setArr1] = useState([]); // tenPhim
  const [arr2, setArr2] = useState([]); //hethongrap
  const [arr3, setArr3] = useState([]); //cumrap
  const [arr4, setArr4] = useState([]); // tim ma rap BHDStar
  const [arr5, setArr5] = useState([]); // tim ma rap CGV
  const [arr6, setArr6] = useState([]); // tim ma rap CineStar
  const [arr7, setArr7] = useState([]); // tim ma rap Galaxy
  const [arr8, setArr8] = useState([]); // tim ma rap LotteCinima
  const [arr9, setArr9] = useState([]); // tim ma rap MegaGS

  useEffect(() => {
    axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09",
      method: "GET",
    })
      .then((response) => {
        setArr1(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",
      method: "GET",
    })
      .then((response) => {
        setArr2(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP09",
      method: "GET",
    })
      .then((response) => {
        setArr3(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=BHDStar",
      method: "GET",
    }).then((response) => {
      setArr4(response.data);
    });
    axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=CGV",
      method: "GET",
    }).then((response) => {
      setArr5(response.data);
    });
    axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=CineStar",
      method: "GET",
    }).then((response) => {
      setArr6(response.data);
    });
    axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=Galaxy",
      method: "GET",
    }).then((response) => {
      setArr7(response.data);
    });
    axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=LotteCinima",
      method: "GET",
    }).then((response) => {
      setArr8(response.data);
    });
    axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=MegaGS",
      method: "GET",
    }).then((response) => {
      setArr9(response.data);
    });
  }, []);

  const handleOnchange = (e) => {
    const { value, name } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
    console.log({ name, value });
  };
  const renderTenPhim = () => {
    if (arr1 === [])
      return <MenuItem value={0}>Vui lòng đợi một chút...</MenuItem>;
    return arr1.map((item, index) => {
      return (
        <MenuItem key={index} value={item.tenPhim}>
          {item.tenPhim}
        </MenuItem>
      );
    });
  };
  const renderHeThongRap = () => {
    if (input.tenPhim === "")
      return <MenuItem>Vui lòng chọn tên phim.</MenuItem>;

    return arr2.map((item, index) => {
      return (
        <MenuItem key={index} value={item.tenHeThongRap}>
          {item.tenHeThongRap}
        </MenuItem>
      );
    });
  };
  const renderCumRap = () => {
    if (input.heThongRap === "")
      return <MenuItem>Vui lòng chọn hệ thống rạp.</MenuItem>;
    return arr3.map((item, index) => {
      if (item.tenHeThongRap === input.heThongRap)
        return item.lstCumRap.map((cumrap) => {
          return (
            <MenuItem key={index} value={cumrap.tenCumRap}>
              {cumrap.tenCumRap}
            </MenuItem>
          );
        });
    });
  };
  const renderTenRap = () => {
    if (input.cumRap === "") return <MenuItem>Vui lòng chọn cụm rạp.</MenuItem>;
    let arr = [
      "Rạp 1",
      "Rạp 2",
      "Rạp 3",
      "Rạp 4",
      "Rạp 5",
      "Rạp 6",
      "Rạp 7",
      "Rạp 8",
      "Rạp 9",
      "Rạp 10",
    ];
    return arr.map((item, index) => {
      return (
        <MenuItem key={index} value={item}>
          {item}
        </MenuItem>
      );
    });
  };
  const renderGiaVe = () => {
    let arr = [75000, 100000, 120000, 150000];
    return arr.map((item, index) => {
      return (
        <MenuItem key={index} value={item}>
          {item} vnd
        </MenuItem>
      );
    });
  };
  const TimMaPhim = (tenPhim) => {
    for (let i = 0; i < arr1.length; i++) {
      if (tenPhim === arr1[i].tenPhim) return arr1[i].maPhim;
    }
  };
  const TimMaRap = (tenHeThongRap, tenCumRap, tenRap) => {
    let temp = 0;
    switch (tenHeThongRap) {
      case "BHDStar": {
        arr4.forEach((cumrap) => {
          if (tenCumRap === cumrap.tenCumRap)
            cumrap.danhSachRap.forEach((rap) => {
              if (rap.tenRap === tenRap) temp = rap.maRap;
            });
        });
        break;
      }
      case "CGV": {
        arr5.forEach((cumrap) => {
          if (tenCumRap === cumrap.tenCumRap)
            cumrap.danhSachRap.forEach((rap) => {
              if (rap.tenRap === tenRap) temp = rap.maRap;
            });
        });
        break;
      }
      case "CineStar": {
        arr6.forEach((cumrap) => {
          if (tenCumRap === cumrap.tenCumRap)
            cumrap.danhSachRap.forEach((rap) => {
              if (rap.tenRap === tenRap) temp = rap.maRap;
            });
        });
        break;
      }
      case "Galaxy": {
        arr7.forEach((cumrap) => {
          if (tenCumRap === cumrap.tenCumRap)
            cumrap.danhSachRap.forEach((rap) => {
              if (rap.tenRap === tenRap) temp = rap.maRap;
            });
        });
        break;
      }
      case "LotteCinima": {
        arr8.forEach((cumrap) => {
          if (tenCumRap === cumrap.tenCumRap)
            cumrap.danhSachRap.forEach((rap) => {
              if (rap.tenRap === tenRap) temp = rap.maRap;
            });
        });
        break;
      }
      case "MegaGS": {
        arr9.forEach((cumrap) => {
          if (tenCumRap === cumrap.tenCumRap)
            cumrap.danhSachRap.forEach((rap) => {
              if (rap.tenRap === tenRap) temp = rap.maRap;
            });
        });
        break;
      }
      default:
        break;
    }
    return temp;
  };
  const TimMaHeThongRap = (tenHeThongRap) => {
    arr2.forEach((item) => {
      if (tenHeThongRap === item.tenHeThongRap) return item.maHeThongRap;
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ input });

    let maPhim = TimMaPhim(input.tenPhim);
    console.log({ maPhim });
    let maHeThong = "";
    arr2.forEach((item) => {
      if (item.tenHeThongRap === input.heThongRap)
        maHeThong = item.maHeThongRap;
    });
    console.log(maHeThong);
    let maRap = TimMaRap(maHeThong, input.cumRap, input.tenRap);
    const obj = new Date(input.ngayChieuGioChieu);
    const data = {
      maPhim: maPhim,
      ngayChieuGioChieu: `${obj.getDate().toString().padStart(2, 0)}/${(
        obj.getMonth() + 1
      )
        .toString()
        .padStart(2, 0)}/${obj.getFullYear()} ${obj
        .getHours()
        .toString()
        .padStart(2, 0)}:${obj.getMinutes().toString().padStart(2, 0)}:00`,
      maRap: maRap,
      giaVe: input.giaVe,
    };
    console.log({ data });
    actCreateSchedule(data)
      .then((res) => {
        console.log(res);
        Swal.fire(
          "Tạo lịch chiếu thành công !",
          "Nhấn OK để thoát!",
          "success"
        );
        dispatch(actFetchTheater());
      })
      .catch((error) => {
        console.log(error.response);
        Swal.fire(
          "Tạo lịch chiếu không thành công !",
          error.response.data,
          "error"
        );
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        size="small"
        InputLabelProps={{ shrink: true }}
        value={input.tenPhim}
        className={classes.input}
        id="outlined-basic"
        label="Chọn tên phim"
        variant="outlined"
        onChange={handleOnchange}
        name="tenPhim"
        select
      >
        {renderTenPhim()}
      </TextField>
      <TextField
        size="small"
        InputLabelProps={{ shrink: true }}
        value={input.heThongRap}
        className={classes.input}
        id="outlined-basic"
        label="Chọn hệ thống rạp"
        variant="outlined"
        onChange={handleOnchange}
        name="heThongRap"
        select
      >
        {renderHeThongRap()}
      </TextField>
      <TextField
        size="small"
        InputLabelProps={{ shrink: true }}
        value={input.cumRap}
        className={classes.input}
        id="outlined-basic"
        label="Chọn cụm rạp"
        variant="outlined"
        onChange={handleOnchange}
        name="cumRap"
        select
      >
        {renderCumRap()}
      </TextField>
      <TextField
        size="small"
        InputLabelProps={{ shrink: true }}
        value={input.tenRap}
        className={classes.input}
        id="outlined-basic"
        label="Chọn rạp"
        variant="outlined"
        onChange={handleOnchange}
        name="tenRap"
        select
      >
        {renderTenRap()}
      </TextField>

      <TextField
        label="Ngày giờ chiếu"
        type="datetime-local"
        value={input.ngayChieuGioChieu}
        onChange={handleOnchange}
        name="ngayChieuGioChieu"
        className={classes.input}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        size="small"
        InputLabelProps={{ shrink: true }}
        value={input.giaVe}
        className={classes.input}
        id="outlined-basic"
        label="Chọn giá vé"
        variant="outlined"
        onChange={handleOnchange}
        name="giaVe"
        select
      >
        {renderGiaVe()}
      </TextField>
      <hr />
      <Button
        style={{ marginLeft: "10px" }}
        type="submit"
        variant="contained"
        color="primary"
        disabled={
          input.tenPhim === "" ||
          input.ngayChieuGioChieu === "" ||
          input.heThongRap === "" ||
          input.cumRap === "" ||
          input.tenRap === "" ||
          input.giaVe === 0
            ? true
            : false
        }
      >
        Tạo lịch chiếu
      </Button>
    </form>
  );
}
