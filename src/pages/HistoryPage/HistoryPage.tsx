import React, { useEffect, useState } from 'react';
import classes from './historyPage.module.css';
import ReturnHome from '../../components/returnHome/ReturnHome';
import Logo from '../../components/logo/Logo';
import arrowUp from "../../assets/icons/eye&arrow/arrow-up-svgrepo-com.svg"
import arrowDown from "../../assets/icons/eye&arrow/arrow-down-svgrepo-com.svg"
import { useNavigate } from 'react-router-dom';
import showIcon from '../../assets/icons/eye&arrow/eye-svgrepo-com.svg'
import { alertAndExecute, alertFailedRequest, alertPermission, toastAlert } from '../../utils/alerts/alerts';
import { FieldSchema, FullPath } from '../../gondola_types/reqResRoutes';
import { Network } from '../../network/network';
import { setResponse } from '../../store/slices/responseSlice';
import { useDispatch } from 'react-redux';
import Loading from '../../components/loading/Loading';

export type progressType = { iterationCount: number, percentage: number } | null

type History = FullPath | any

function HistoryPage() {
    const [progress, setProgress] = useState<progressType>(null)
    const [missions, setMissions] = useState<History[]>();
    const [showMissions, setShowMissions] = useState<History[]>();
    const [searchInput, setSearchInput] = useState('');
    const [showNumbers, setShowNumbers] = useState(20);
    const [filter, setFilter] = useState('name')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const getAllHistory = async () => {
        try {
            await toastAlert("Fetching history", "top", 1000)
            setProgress({ iterationCount: 1, percentage: 0 });
            const response = await Network.mongoQueries.retrieveRecentHistory(100)
            setMissions(response)
            setShowMissions(response?.slice(0, 20))
            setProgress(null);
            toastAlert("Success", "top", 1000, "success")
        }
        catch (error) {
            setProgress(null);
            console.error(error)
            alertFailedRequest("Failed Request", String(error))
        }
    }

    useEffect(() => {
        getAllHistory()
    }, [])


    const handleHistoryRes = async (name: String) => {
        try {
            setProgress({ iterationCount: 1, percentage: 0 });
            toastAlert("Fetching data", "top", 1000)
            const response = await Network.mongoQueries.retrieveQuery(name)
            const parsed = FieldSchema.safeParse(response)
            if (parsed.success) {
                toastAlert("Success", "top", 1000)
                dispatch(setResponse(parsed.data))
                navigate(`/response`)
            } else {
                setProgress(null);
                console.error(parsed.error);
                alertAndExecute(() => alertPermission("Invalid Request1", `${parsed.error}`), () => navigate("/history"))
            }
        } catch (error) {
            setProgress(null);
            console.error(error)
            alertAndExecute(() => alertPermission("Invalid Request2", "System doesn't support history at the curren moment"), () => navigate('/history'))
        }
    }

    function formatDate(dateString: Date) {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('he-IL', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).format(date)
    }

    return (
        <>
            {(progress !== null) &&
                < div style={{ position: "absolute", top: 0, left: 0, height: "100vh", width: "100%" }}>
                    <Loading />
                </div >
            }
            <div className={classes.containerHistoryPage}>
                <div className={classes.mainHeader}>
                    <Logo className={classes.logoDept} />
                    <header className={classes.header}>History</header>
                </div>

                <div className={classes.containerFilter}>
                    <input type='text' placeholder='Search a mission...' className={classes.searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                    <select className={classes.filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="name">Name</option>
                        <option value="timestamp">date</option>
                        <option value="source">source</option>
                    </select>
                    <p className={classes.numbersFilter}>{showNumbers - 20} - {showNumbers} / {missions?.length}</p>
                    <img className={classes.moveIcons} src={arrowDown} alt="back" loading='lazy' onClick={() => {
                        setShowNumbers(prev => Math.max(prev - 20, 20))
                        if (missions?.length) setShowMissions(missions.slice(showNumbers - 20, showNumbers))
                    }} />
                    <img className={classes.moveIcons} src={arrowUp} alt="next" loading='lazy' onClick={() => {
                        if (missions?.length) {
                            setShowNumbers(prev => Math.min(prev + 20, missions.length));
                            setShowMissions(missions.slice(showNumbers - 20, showNumbers))
                        }
                    }} />
                </div>

                <div className={classes.tableHeader}>
                    <span>Name</span>
                    <span>Date</span>
                    <span>Source</span>
                </div>
                <hr className={classes.row} />
                <div className={classes.tableContent}>
                    {showMissions ? showMissions.filter((item) => {
                        return searchInput.toLowerCase() === '' ? item : filter === "date" ? formatDate(item[filter]).toLowerCase().includes(searchInput) : item[filter].toLowerCase().includes(searchInput)
                    }).map((item, index) => (
                        (<React.Fragment key={index}>
                            <span className={classes.itemName} title='itemName'>{item.name}</span>
                            <span className={classes.itemName} title='itemName'>{formatDate(item.timestamp)}</span>
                            <span className={classes.itemName} title='itemSource' >{(item.source)}</span>
                            <div className={classes.icon} title={`show-button:${item.name}`} onClick={() => handleHistoryRes(item.name)}>
                                <img src={showIcon} alt="show" loading='lazy' />
                            </div>
                        </React.Fragment>)))
                        :
                        <span>NO DATA</span>
                    }
                    {showMissions?.filter(item => filter === "date" ? formatDate(item[filter]).toLowerCase().includes(searchInput) : item[filter].toLowerCase().includes(searchInput)).length === 0 && <span>NO RESULTS</span>}
                </div>

                <footer className={classes.homeButton}>
                    <ReturnHome clearData={false} />
                </footer>
            </div>
        </>
    );
};

export default HistoryPage;
