import React, { useEffect } from "react";
import { actFetchListUser } from "redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Swal from "sweetalert2";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rightTable: {
    padding: theme.spacing(2),
  },
}));
export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.userReducer.loading);
  const listUser = useSelector((state) => state.userReducer.listUser);
  console.log({ loading, listUser });
  useEffect(() => {
    dispatch(actFetchListUser());
    setState((prevState) => {
      return { ...prevState, data: listUser };
    });
  }, []);
  const [state, setState] = React.useState({
    columns: [
      { title: "Tên", field: "hoTen" },
      { title: "Tài Khoản", field: "taiKhoan", disabled: true },
      { title: "Mật Khẩu", field: "matKhau" },
      { title: "Email", field: "email", type: "email" },
      {
        title: "Số Đt",
        field: "soDt",
        type: "numeric",
      },
      {
        title: "Mã loại người dùng",
        field: "maLoaiNguoiDung",
        lookup: { KhachHang: "KhachHang", QuanTri: "QuanTri" },
      },
    ],
    data: [],
    query: {
      pageSizeOptions: [10, 20],
    },
  });
  console.log(state.data);
  return <div>dash board</div>;
}
