import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { CircularProgress } from "@mui/material";

const Featured = () => {
  return (
    <div className="featured">
      <div className="featuredHeader">
        <span className="featuredTitle">إجمالي المبيعات</span>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="featuredContent">
        <div className="featuredChart">
          <CircularProgress
            variant="determinate"  value={70} size={100} thickness={5}
            style={{ color: "#667eea" }}
          />
          <span className="percentage">70%</span>
        </div>
        <p className="featuredSubtitle">مقارنة بالشهر الماضي</p>
        <div className="featuredStats">
          <div className="featuredItem">
            <span className="featuredItemTitle">مستهدف</span>
            <span className="featuredItemValue">$15.4k</span>
          </div>
          <div className="featuredItem">
            <span className="featuredItemTitle">هذا الأسبوع</span>
            <span className="featuredItemValue">$12.4k</span>
          </div>
          <div className="featuredItem">
            <span className="featuredItemTitle">هذا الشهر</span>
            <span className="featuredItemValue">$12.4k</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
