import './toolbar.css';

function Toolbar({onDeleteUser}) {
    return (
        <div className='btn-group'>
            <button type="button" 
                className="btn btn-danger btn-lg">
                    Block
            </button>
            <button type="button" 
                className="btn btn-light btn-unlock btn-lg">
                <i className="fa-solid fa-unlock"></i>
            </button>
            <button type="button" 
                className="btn btn-light btn-trash btn-lg"
                onClick={onDeleteUser}>
                <i className="fas fa-trash"></i>
            </button>
        </div>
    );
}

export default Toolbar;