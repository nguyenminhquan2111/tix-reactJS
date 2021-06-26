import React, { useEffect, useState } from "react";
import { actFetchListUser } from "redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import Swal from "sweetalert2";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import { TablePaginationActions } from "./../../../component/AdminTemplate/TablePagination";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import PropTypes from "prop-types";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import CreateIcon from "@material-ui/icons/Create";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import { actDeleteUser } from "redux/actions/userActions";
import ModalUser from "component/AdminTemplate/ModalUser";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.green,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rightTable: {
    padding: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
  action: {
    display: "flex",
    flexDirection: "row",
  },
  fab: {
    margin: "0 3px",
  },
  container: {
    display: "flex",
    margin: "5px",
    justifyContent: "space-between",
    "@media(max-width: 500px)": {
      flexDirection: "column",
    },
  },
  loading: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    transform: "scale(3)",
  },
  title: {
    color: "#000",
  },
}));
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
  root: {
    fontSize: "0.75rem",
  },
}))(TableCell);
const StyledTableCellBody = withStyles((theme) => ({
  root: {
    fontSize: "0.75rem",
  },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.userReducer.loadingListUser);
  const listUser = useSelector((state) => state.userReducer.listUser);
  const [keyWord, setKeyWord] = useState("");
  const [open, setOpen] = useState(false);
  const [userEdit, setUserEdit] = useState(null);
  //-----------------
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //----------------

  console.log({ isLoading, listUser });
  useEffect(() => {
    dispatch(actFetchListUser());
  }, []);
  const handleDeleteUser = (user) => {
    actDeleteUser(user)
      .then((result) => {
        Swal.fire("Xoá tài khoản thành công!", "Nhấn OK để thoát!", "success");
        dispatch(actFetchListUser());
      })
      .catch((error) => {
        Swal.fire(
          "Xoá tài khoản không thành công !",
          error.response.data,
          "error"
        );
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (info) => {
    setOpen(info);
  };
  const renderDashboard = () => {
    if (isLoading) return <CircularProgress className={classes.loading} />;
    let data = listUser.filter((user) => {
      return (
        user.hoTen.toLowerCase().indexOf(keyWord.toLowerCase().trim()) !== -1 ||
        user.taiKhoan.toLowerCase().indexOf(keyWord.toLowerCase().trim()) !==
          -1 ||
        user.matKhau.toLowerCase().indexOf(keyWord.toLowerCase().trim()) !==
          -1 ||
        user.email.toLowerCase().indexOf(keyWord.toLowerCase().trim()) !== -1 ||
        user.soDt.toLowerCase().indexOf(keyWord.toLowerCase().trim()) !== -1 ||
        user.maLoaiNguoiDung
          .toLowerCase()
          .indexOf(keyWord.toLowerCase().trim()) !== -1
      );
    });
    console.log({ data });
    if (data && data.length >= 0)
      return (
        <div>
          <h1 className={classes.title}>Dashboard User</h1>
          <ModalUser open={open} closeModal={handleClose} userEdit={userEdit} />

          <div className={classes.container}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setUserEdit(null);
                handleClickOpen();
              }}
              startIcon={<AddCircleIcon />}
            >
              Thêm người dùng
            </Button>
            <TextField
              onChange={(e) => setKeyWord(e.target.value)}
              id="input-with-icon-grid"
              label="Tìm kiếm"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <TableContainer
            component={Paper}
            aria-label="custom pagination table"
          >
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Tên</StyledTableCell>
                  <StyledTableCell align="center">Tài khoản</StyledTableCell>
                  <StyledTableCell align="center">Mật khẩu</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell align="center">
                    Số điện thoại
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Mã loại người dùng
                  </StyledTableCell>

                  <StyledTableCell align="center">Thao tác</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? data.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : data
                ).map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCellBody component="th" scope="row">
                      {row.hoTen}
                    </StyledTableCellBody>
                    <StyledTableCellBody align="right">
                      {row.taiKhoan}
                    </StyledTableCellBody>
                    <StyledTableCellBody align="right">
                      {row.matKhau}
                    </StyledTableCellBody>
                    <StyledTableCellBody align="right">
                      {row.email}
                    </StyledTableCellBody>
                    <StyledTableCellBody align="right">
                      {row.soDt}
                    </StyledTableCellBody>
                    <StyledTableCellBody align="right">
                      {row.maLoaiNguoiDung}
                    </StyledTableCellBody>

                    <StyledTableCellBody
                      align="right"
                      className={classes.action}
                    >
                      <Fab
                        className={classes.fab}
                        color="primary"
                        size="small"
                        onClick={() => {
                          setUserEdit(row);
                          handleClickOpen();
                        }}
                      >
                        <LightTooltip title="Sửa">
                          <CreateIcon />
                        </LightTooltip>
                      </Fab>
                      <Fab
                        className={classes.fab}
                        color="secondary"
                        size="small"
                      >
                        <LightTooltip title="Xóa">
                          <DeleteIcon
                            onClick={() => {
                              handleDeleteUser(row);
                            }}
                          />
                        </LightTooltip>
                      </Fab>
                    </StyledTableCellBody>
                  </StyledTableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    style={{ overflow: "visible" }}
                    rowsPerPageOptions={[10, 25, { label: "All", value: -1 }]}
                    colSpan={2}
                    count={listUser.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>
      );
  };
  return <>{renderDashboard()}</>;
}
