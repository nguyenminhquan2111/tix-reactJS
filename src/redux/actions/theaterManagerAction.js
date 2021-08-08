import axios from "axios";
import * as ActionType from "../constants";

export const actGetTheaterSystem = () => {
  return axios({
    url: "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",
    method: "GET",
  });
};
export const actGetTheaterCluster = (data) => {
  return axios({
    url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${data}`,
    method: "GET",
  });
};
export const actGetMovieSchedule = (data) => {
  return axios({
    url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${data}`,
    method: "GET",
  });
};
export const actGetSchduleFromSystem = (data) => {
  return axios({
    url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${data}&maNhom=GP01`,
  });
};
export const actFetchTheater = () => {
  return (dispatch) => {
    dispatch(actGetTheaterRequest());
    console.log(1111);
    let arr = [];
    let count = 0;
    actGetTheaterSystem()
      .then((res1) => {
        const systemTheater = res1.data;
        systemTheater.forEach((system) => {
          actGetSchduleFromSystem(system.maHeThongRap).then((res2) => {
            res2.data.forEach((schedule) => {
              schedule.lstCumRap.forEach((listCumRap) => {
                listCumRap.danhSachPhim.forEach((danhSachPhim) => {
                  danhSachPhim.lstLichChieuTheoPhim.forEach((phim) => {
                    arr.push({
                      logo: system.logo,
                      tenHeThongRap: system.tenHeThongRap,
                      hinhAnhPhim: phim.hinhAnh,
                      giaVe: phim.giaVe,
                      tenRap: phim.tenRap,
                      ngayChieuGioChieu: phim.ngayChieuGioChieu,
                      tenPhim: danhSachPhim.tenPhim,
                      diaChi: listCumRap.diaChi,
                      tenCumRap: listCumRap.tenCumRap,
                    });
                  });
                });
              });
            });

            count++;
            if (count === systemTheater.length)
              dispatch(actGetTheaterSuccess(arr));
          });
        });
      })
      .catch((error) => {
        actGetTheaterFailed(error);
      });
  };
};
export const actCreateSchedule = (data) => {
  const userAdmin = JSON.parse(localStorage.getItem("UserAdmin"));
  return axios({
    url: "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu",
    method: "POST",
    data: data,
    headers: {
      Authorization: `Bearer ${userAdmin.accessToken}`,
    },
  });
};
export const actGetTheaterRequest = () => {
  return {
    type: ActionType.FETCH_THEATER_REQUEST,
  };
};
export const actGetTheaterSuccess = (data) => {
  return {
    type: ActionType.FETCH_THEATER_SUCCESS,
    payload: data,
  };
};
export const actGetTheaterFailed = (data) => {
  return {
    type: ActionType.FETCH_THEATER_FAILED,
    payload: data,
  };
};
