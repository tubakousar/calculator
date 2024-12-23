// local storage  Using string
import React, { useEffect, useState } from "react";
import "./Calculator.css";
// import { VscCircleFilled } from "react-icons/vsc";
import { RxCross2 } from "react-icons/rx";
import { FaHistory } from "react-icons/fa";
import { Drawer } from "antd";

function UserCalculator() {
  const [input, setInput] = useState("");
  const [draweropen, setDraweropen] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedata = localStorage.getItem("value");
    const storehistory = JSON.parse(localStorage.getItem("history")) || [];
    if (storedata) {
      setInput(storedata);
    }
    if (storehistory.length > 0) {
      setHistory(storehistory);
    }
  }, []);

  const clickhandle = (valueinput) => {
    setInput((previousinput) => {
      const newvalue = previousinput + valueinput;
      console.log(typeof newvalue, newvalue);
      localStorage.setItem("value", newvalue);
      return newvalue;
    });
  };
  const handleEvaluate = () => {
    try {
      const result = eval(input).toString(); // handle click sy data "string" ki form men ja rha but evaluate ho ki bydefauly "number" ki form men mil rha hy  islye hm .toString likhen gy taki evaluate ho ki string ki form men mily
      setInput(result);
      localStorage.setItem("value", result);
      console.log(typeof result, result);

      const newhistory = [...history, `${input} = ${result}`];
      setHistory(newhistory);
      localStorage.setItem("history", JSON.stringify(newhistory));
    } catch (error) {
      setInput("error");
      localStorage.setItem("value", "error");
    }
  };

  const handleclear = () => {
    setInput("");
    localStorage.setItem("value", "");
  };
  const handlesingledigitclear =()=>{
    setInput((previousinput) => {
        const updatevalue = previousinput.slice(0 ,-1);
        // console.log(typeof newvalue, newvalue);
        localStorage.setItem("value", updatevalue);
        return updatevalue;
      });


  }

  const handlehistory = () => {
    setDraweropen(false);
    setHistory([]);
    localStorage.removeItem("history" ,"");
    setInput("");
    localStorage.setItem("value", "");
  };

  return (
    <div>
      <h1 className="text-center">Welcome to my calculator</h1>

      <nav>
        <div className="container mx-auto m-w-20">
          <span className=" num one">1</span>
          <span className=" num two">2</span>
          <span className=" num three">3</span>
          <div className="nav-child">
            <span className=" left-logo">
              <FaHistory onClick={() => setDraweropen(true)} />{" "}
            </span>
            <Drawer
              className="open"
              open={draweropen}
              closable={false}
              // onClose={()=>{setDraweropen(false)}}
              placement="left"
            >
              <h2>History</h2>
              <div>
                {history.map((item) => (
                  <div key={item.id}>{item}</div>
                ))}
              </div>
              <button onClick={() => handlehistory()} className="clear-history">
                clear history
              </button>
            </Drawer>
            {/* <span className=" right-text">THEME </span> */}
            <div className="round-rectangle">
                <button onClick={() => handleclear()} className="reset">
                RESET
              </button>
              <button className="clear-text" onClick={() => handlesingledigitclear()}>
                <RxCross2 />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* <!-- ###############3 text-show-section --> */}
      <div className="text-show-section">
        <div className="container">
          <input
            className="input"
            type="text"
            value={
              input
              // .join("")
            }
            onChange={(e) =>
              setInput(
                e.target.value
                // .split("")
              )
            }
            placeholder="0"
          />
          {/* </Form.Item> */}

          {/* </Form> */}
        </div>
      </div>
      {/* <!-- ################ text-button-section--> */}
      <div className="text-button-section">
        <div className="container">
          <div className="show-round-buttons">
            <div className="row row1 button">
              <button onClick={() => clickhandle("7")}>7</button>
              <button onClick={() => clickhandle("8")}>8</button>
              <button onClick={() => clickhandle("9")}>9</button>
              {/* <button onClick={() => handleclear()} className="del">
                DEL
              </button> */}
              <button onClick={() => clickhandle("+")}>+</button>
            </div>

            <div className="row row2 button">
              <button onClick={() => clickhandle("4")}>4</button>
              <button onClick={() => clickhandle("5")}>5</button>
              <button onClick={() => clickhandle("6")}>6</button>
              <button onClick={() => clickhandle("-")}>-</button>
              {/* <button onClick={() => clickhandle("+")}>+</button> */}
            </div>

            <div className="row row3 button">
              <button onClick={() => clickhandle("1")}>1</button>
              <button onClick={() => clickhandle("2")}>2</button>
              <button onClick={() => clickhandle("3")}>3</button>
              <button onClick={() => clickhandle("/")}>/</button>
              {/* <button onClick={() => clickhandle("-")}>-</button> */}
            </div>

            <div className="row row3 button">
              <button onClick={() => clickhandle("0")}>0</button>
              <button onClick={() => clickhandle(".")}>.</button>
              <button onClick={() => handleEvaluate()}>=</button>

              {/* <button onClick={() => clickhandle("/")}>/</button> */}
              <button onClick={() => clickhandle("*")}>*</button>
            </div>

            <div className="row row4 button">
              {/* <button onClick={() => handleclear()} className="reset">
                RESET
              </button> */}
              {/* <button onClick={() => handleEvaluate()} className="equal">
                =
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCalculator;
