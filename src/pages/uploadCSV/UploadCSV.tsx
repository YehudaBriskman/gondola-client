import { useRef, useState } from 'react'
import { useNavigate, } from 'react-router-dom'
import Logo from '../../components/logo/Logo'
import classes from "./uploadCSV.module.css"
import Button from '../../components/button/Button'
import { useDispatch } from 'react-redux'
import { setTargets } from '../../store/slices/targetsSlice'
import { parseCSV, validateData } from '../../utils/csv/handleCSVTargets'
import { alertFailedRequest, toastAlert } from '../../utils/alerts/alerts'

const FILE_TYPE = "text/csv";

export default function UploadCSV() {
  const [file, setFile] = useState<File | null>();
  const [data, setData] = useState<any[]>([]);
  const [dragging, setDragging] = useState<"invalid" | "valid">();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string
      toastAlert("CSV proccessed", "top", 700)
      const parsedData = parseCSV(text);
      const validatedData = validateData(parsedData)
      if (validatedData.success) {
        setData(validatedData.data)
        dispatch(setTargets(validatedData.data))
        toastAlert("Success", "top", 700)
        navigate("/create-mode")
      } else {
        console.error("Validation Errors:", validatedData.errors)
        alertFailedRequest("Error", "File data not supported")
      }
    }
    reader.readAsText(file)
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0].type === FILE_TYPE) {
      const file = e.target.files[0]
      setFile(file)
      readFile(file)
    } else {
      fileInputRef.current?.form?.reset()
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    console.log("handleDragOver");

    e.preventDefault();
    if (e.dataTransfer.items.length !== 1 || e.dataTransfer.items[0].type !== FILE_TYPE) {
      setDragging("invalid");
      return;
    }
    setDragging("valid")
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    console.log("handleDrop");

    e.preventDefault();
    if (dragging === "valid") {
      setFile(e.dataTransfer.items[0].getAsFile())
      if (fileInputRef.current) {
        fileInputRef.current.files = e.dataTransfer.files
      }
    }
    setDragging(undefined);
  }

  const handleReset = () => {
    setData([])
    navigate(-1)
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
    }} className={classes.uploadCSV}>
      <Logo className={classes.logo} />
      <span className={classes.header}>Upload CSV</span>
      <div
        onDragExit={() => setDragging(undefined)}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${classes[dragging || ""]} ${classes.input}`}
      >
        <label htmlFor="fileInput">
          <span className={classes.drop}>Drop file Here</span>
          <span className={classes.browse}>Browse files</span>
          {file && <>
            <span>{file.name}</span>
            {data.length > 0 &&
              <pre>{JSON.stringify(data, null, 2)}</pre>
            }
          </>}
          <span className={classes.info}>supported file types: csv</span>
        </label>
        <input required ref={fileInputRef} onChange={handleUpload} id='fileInput' type="file" accept='.csv' />
      </div>
      <span className={classes.buttonsWrapper}>
        <Button variant='standard' className={classes.btn} type='submit'>Send</Button>
        <Button variant='standard' type='reset' onClick={handleReset} className={classes.btn}>Cancel</Button>
      </span>
    </form>
  )
}
