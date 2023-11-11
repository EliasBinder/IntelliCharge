import {InstructionsContainer} from '../fragments/Containers';
import plug from '../images/plug.svg'

function InsertPumpPage() {
  function descText() {
    return (
      <p className="instructionText">
        <span className="text-wrapper">
          Car detected, <br />
        </span>
        <span className="span">Plug In</span>
        <span className="text-wrapper"> the pump!</span>
      </p>
    )
  }
  const objInfo = {img: plug, imgAlt: 'plug', desc: descText}
  return (
    <div>
        <InstructionsContainer {...objInfo}/>
    </div>
  );
}

export default InsertPumpPage;
/*
*/