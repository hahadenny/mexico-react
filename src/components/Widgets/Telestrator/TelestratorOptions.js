import { useCallback } from "react";
import { Box, NumberInput } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { appSelector } from "../../../redux/app/selectors";
import {
  setTelestratorStroke
} from "../../../redux/app/slice";
import ClearIcon from "@mui/icons-material/Clear";
import ColorPicker from "./ColorPicker";

const TelestratorOptions = ({canvasRef}) => {
  const dispatch = useDispatch();
  const app = useSelector(appSelector);
  
  const strokeChange = useCallback((val) => {
    if (!val)
      val = 0;
    dispatch(setTelestratorStroke(val));
  }, [dispatch]);
  
  const clearCanvas = useCallback(() => {
    canvasRef.current.clearCanvas();
  }, [canvasRef]);
    
  return (
    <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', textAlign:'center', width:'100%', padding:'5px 0px 15px 0px'}}>
        <Box sx={{color:'#212529', marginRight:'5%', paddingTop:'2px', fontSize:'0.875rem'}}>
            <Box sx={{marginBottom:'4px', paddingTop:'5px'}}><span className={'menuLabel'} style={{fontWeight:'500'}}>Color</span></Box>
            <ColorPicker />
        </Box>
        <NumberInput
          label={'Stroke'}
          defaultValue={app.telestratorStroke}
          sx={{width:'30%'}}
          type={'number'}
          onChange={strokeChange}
        />
        <Box sx={{color:'#212529', marginLeft:'5%', paddingTop:'2px', fontSize:'0.875rem'}}>
            <Box><span className={'menuLabel'} style={{fontWeight:'500'}}>Clear</span></Box>
            <Box sx={{border:'solid 1px #888', color:'#666', borderRadius:'5px', marginTop:'3px', paddingTop:'4px', cursor:'pointer'}} onClick={clearCanvas}><ClearIcon /></Box>
        </Box>
    </Box>
  );
};

export default TelestratorOptions;