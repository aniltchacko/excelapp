import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [editable, setEditable] = useState(false);
  useEffect(() => {
    fetch("http://localhost:3001/posts")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((Error) => console.log(Error));
  }, []);

  let valueFirst = 0;
  for (const value in data) {
    if (data.hasOwnProperty(value)) {
      valueFirst = valueFirst + parseFloat(data[value].value1 || 0);
    }
  }
  let valueSec = 0;
  for (const value in data) {
    if (data.hasOwnProperty(value)) {
      valueSec = valueSec + parseFloat(data[value].value2 || 0);
    }
  }
  let valueThird = 0;
  for (const value in data) {
    if (data.hasOwnProperty(value)) {
      valueThird = valueThird + parseFloat(data[value].value3 || 0);
    }
  }
  const handleChangeEvent = (value, cell, name) => {
    let newState = { ...data };
    // console.log(newState);

    const dataArr = newState[cell];

    dataArr[name] = value;
    // console.log(dataArr);
    data[cell] = dataArr;
    setData(data);
    // console.log(data);
    setEditable(false);
  };

  const onCellClick = () => {
    setEditable(true);
  };
  return (
    <div style={{ margin: "10%", marginTop: "5%" }}>
      <table>
        <thead>
          <tr>
            <th>Value 1</th>
            <th>Value 2</th>
            <th>Value 3</th>
            <th>Sum</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((data, i) => (
              <tr key={i}>
                <td>
                  {editable ? (
                    <input
                      type="number"
                      defaultValue={data.value1}
                      name="value1"
                      onChange={(e) => {
                        handleChangeEvent(e.target.value, i, e.target.name);
                      }}
                    />
                  ) : (
                    <div onClick={onCellClick(i)}>{data.value1}</div>
                  )}
                </td>
                <td>
                  {editable ? (
                    <input
                      type="number"
                      defaultValue={data.value2}
                      name="value2"
                      onChange={(e) => {
                        handleChangeEvent(e.target.value, i, e.target.name);
                      }}
                    />
                  ) : (
                    <div onClick={onCellClick(i)}>{data.value2}</div>
                  )}
                </td>
                <td>
                  {editable ? (
                    <input
                      type="number"
                      defaultValue={data.value3}
                      name="value3"
                      onChange={(e) => {
                        handleChangeEvent(e.target.value, i, e.target.name);
                      }}
                    />
                  ) : (
                    <div onClick={onCellClick(i)}>{data.value3}</div>
                  )}
                </td>
                <td>
                  {(
                    parseFloat(data.value1 || 0) +
                    parseFloat(data.value2 || 0) +
                    parseFloat(data.value3 || 0)
                  ).toFixed(0)}
                </td>
              </tr>
            ))}
          <tr>
            <td>
              <h4> Total: {valueFirst.toFixed(0)}</h4>
            </td>
            <td>
              <h4> Total: {valueSec.toFixed(0)} </h4>
            </td>

            <td>
              <h4> Total: {valueThird.toFixed(0)}</h4>
            </td>
            <td>
              <h4>{valueFirst + valueSec + valueThird}</h4>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default App;
