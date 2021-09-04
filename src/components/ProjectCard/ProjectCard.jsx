
const ProjectCard = (props) => {
    return ( 
        <div className="card my-3">
        <div className="card-header bg-light" style={{border:'none'}}>
            <h3>{props.title}</h3>
        </div>
        <img src={props.srcImg} alt={props.title} style={{height: 150, objectFit:"cover"}} />
            <div className="card-body">
                <p className="p-0 m-0">{props.description}</p>
            </div>
            <div className="card-footer d-flex align-items-center justify-content-center">
            <p className="p-0 m-0 mx-3">Tecnologías usadas: </p>
                {props.stack1 === "" ? null : <img className="mx-2" src="https://cdn.freelogovectors.net/wp-content/uploads/2020/07/adobe-photoshop-logo-768x768.png" style={{height: 50}} alt="photoshop"/> }
                {props.stack2 === "" ? null : <img className="mx-2" src="https://seeklogo.com/images/R/rhinoceros-3d-logo-770376F408-seeklogo.com.png" style={{height: 50, borderRadius: 6, padding: 2}} alt="rhinoceros"/> }
                {props.stack3 === "" ? null : <img className="mx-2" src="https://seeklogo.com/images/1/3ds-max-logo-4C228D4A3D-seeklogo.com.png" style={{height: 50, borderRadius: 6, padding: 2}} alt="rhinoceros"/> }
                {props.stack4 === "" ? null : <img className="mx-2" src="https://ae01.alicdn.com/kf/U4a36eac3331946228aa2d93f1802eaaa5.jpg" style={{height: 50, borderRadius: 6, padding: 2}} alt="rhinoceros"/> }
                

            </div>
        </div>
     );
}
 
export default ProjectCard;
