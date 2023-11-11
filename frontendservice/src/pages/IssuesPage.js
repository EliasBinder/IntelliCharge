import {InstructionsContainer} from '../fragments/Containers';
import telephone from '../images/telephone.svg'

function IssuesPage() {
    function descText() {
        return (
            <p className="instructionText" style={{top: '40%', fontSize: '60px'}}>
                <span style={{fontSize: '60px'}} className="text-wrapper">Need </span>
                <span style={{fontSize: '60px'}} className="span">Help</span>
                <span style={{fontSize: '60px'}} className="text-wrapper">
                ?<br />
                Click{" "}
                </span>
                <span style={{fontSize: '60px'}} className="span">here</span>
                <span  style={{fontSize: '60px'}} className="text-wrapper"> to call an assistant</span>
            </p>
        )
      }
  const objInfo = {img: telephone, imgAlt: 'telephone', desc: descText}
  return (
    <div>
        <InstructionsContainer {...objInfo}/>
    </div>
  );
}

export default IssuesPage;
