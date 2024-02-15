import React, { createContext, useState } from 'react';

const CameraContext = createContext();

export const CameraProvider = ({ children }) => {
    const [image, setImage] = useState(null);

    return (
        <CameraContext.Provider value={{ image, setImage }}>
            {children}
        </CameraContext.Provider>
    );
};

export default CameraContext;
