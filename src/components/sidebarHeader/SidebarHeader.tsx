import classes from "./sidebarHeader.module.css";
import Logo from "../logo/Logo";
import { useCallback, useEffect, useState } from "react";
import { Network } from "../../network/network";

type SidebarHeaderProps = {
  name: string;
  id?: string;
};

export default function SidebarHeader({ name, id }: SidebarHeaderProps) {
  const [status, setStatus] = useState({
    mongo: 0,
    algo: 0,
    color: "#ff0000",
  });
  const [isHover, setIsHover] = useState(false);

  const fetchStatuses = useCallback(async () => {
    try {
      const [mongo, algo] = await Promise.all([
        Network.mongoQueries.introspectionCheck(),
        Network.algoQueries.introspectionCheck(),
      ]);

      const mongoStatus = mongo ? 1 : 0;
      const algoStatus = algo ? 1 : 0;

      const newColor =
        mongoStatus === 1 && algoStatus === 1
          ? "#37ff37" 
          : mongoStatus === 0 && algoStatus === 0
          ? "#ff0000" 
          : "#ff9900"; 

      setStatus({
        mongo: mongoStatus,
        algo: algoStatus,
        color: newColor,
      });
    } catch (error) {
      console.error("Error fetching server statuses:", error);
    }
  }, []);

  useEffect(() => {
    fetchStatuses();
    const interval = setInterval(fetchStatuses, 60000);
    return () => clearInterval(interval);
  }, [fetchStatuses]);

  return (
    <div className={classes.logoContainer}>
      <Logo className={classes.gondolaLogo} />
      <div className={classes.title}>
        <div className={classes.titleMenu}>
          <span>{name}</span>
        </div>
        <div />
        {id && (
          <span className={classes.responseId}>
            name: <b>{id}</b>
          </span>
        )}
      </div>
      {name.toLowerCase() === "gondola" && (
        <span
          onMouseEnter={() => setIsHover(true)}
          className={classes.status}
          style={{
            background: status.color,
            boxShadow: `0 0 2px 1px ${status.color}`,
          }}
        />
      )}
      {isHover && (
        <div
          className={classes.tooltip}
          onMouseLeave={() => setIsHover(false)}
        >
          <div>
            <p>MongoDB:</p>
            <p
              style={{
                color: `${status.mongo === 1 ? "#37cc37" : "#dd1111"}`,
              }}
            >
              {status.mongo === 1 ? "Running" : "Dead"}
            </p>
          </div>
          <span />
          <div>
            <p>Algorithm:</p>
            <p
              style={{
                color: `${status.algo === 1 ? "#37cc37" : "#dd1111"}`,
              }}
            >
              {status.algo === 1 ? "Running" : "Dead"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
