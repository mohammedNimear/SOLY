// client/src/components/update/Update.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./table.scss";

const Update = ({ inputs, title }) => {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [focusedFields, setFocusedFields] = useState({});
  
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  
  // استخراج المسار الحالي (مثلاً /suppliers/update/123 -> suppliers)
  const path = location.pathname.split("/")[1];
  
  // جلب البيانات الحالية عند تحميل المكون
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:8800/api/${path}/find/${id}`);
        setInfo(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("فشل في جلب البيانات");
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchData();
    }
  }, [id, path]);

  // معالجة تغيير الحقول
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo(prev => ({ ...prev, [name]: value }));
    
    // التحقق من صحة الإدخال
    validateField(name, value);
  };

  // التحقق من صحة الحقل
  const validateField = (name, value) => {
    const input = inputs.find(i => i.name === name);
    if (input?.required && !value) {
      return false;
    }
    return true;
  };

  // معالجة التركيز على الحقل
  const handleFocus = (fieldName) => {
    setFocusedFields(prev => ({ ...prev, [fieldName]: true }));
  };

  // معالجة فقدان التركيز
  const handleBlur = (fieldName) => {
    setFocusedFields(prev => ({ ...prev, [fieldName]: false }));
  };

  // معالجة تقديم النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // إرسال البيانات المحدثة
      await axios.put(`http://localhost:8800/api/${path}/${id}`, info);
      setSuccess(true);
      
      // إخفاء رسالة النجاح بعد 2 ثانية والتوجيه
      setTimeout(() => {
        setSuccess(false);
        navigate(`/${path}/${id}`);
      }, 2000);
      
    } catch (err) {
      console.error("Error updating:", err);
      setError(err.response?.data?.message || "فشل في تحديث البيانات");
    } finally {
      setLoading(false);
    }
  };

  // عرض شاشة التحميل
  if (loading && !info._id) {
    return (
      <div className="update">
        <div className="update-container">
          <div className="update-header">
            <h1 className="update-title">جاري التحميل...</h1>
          </div>
          <div className="update-content">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="loading-skeleton" style={{ marginBottom: '20px' }}></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="update" dir="rtl">
      {/* رسالة النجاح */}
      {success && (
        <div className="success-toast">
          ✅ تم التحديث بنجاح! جاري التحويل...
        </div>
      )}
      
      <div className="update-container">
        <div className="update-header">
          <h1 className="update-title">{title || `تحديث ${path}`}</h1>
          <button className="close-btn" onClick={() => navigate(-1)}>✕</button>
        </div>
        
        <div className="update-content">
          {/* رسالة الخطأ */}
          {error && <div className="update-error">{error}</div>}
          
          <form onSubmit={handleSubmit} className="update-form">
            {inputs.map((input, index) => (
              <div 
              className={`form-group ${focusedFields[input.name] ? 'focused' : ''} ${
                input.fullWidth ? 'full-width' : ''
                } ${input.halfWidth ? 'half-width' : ''}`}
                key={input.id || index}
              >
                <label htmlFor={input.id || input.name}>
                  {input.label}
                  {input.required && <span className="required-star">*</span>}
                </label>
                
                <input
                  type={input.type || "text"}
                  id={input.id || input.name}
                  name={input.name}
                  value={info[input.name] || ""}
                  onChange={handleChange}
                  onFocus={() => handleFocus(input.name)}
                  onBlur={() => handleBlur(input.name)}
                  placeholder={input.placeholder || `أدخل ${input.label}`}
                  required={input.required}
                  disabled={input.readonly}
                  min={input.min}
                  max={input.max}
                  step={input.step}
                />
                
                {input.helperText && <small className="helper-text">{input.helperText}</small>}
              </div>
            ))}
            
            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={() => navigate(-1)}
                disabled={loading}
              >
                إلغاء
              </button>
              
              <button 
                type="submit" 
                className="save-btn" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-small"></span>
                    جاري الحفظ...
                  </>
                ) : 'حفظ التغييرات'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
  );
};

export default Update;