import { useEffect, useState, useRef } from "react";
import classes from "./popup.module.css";

const Popup = ({ visible, setVisible, data }) => {
  const [isMobile, setIsMobile] = useState(true);
  const popupRef = useRef();

  useEffect(() => {
    if (window?.innerWidth > 800) setIsMobile(false);
  }, []);

  const handleClick = (e) => {
    if (e.target !== popupRef.current) {
      setVisible(false);
    }
  };

  if (!visible) return null;

  return (
    <div className={classes.popup__container} onClick={handleClick}>
      <div className={classes.popup} ref={popupRef}>
        <div className={classes.popup__closebtn}>
          <div onClick={() => setVisible(false)}>&times;</div>
        </div>
        <table className={classes.popup__table}>
          <div className={classes.popup__table_head}>
            <span>Contracts</span>
            <span>Address</span>
          </div>
          {data?.map((d, i) => (
            <div key={i}>
              <a href={d?.github} target="_blank" rel="noopener noreferrer">
                {d?.contract}
              </a>
              <span>
                {isMobile
                  ? `${d?.address?.slice(0, 6)}...${d?.address?.slice(-6)}`
                  : d?.address}
              </span>
            </div>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Popup;
