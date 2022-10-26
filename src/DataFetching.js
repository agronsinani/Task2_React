import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LoadingSpinner from "./LoadingSpinner";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

export default function DataFetching() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortedState, setSortedState] = useState("ASC");

  const getData = () => {
    setIsLoading(true);
    axios
      .get("https://www.anapioficeandfire.com/api/books?pageSize=30")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  
  const handleOnchange = (event) => {
    setSortedState(event.target.value);
  };
  

  useEffect(() => {
    if (sortedState === "ASC") {
      const sorted = [...data].sort((a, b) => {
        return new Date(a.released) - new Date(b.released);
      });
      setData(sorted);
    } else if (sortedState === "DESC") {
      const sorted = [...data].sort((a, b) => {
        return new Date(b.released) - new Date(a.released);
      });
      setData(sorted);
    }
  }, [sortedState]);

  return (
    <div className="App">
      <div className="buttons">
        {data.length > 0 && (
          <FormControl style={{ width: "200px" }}>
            <InputLabel style={{ marginLeft: "75px", fontSize: "14px" }}>
              Sort
            </InputLabel>
            <Select
              value={sortedState}
              onChange={handleOnchange}
              label="Sort"
              style={{ height: "30px" }}
            >
              <MenuItem value={"ASC"}>ASC</MenuItem>
              <MenuItem value={"DESC"}>DESC</MenuItem>
            </Select>
          </FormControl>
        )}
        <button id="button" onClick={() => getData()}>
          Fetch Data
        </button>
      </div>
      {isLoading && <LoadingSpinner />}
      <div className="flex-container">
        {data.map((item, key) => {
          return (
            <div className="card" key={item.name}>
              <h1>{item.name}</h1>
              <ul>
                <p>Book {key + 1}</p>
                <li>
                  <AccountCircleOutlinedIcon /> 
                  <div>{item.authors.join(', ')}</div>
                </li>
                <li>
                  <MenuBookOutlinedIcon />
                 <div>{item.numberOfPages} pages</div> 
                </li>
                <li>
                  <LanguageOutlinedIcon />
                  <div>{item.country}</div>
                </li>
                <li>
                  <CalendarMonthOutlinedIcon />
                  <div>{moment(item.released).format("ddd MMMM DD YYYY")}</div>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
