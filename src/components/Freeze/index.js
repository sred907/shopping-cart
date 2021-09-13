import React from "react";
import styled from 'styled-components';

const FreezeCont = styled.div`
    padding: 100px;
    margin: 0 auto;

    .loader {
        border: 8px solid #f3f3f3; /* Light grey */
        border-top: 8px solid #3498db; /* Blue */
        border-radius: 50%;
        width: 60px;
        height: 60px;
        animation: spin 2s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const Freeze = (props) => {
    return (
        <FreezeCont>
                <div className="loader"></div>
        </FreezeCont>
    );
}

export default Freeze;
