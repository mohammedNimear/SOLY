import "./new.scss";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const New = ({ inputs, title, apiEndpoint }) => {
  const [info, setInfo] = useState({});
  const [stores, setStores] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
  
  //make sure that the form has a store input
  const hasStoreField = inputs.some((input) => input.id === "store");
  
  useEffect(() => {
    const fetchStores = async () => {
      try {
        // Fetch the list of stores to populate the store selection input
        const res = await axios.get("/stores");
        setStores(res.data);
      } catch (err) {
        console.log("Bad Stores Fetch", err);
        
      }
      
      
    };
    if(hasStoreField) {
      fetchStores();
      console.log(hasStoreField)
      
    } 
    
  }, [hasStoreField]);
  
  const handleChange = (e) => {
    setInfo((prev) => ({
      ...prev, [e.target.id]: e.target.value 
    }));
    
  };
  const handleClick = async (e) => {
    e.preventDefault();
    setSuccessMsg("")
    setErrorMsg("")

    try {
      await axios.post(apiEndpoint, info)
         setSuccessMsg("تمت الاضافة بنجاح")
         setTimeout(()=> setSuccessMsg(""),3000)
      setInfo({})
    } catch (error) {
      setTimeout(()=> setErrorMsg(""),3000)
    }

  };
  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
             {/* success div */}
            {successMsg && <div className="success">{successMsg}</div>}
            {errorMsg && <div className="error">{errorMsg}</div>}
            
            
            <form>

              {Array.isArray(inputs) && inputs.map((input) => {
                if (input?.id === "store") {
                  
                  return (
                    <div className="formInput" key={input.id}>
                      <label>{input.label}</label>
                       {stores.length === 0 && <p>loading stores</p>}
                      <select
                        id="store"
                        onChange={handleChange}
                        value={info.store || ""}
                        required
                      >
                        <option value="">اختر المخزن</option>
                        {stores.map((store) => (
                          <option key={store._id} value={store._id}>
                            {store.name}
                          </option>
                        )
                        )}
                      </select>
                    </div>
                  )
                } else {
                  return (
                    <div className="formInput" key={input.id}>
                      <label>{input.label}</label>
                      <input
                        onChange={handleChange}
                        type={input.type || "text"}
                        placeholder={input.placeholder}
                        id={input.id}
                        value={info[input.id] || ""}
                      />
                    </div>
                  )
                }
              })}

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
