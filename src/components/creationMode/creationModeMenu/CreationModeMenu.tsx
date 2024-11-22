import React from 'react'
import AddingModeEnum from "../../../utils/addingModeEnum";
import Switch from '../manualResponse/switch';
import classes from "../manualResponse/switch.module.css"
import ButtonsMenu from './buttonsMenu/ButtonsMenu';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import SidebarHeader from '../../sidebarHeader/SidebarHeader';
import { switchToUpSideDown } from '../../../store/slices/switchSlice';
import { SetProgressType, progressType } from '../../../pages/creationMode/CreationMode';


type CreationModeMenuProps = {
  setAddingMode: React.Dispatch<React.SetStateAction<AddingModeEnum>>;
  addingMode: AddingModeEnum;
  setProgress: SetProgressType
  progress: progressType
}

export default function CreationModeMenu({
  setAddingMode,
  setProgress,
  progress
}: CreationModeMenuProps,) {
  const switchState = useSelector((root: RootState) => root.switch.switchHolder);

  const dispatch = useDispatch();

  const toggleSwitch = () => {
    dispatch(switchToUpSideDown())
  }

  return (
    <>
      <SidebarHeader name="Gondola" />
      <div className={classes.switchAIContainer}>
        <span className={`${classes.defaultTitle} ${classes.itemMenu}`}>AI</span>
        <Switch typeMission={switchState} toggleSwitch={toggleSwitch} />
        <span className={`${classes.trueTitle} ${classes.itemMenu}`}>Manual</span>
      </div>
      <ButtonsMenu progress={progress} setProgress={setProgress} setAddingMode={setAddingMode} typeMission={switchState} />
    </>
  )
}
