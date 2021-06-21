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

export const URL_LOGIN_USER =
  "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap";
export const URL_SIGN_UP_USER =
  "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy";

export const URL_GET_LIST_USER =
  "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP09";
