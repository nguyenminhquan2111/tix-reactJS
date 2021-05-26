export const URL_GET_LIST_MOVIE =
  "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09";

export const URL_GET_LIST_MOVIE_COMING =
  "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP11";

export const URL_GET_DETAIL_MOVIE = (idMovie) =>
  ` https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${idMovie}`;

export const URL_GET_LIST_CINEMA_BRAND =
  "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap";

export const URL_GET_LIST_CINEMA_BY_BRAND = (idCinemaBrand) =>
  `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${idCinemaBrand}`;
