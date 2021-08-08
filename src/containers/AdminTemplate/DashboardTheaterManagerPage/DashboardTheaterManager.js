import React, { useEffect, useState } from "react";
import { actFetchListUser } from "redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import { TablePaginationActions } from "../../../component/AdminTemplate/TablePagination";
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
import Moment from "react-moment";
import { actFetchTheater } from "redux/actions/theaterManagerAction";
import CreateScheduleComponent from "component/AdminTemplate/CreateScheduleComponent";

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
  logo: {
    width: "30px",
    height: "30px",
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
export default function DashboardTheaterManager() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.theaterReducer.loading);
  const schedule = useSelector((state) => state.theaterReducer.data);

  const [keyWord, setKeyWord] = useState("");
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

  console.log({ isLoading, schedule });
  useEffect(() => {
    dispatch(actFetchTheater());
  }, []);

  const renderDashboard = () => {
    if (isLoading || schedule === [])
      return <CircularProgress className={classes.loading} />;

    let data = schedule.filter((item) => {
      const { diaChi, giaVe, tenCumRap, tenHeThongRap, tenPhim, tenRap } = item;

      return (
        diaChi.toLowerCase().indexOf(keyWord.toLowerCase().trim()) !== -1 ||
        String(giaVe).toLowerCase().indexOf(keyWord.toLowerCase().trim()) !==
          -1 ||
        tenCumRap.toLowerCase().indexOf(keyWord.toLowerCase().trim()) !== -1 ||
        tenHeThongRap.toLowerCase().indexOf(keyWord.toLowerCase().trim()) !==
          -1 ||
        tenPhim.toLowerCase().indexOf(keyWord.toLowerCase().trim()) !== -1 ||
        tenRap.toLowerCase().indexOf(keyWord.toLowerCase().trim()) !== -1
      );
    });
    console.log({ data });
    if (data && data.length >= 0)
      return (
        <div>
          <div>
            <CreateScheduleComponent />
            <div className={classes.container}>
              <TextField
                style={{ marginLeft: "10px", width: "50%" }}
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
          </div>
          <TableContainer
            component={Paper}
            aria-label="custom pagination table"
          >
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
              height={10}
              gridStyle={{
                direction: "inherit",
              }}
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Hệ Thống Rạp</StyledTableCell>
                  <StyledTableCell align="center">Tên Cụm Rạp</StyledTableCell>
                  <StyledTableCell align="center">Địa Chỉ</StyledTableCell>
                  <StyledTableCell align="center">Tên Rạp</StyledTableCell>
                  <StyledTableCell align="center">Tên Phim</StyledTableCell>
                  <StyledTableCell align="center">
                    Ngày Giờ Chiếu
                  </StyledTableCell>
                  <StyledTableCell align="center">Giá Ve</StyledTableCell>
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
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img src={row.logo} className={classes.logo} />
                        <span style={{ fontSize: "12px", paddingLeft: "10px" }}>
                          {row.tenHeThongRap}
                        </span>
                      </div>
                    </StyledTableCellBody>
                    <StyledTableCellBody align="right">
                      {row.tenCumRap}
                    </StyledTableCellBody>
                    <StyledTableCellBody align="right">
                      {row.diaChi}
                    </StyledTableCellBody>
                    <StyledTableCellBody align="right">
                      {row.tenRap}
                    </StyledTableCellBody>
                    <StyledTableCellBody align="right">
                      {row.tenPhim}
                    </StyledTableCellBody>
                    <StyledTableCellBody align="right">
                      <Moment
                        date={row.ngayChieuGioChieu}
                        format="hh:mm:ss YYYY/MM/DD"
                        style={{ fontSize: "12px" }}
                      />
                    </StyledTableCellBody>
                    <StyledTableCellBody align="right">
                      {row.giaVe}vnd
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
                    count={schedule.length}
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
