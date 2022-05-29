import React from 'react';

const FaceDataContext = React.createContext({
    data: [],
    hasError: null,
    loading: null,
    currentUserName: '',
    addItems: (item) => { },
    getItems: (item) => { },
    getName: (item) => { },
})

export default FaceDataContext;