import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { appSelector } from "../../../redux/app/selectors";
import reactCSS from 'reactcss';
import { ChromePicker } from 'react-color'
import {
  setShowColorPicker,
  setTelestratorColor,
} from "../../../redux/app/slice";


const ColorPicker = ({innerRef}) => {
  const dispatch = useDispatch();
  const app = useSelector(appSelector);
  
  const handleClose = useCallback(() => {
    dispatch(setShowColorPicker(false));
  }, [dispatch]);
  
  const handleClick = useCallback(() => {
    dispatch(setShowColorPicker(!app.showColorPicker));
  }, [dispatch, app.showColorPicker]);
  
  const handleChange = useCallback((color) => {
    dispatch(setTelestratorColor(color.hex));
  }, [dispatch]);
  
  const styles = reactCSS({
      'default': {
        color: {
          width: '24px',
          height: '24px',
          borderRadius: '2px',
          background: `${app.telestratorColor}`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          top: '-210px',
          left: '-5px',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
  });
    
  return (
      <div style={{position: 'relative'}}>
        <div style={ styles.swatch } onClick={ handleClick }>
          <div className={'colorPickerColor'} style={ styles.color } />
        </div>
        { app.showColorPicker ? <div className={'colorPickerPop'} style={ styles.popover }>
          <div style={ styles.cover } onClick={ handleClose }/>
          <ChromePicker color={ app.telestratorColor } onChange={ handleChange } disableAlpha={true} />
        </div> : null }
      </div>
  )
};

export default ColorPicker;