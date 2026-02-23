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
    if (hasStoreField) {

  
    const fetchStores = async () => {
      try {
        setLoading(true);
        // Fetch the list of stores to populate the store selection input
        const baseURL = process.env.REACT_APP_API_URL || "";
        const res = await axios.get(baseURL + "/stores", {
          withCredentials: true,
        });
        if(Array.isArray(res.data)) {
          setStores(res.data);
        } else {
          console.error("Unexpected response format for stores:", res.data);
          setStores([]);
        }
      } catch (err) {
        console.error("Error fetching stores:", err);
        setStores([]);
      }finally {
        setLoading(false);
      }
    };
    fetchStores();
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

              { inputs.map((input) => {
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
                        {Array.isArray(stores) && stores.map((store) => (
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
