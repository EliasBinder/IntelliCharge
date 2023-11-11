import {InstructionsContainer} from '../fragments/Containers';
import warning from '../images/warning.svg'

function WarningPage() {
function descText() {
    return (
            <p className="instructionText">
                <span className="text-wrapper">Please </span>
                <span className="span">Remove<br/></span>
                <span className="text-wrapper">Your Car.</span>
            </p>
        )
    }
  const objInfo = {img: warning, imgAlt: 'warning', desc: descText}
  return (
    <div>
        <InstructionsContainer {...objInfo}/>
    </div>
  );
}

export default WarningPage;
