import { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import FaceDataContext from './face-data-context';


const initialState = {
    faceData: [],
    isLoading: false,
    error: null,
    userName: ''
};

const faceDataInfoReducer = (state, action) => {

    if (action.type === 'DATA_CHANGE') {
        return {
            faceData: action.faces,
            isLoading: state.isLoading,
            error: state.error,
            userName: state.userName
        }
    }

    if (action.type === 'LOADING_STATE_CHANGE') {
        return {
            faceData: state.faceData,
            isLoading: action.bool,
            error: state.error,
            userName: state.userName
        }
    }

    if (action.type === 'SET_ERROR') {
        return {
            faceData: state.faceData,
            isLoading: state.isLoading,
            error: action.err,
            userName: state.userName
        }
    }

    if (action.type === 'SET_NAME') {
        return {
            faceData: state.faceData,
            isLoading: state.isLoading,
            error: state.error,
            userName: action.uName
        }
    }

    return initialState;
};


const FaceDataProvider = (props) => {

    const [currentValue, dispatchValue] = useReducer(faceDataInfoReducer, initialState);



    async function setItems(userData) {
        dispatchValue({ type: 'LOADING_STATE_CHANGE', bool: true });
        dispatchValue({ type: 'SET_ERROR', err: null });

        try {
            const response = await fetch('https://face-detection-ddb26-default-rtdb.firebaseio.com/facedetection.json', {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        } catch (error) {
            dispatchValue({ type: 'SET_ERROR', err: error.message });
        }

        dispatchValue({ type: 'LOADING_STATE_CHANGE', bool: false });
    }



    async function fetchItems() {
        dispatchValue({ type: 'LOADING_STATE_CHANGE', bool: true });
        dispatchValue({ type: 'SET_ERROR', err: null });

        try {
            const response = await fetch('https://face-detection-ddb26-default-rtdb.firebaseio.com/facedetection.json');

            const data = await response.json();
            const loadData = [];

            for (const key in data) {
                loadData.push({
                    id: key,
                    userName: data[key].userName,
                    userImage: data[key].userImage
                });
            };

            dispatchValue({ type: 'DATA_CHANGE', faces: loadData });

        } catch (error) {
            dispatchValue({ type: 'SET_ERROR', err: error.message });
        }

        dispatchValue({ type: 'LOADING_STATE_CHANGE', bool: false });
    }



    const setName = (name) => {
        dispatchValue({ type: 'SET_NAME', uName: name });
    }




    const navigate = useNavigate();
    useEffect(() => {
        if (currentValue.error !== null) {
            navigate('/error');
        }
    }, [currentValue.error]);


    



    const faceDatarmation = {
        data: currentValue.faceData,
        hasError: currentValue.error,
        loading: currentValue.isLoading,
        currentUserName: currentValue.userName,
        addItems: setItems,
        getItems: fetchItems,
        getName: setName
    }



    return <FaceDataContext.Provider value={faceDatarmation}>
        {props.children}
    </FaceDataContext.Provider>;
}

export default FaceDataProvider;
