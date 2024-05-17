import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import '../App.css';


function createData(name, discount,trackingId, date, status) {
  return { name, discount, trackingId, date, status };
}

const rows = [
  createData("Half million Coffee","50% discount", 18908424, "16 March 2022 - 24 March 2024", "Available"),
  createData("Saudi Airlines","20% discount" , 18908424, "16 March 2022 - 24 March 2024","Expired"),
  createData("Kappa","60% discount" , 18908424, "16 March 2022 - 24 March 2024", "Available"),
  createData("Ikea","15% discount" , 18908421, "16 March 2022 - 24 March 2024", "Expired"),
];

const makeStyle=(status)=>{
    if(status === 'Available')
    {
        return {
            background: 'rgb(145 254 159 / 47%)',
            color: 'green',
        }
    }
    else if (status === 'Expired')
    {
        return{
            background: '#ffadad8f',
            color: 'red',
        }
    }
}


export default function BasicTable() {
  return (
      <div className="Table">
        <TableContainer
          component={Paper}
          style={{ boxShadow: "90px 90px 90px 90px #80808029" }}
        >
          <Table sx={{ minWidth: 1200, minHeight:500}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Company</TableCell>
                <TableCell>Discounts</TableCell>
                <TableCell align="left">Tracking ID</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "whit"}}>
              {rows.map((row) => (
                <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.name}
                    </TableCell>
                    <TableCell align="left">{row.discount}</TableCell>
                    <TableCell align="left">{row.trackingId}</TableCell>
                    <TableCell align="left">{row.date}</TableCell>
                    <TableCell align="left">
                      <span className="status" style={makeStyle(row.status)}>{row.status}</span>
                    </TableCell>
                    <TableCell align="left" className="Details">Details</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}