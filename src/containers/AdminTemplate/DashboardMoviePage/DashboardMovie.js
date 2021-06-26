import React, { useEffect, useState } from "react";
import { actFetchListMovie } from "redux/actions/movieActions";
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
    display: "table-cell",
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
  img: {
    display: "block",
    width: "3rem",
    height: "3rem",
  },
  trailer: {
    maxWidth: "4rem",
    fontSize: "0.75rem",
    overflowWrap: "break-word",
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
export default function DashboardMovie() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.movieReducer.loading);
  const listMovie = useSelector((state) => state.movieReducer.listMovie);
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

  console.log({ isLoading, listMovie });
  useEffect(() => {
    dispatch(actFetchListMovie());
  }, []);
  const handleDeleteUser = (user) => {
    actDeleteUser(user)
      .then((result) => {
        Swal.fire("Xoá tài khoản thành công!", "Nhấn OK để thoát!", "success");
        dispatch(actFetchListMovie());
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
    if (listMovie === null) return "";
    let data = listMovie.filter((movie) => {
      const { biDanh, danhGia, maPhim, ngayKhoiChieu, tenPhim, trailer, moTa } =
        movie;
      if (
        !biDanh ||
        !danhGia ||
        !maPhim ||
        !ngayKhoiChieu ||
        !tenPhim ||
        !trailer ||
        !moTa
      )
        return;
      return (
        biDanh.toLowerCase().indexOf(keyWord.toLowerCase().trim()) !== -1 ||
        danhGia.toLowerCase().indexOf(keyWord.toLowerCase().trim()) !== -1 ||
        maPhim.toLowerCase().indexOf(keyWord.toLowerCase().trim()) !== -1 ||
        moTa.toLowerCase().indexOf(keyWord.toLowerCase().trim()) !== -1 ||
        ngayKhoiChieu.toLowerCase().indexOf(keyWord.toLowerCase().trim()) !==
          -1 ||
        tenPhim.toLowerCase().indexOf(keyWord.toLowerCase().trim()) !== -1 ||
        trailer.toLowerCase().indexOf(keyWord.toLowerCase().trim()) !== -1
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
                  <StyledTableCell align="center">Bí danh</StyledTableCell>
                  <StyledTableCell align="center">Đánh giá</StyledTableCell>
                  <StyledTableCell align="center">Hình ảnh</StyledTableCell>

                  <StyledTableCell align="center">Mã Phim</StyledTableCell>
                  <StyledTableCell align="center">Mô tả</StyledTableCell>
                  <StyledTableCell align="center">
                    Ngày khởi chiếu
                  </StyledTableCell>
                  <StyledTableCell align="center">Tên phim</StyledTableCell>
                  <StyledTableCell align="center">Trailer</StyledTableCell>
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
                      {row.biDanh}
                    </StyledTableCellBody>
                    <StyledTableCellBody align="right">
                      {row.danhGia}
                    </StyledTableCellBody>
                    <StyledTableCellBody align="right">
                      <img
                        className={classes.img}
                        src={row.hinhAnh}
                        alt={row.maPhim}
                      />
                    </StyledTableCellBody>

                    <StyledTableCellBody align="right">
                      {row.maPhim}
                    </StyledTableCellBody>
                    <StyledTableCellBody align="right">
                      {row.moTa}
                    </StyledTableCellBody>
                    <StyledTableCellBody align="right">
                      {row.ngayKhoiChieu}
                    </StyledTableCellBody>
                    <StyledTableCellBody align="right">
                      {row.tenPhim}
                    </StyledTableCellBody>
                    <StyledTableCellBody align="right">
                      <p className={classes.trailer}>{row.trailer}</p>
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
                    count={listMovie.length}
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
