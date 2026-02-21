
// client/src/components/chart/Chart.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import "./chart.scss";

const Chart = ({ title, type = "line" }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState("month");
  const [chartType, setChartType] = useState(type);
  const [total, setTotal] = useState(0);

  const COLORS = ['#667eea', '#764ba2', '#48bb78', '#f56565', '#ed8936', '#9f7aea'];

  useEffect(() => {
    fetchChartData();
  }, [timeRange]);

  const fetchChartData = async () => {
    try {
      setLoading(true);
      
      // تحديد نطاق التاريخ
      const endDate = new Date();
      const startDate = new Date();
      
      switch (timeRange) {
        case "week":
          startDate.setDate(startDate.getDate() - 7);
          break;
        case "month":
          startDate.setMonth(startDate.getMonth() - 1);
          break;
        case "year":
          startDate.setFullYear(startDate.getFullYear() - 1);
          break;
        default:
          startDate.setMonth(startDate.getMonth() - 1);
      }

      // جلب البيانات من API
      const response = await axios.get("http://localhost:8800/api/sales/chart", {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          range: timeRange
        }
      });

      const chartData = response.data;
      setData(chartData.data || []);
      
      // حساب الإجمالي
      const totalSum = chartData.data?.reduce((acc, item) => acc + (item.value || 0), 0) || 0;
      setTotal(totalSum);
      
      setError(null);
    } catch (err) {
      console.error("Error fetching chart data:", err);
      setError("فشل في جلب البيانات");
      
      // بيانات افتراضية للعرض
      generateMockData();
    } finally {
      setLoading(false);
    }
  };

  const generateMockData = () => {
    const mockData = [];
    const days = timeRange === "week" ? 7 : timeRange === "month" ? 30 : 12;
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      if (timeRange === "week") {
        date.setDate(date.getDate() - (days - i - 1));
        mockData.push({
          name: date.toLocaleDateString('ar-SA', { weekday: 'short' }),
          value: Math.floor(Math.random() * 5000) + 1000,
          fullDate: date.toLocaleDateString('ar-SA')
        });
      } else if (timeRange === "month") {
        date.setDate(date.getDate() - (days - i - 1));
        mockData.push({
          name: `${date.getDate()}/${date.getMonth() + 1}`,
          value: Math.floor(Math.random() * 8000) + 2000,
          fullDate: date.toLocaleDateString('ar-SA')
        });
      } else {
        mockData.push({
          name: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 
                 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'][i],
          value: Math.floor(Math.random() * 15000) + 5000
        });
      }
    }
    
    setData(mockData);
    setTotal(mockData.reduce((acc, item) => acc + item.value, 0));
  };

  const formatYAxis = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{label}</p>
          <p className="value">
            القيمة: ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (chartType) {
      case "area":
        return (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#667eea" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#667eea" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#718096', fontSize: 12 }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis 
              tickFormatter={formatYAxis}
              tick={{ fill: '#718096', fontSize: 12 }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#667eea" 
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
          </AreaChart>
        );

      case "bar":
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#718096', fontSize: 12 }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis 
              tickFormatter={formatYAxis}
              tick={{ fill: '#718096', fontSize: 12 }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" fill="#667eea" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        );

      case "pie":
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        );

      default:
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#718096', fontSize: 12 }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis 
              tickFormatter={formatYAxis}
              tick={{ fill: '#718096', fontSize: 12 }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#667eea" 
              strokeWidth={2}
              dot={{ fill: '#667eea', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        );
    }
  };

  return (
    <div className="chart">
      <div className="chart-header">
        <div className="chart-title-section">
          <h3 className="chart-title">{title || "تحليل المبيعات"}</h3>
          <span className="chart-total">الإجمالي: ${total.toLocaleString()}</span>
        </div>
        
        <div className="chart-controls">
          <select 
            className="chart-type-select"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option value="line">خطي</option>
            <option value="area">مساحي</option>
            <option value="bar">أعمدة</option>
            <option value="pie">دائري</option>
          </select>
          
          <div className="time-range-buttons">
            <button 
              className={`time-btn ${timeRange === 'week' ? 'active' : ''}`}
              onClick={() => setTimeRange('week')}
            >
              أسبوع
            </button>
            <button 
              className={`time-btn ${timeRange === 'month' ? 'active' : ''}`}
              onClick={() => setTimeRange('month')}
            >
              شهر
            </button>
            <button 
              className={`time-btn ${timeRange === 'year' ? 'active' : ''}`}
              onClick={() => setTimeRange('year')}
            >
              سنة
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="chart-loading">
          <div className="spinner"></div>
          <p>جاري تحميل البيانات...</p>
        </div>
      ) : error ? (
        <div className="chart-error">
          <p>{error}</p>
          <button onClick={fetchChartData}>إعادة المحاولة</button>
        </div>
      ) : (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Chart;
