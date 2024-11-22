
import classes from "./sidebarHeader.module.css";
import Logo from "../logo/Logo";
import { useCallback, useEffect, useState } from "react";
import { Network } from "../../network/network";

type SidebarHeaderProps = {
  name: string;
  id?: string
}

export default function SidebarHeader({ name, id }: SidebarHeaderProps) {

  const [statusMongo, setStatusMongo] = useState(1)
  const [statusAlgo, setStatusAlgo] = useState(1)
  const [statusColor, setStatusColor] = useState("#ff0000")
  const [isHover, setIsHover] = useState(false)

  const fetchMongo = useCallback(async () => {
    try {
      const mongo = await Network.mongoQueries.introspectionCheck()
      if (mongo) {
        setStatusMongo(1)
      }
      else setStatusMongo(0)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const fetchAlgo = useCallback(async () => {
    try {
      const server = await Network.algoQueries.introspectionCheck()
      if (server) {
        setStatusAlgo(1)
      }
      else setStatusAlgo(0)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const fetchColors = useCallback(async () => {
    await fetchAlgo()
    await fetchMongo()
    if (statusAlgo === 1 && statusMongo === 1)
      setStatusColor("#37ff37")
    else if (statusAlgo === 0 && statusMongo === 0)
      setStatusColor("#ff0000")
    else setStatusColor("#ff9900")
  }, [fetchAlgo, fetchMongo, statusAlgo, statusMongo])

  useEffect(() => {
    fetchColors()
    const interval = setInterval(() => {
      fetchColors()
    }, 300000)
    return () => clearInterval(interval)
  }, [fetchColors])

  return (
    <>

      <div className={classes.logoContainer}>
        <Logo className={classes.gondolaLogo} />
        <div className={classes.title}>
          <div className={classes.titleMenu}>
            <span>{name}</span>
          </div>
          <div />
          {id && <span className={classes.responseId}>name: <b>{id}</b></span>}
        </div>
        {name.toLowerCase() === 'gondola' &&
          <span
            onMouseEnter={() => setIsHover(true)}
            className={classes.status}
            style={{ background: statusColor, boxShadow: `0 0 2px 1px ${statusColor}` }}
          />
        }
        {isHover &&
          <div className={classes.tooltip}
            onMouseLeave={() => setIsHover(false)}>
            <div>
              <p>MongoDB:</p>
              <p style={{ color: `${statusMongo === 1 ? "#37cc37" : "#dd1111"}` }}>{statusMongo === 1 ? "Running" : "Dead"}</p>
            </div>
            <span />
            <div>
              <p>Algorithm:</p>
              <p style={{ color: `${statusAlgo === 1 ? "#37cc37" : "#dd1111"}` }}>{statusAlgo === 1 ? "Running" : "Dead"}</p>
            </div>
          </div>
        }
      </div>

    </>
  )
}
