
import React from 'react';
 import Backdrop from '../../component/Backdrop/Backdrop';
import Aux from '../Auxility/Auxility';
//import useHttpErrorHandler from '../../http-error-handler';

const withErrorHandler = (WrappedComponent , axios)=>{
    //const [error, clearError]=useHttpErrorHandler(axios);
    //const [error, clearError]=useState();
    return props => {
        return(
            <Aux > 
            <Backdrop show ={false} >
                <p>Something didn't work! </p>
                {/* {error ? error.message: null} */}
            </Backdrop>
            <WrappedComponent {...props} />
        </Aux>
        )
    }

    // return(
    //             <Aux > 
    //         <Backdrop show={true} > 
    //         </Backdrop>  
    //         </Aux>
    //         )
};
export default withErrorHandler;