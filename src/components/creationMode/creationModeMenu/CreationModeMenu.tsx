import React from 'react'
import AddingModeEnum from "../../../utils/addingModeEnum";
import classes from "../manualResponse/switch.module.css"
import ButtonsMenu from './buttonsMenu/ButtonsMenu';
import SidebarHeader from '../../sidebarHeader/SidebarHeader';
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

  return (
    <>
      <SidebarHeader name="Gondola" />
      <div className={classes.switchAIContainer}>
        <span className={`${classes.trueTitle} ${classes.itemMenu}`}>Manual</span>
      </div>
      <ButtonsMenu progress={progress} setProgress={setProgress} setAddingMode={setAddingMode}/>
    </>
  )
}
