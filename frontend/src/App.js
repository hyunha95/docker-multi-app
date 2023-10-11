import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
  // DB에 저장된 값을 가져와서 화면에 보여주기 전에 이 lists State에 넣어준다.
  const [lists, setLists] = useState([]);

  // Input 박스에 입력한 값이 이 value State에 들어간다.
  const [value, setValue] = useState("");

  useEffect(() => {
    // 여기서 데이터베이스에 있는 값을 가져옵니다.
    axios.get("/api/values")
        .then(response => {
          console.log("response", response);
          setLists(response.data);
        })
  }, [])

  const changeHandler = (event) => {
    setValue(event.currentTarget.value);
  }

  const submitHandler = (event) => {
    event.preventDefault();

    axios.post("/api/value", { value: value })
        .then(response => {
            if (response.data.success) {
              console.log("response", response);
              setLists([...lists, response.data]);
              setValue("");
            } else {
                alert("값을 DB에 넣는데 실패했습니다.");
            }
        })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          {lists && lists.map((list, index) => (
              <li key={index}>{list.value}</li>
          ))}
          <br/>
           안녕하세요.
          <form className="example" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="입력해주세요..."
              onChange={changeHandler}
              value={value}
            />
            <button type="submit">확인.</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
