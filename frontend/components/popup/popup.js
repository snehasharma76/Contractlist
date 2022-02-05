import { useEffect, useState, useRef } from "react";
import classes from "./popup.module.css";

const Popup = ({ visible, setVisible, data }) => {
  const [activeTab, setActiveTab] = useState();
  const [isMobile, setIsMobile] = useState(true);
  const [checked, setChecked] = useState();
  const popupRef = useRef();

  useEffect(() => {
    if (window?.innerWidth > 800) setIsMobile(false);
    if (visible) setActiveTab(data?.chains?.[0]);
  }, [visible]);

  const handleClick = (e) => {
    return;
    const popup = document?.getElementById("popup");
    if (e.target !== popup) {
      setVisible(false);
    }
  };

  const copyAddressToClipboard = (address) => {
    setChecked(address);
    navigator.clipboard.writeText(address);
    setTimeout(() => {
      setChecked(undefined);
    }, 3000);
  };

  if (!visible) return null;

  return (
    <div className={classes.popup__container} onClick={handleClick}>
      <div className={classes.popup} id="popup">
        <div className={classes.popup__closebtn}>
          <div onClick={() => setVisible(false)}>&times;</div>
        </div>
        <a
          href={data.infoURL}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.popup__title}
        >
          <img src={data.icon} alt={data.name} />
          {data.name}
        </a>
        <div className={classes.chainList}>
          {data?.chains?.map((chain, i) => (
            <span
              className={`${classes.popup__chain} ${
                activeTab === chain ? classes.tab__active : ""
              }`}
              onClick={() => setActiveTab(chain)}
            >
              {chain}
            </span>
          ))}
        </div>
        <table className={classes.popup__table}>
          <div className={classes.popup__table_head}>
            <span>Contracts</span>
            <span>Address</span>
          </div>
          {data?.contracts?.[activeTab ?? data?.chains[0]]?.map((d, i) => (
            <div key={i} className={classes.popup__tablerow}>
              <a href={d?.github} target="_blank" rel="noopener noreferrer">
                {isMobile ? `${d?.name.slice(0, 12)}...` : d?.name}
              </a>
              <span className={classes.address}>
                {isMobile
                  ? `${d?.address?.slice(0, 6)}...${d?.address?.slice(-6)}`
                  : d?.address}
                {checked === d?.address ? (
                  <p
                    style={{ color: "greenyellow", margin: 0, fontWeight: 900 }}
                  >
                    &#10004;
                  </p>
                ) : (
                  <img
                    src="https://img.icons8.com/material-rounded/50/000000/copy.png"
                    alt="Copy to Clipboard"
                    className={classes.copy}
                    onClick={() => copyAddressToClipboard(d?.address)}
                  />
                )}
              </span>
            </div>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Popup;
