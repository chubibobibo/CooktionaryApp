//MUI imports
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

//theme
import { createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";

import { useContext } from "react";
import { IngredientContext } from "../pages/SingleRecipe.jsx";

const themeTop = createTheme({
  palette: {
    primary: {
      main: green[400],
    },
    secondary: {
      main: "#f44336",
    },
  },
});

//STYLES
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: themeTop.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function IngredientTable() {
  //obtaining data from context
  const context = useContext(IngredientContext);
  const recipeData = context;
  console.log(recipeData);
  return (
    <TableContainer component={Paper} elevation={10}>
      <Table sx={{ maxWidth: 800 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Ingredients</StyledTableCell>
            <StyledTableCell align='right'>Quantity</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* mapp the recipeIngredients array */}
          {recipeData.data.singleRecipe.recipeIngredients.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component='th' scope='row'>
                {row.ingredientName}
              </StyledTableCell>
              <StyledTableCell align='right'>
                {row.ingredientQty}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default IngredientTable;
