import { ReactSketchCanvas } from 'react-sketch-canvas';
import { useSelector } from "react-redux";
import { appSelector } from "../../../redux/app/selectors";

const Telestrator = ({innerRef}) => {
  const app = useSelector(appSelector);

  const styles = {
    //border: '0.0625rem solid #9c9c9c',
    zIndex: '999',
    position: 'absolute',
    left: '7.5%',
    top: '0px',
    display: app.showTelestrator ? 'block' : 'none'
  };
    
  return (
    <ReactSketchCanvas
      class={'telestratorCanvas'}
      style={styles}
      width="92.5%"
      height="99vh"
      strokeWidth={app.telestratorStroke}
      strokeColor={app.telestratorColor}
      canvasColor="transparent"
      ref={innerRef}
    />
  );
};

export default Telestrator;