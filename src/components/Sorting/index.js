import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { setSortingId } from '../../actions/cartActions'
import { SORTING_LIST } from "../../constants";

const SortingContainer = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 6px 24px rgba(93, 62, 188, 0.04);
    border-radius: 2px;
    padding: 24px;
`;

const Heading = styled.div`
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    display: flex;
    align-items: center;
    color: #697488;
    margin-bottom: 12px;
`;

const ListItem = styled.div`
    font-size: 14px;
    line-height: 18px;
    display: flex;
    align-items: center;
    letter-spacing: 0.16px;
    color: #525252;
    margin-bottom: 20px;
    position: relative;

    label {
        display: block;
        position: relative;
        padding-left: 35px;
        cursor: pointer;
        font-size: 14px;
        user-select: none;
        line-height: 26px;
    }

    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: #fff;
        border-radius: 50%;
        border: 2px solid #eee;
    }

    &:hover input ~ .checkmark {
        background-color: #ccc;
    }

    input:checked ~ .checkmark {
        background-color: #fff;
        border-radius: 50%;
        color: #2196F3;
        border: 2px solid #2196F3;
    }

    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
      }
    
      input:checked ~ .checkmark:after {
        display: block;
      }

      .checkmark:after {
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid #2196F3;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
`;

const Sorting = (props) => {
    return (
        <div>
            <Heading>Sorting</Heading>
            <SortingContainer>
                {
                    SORTING_LIST.map((item, i) => {
                        return (
                            <ListItem key={i}>
                                <label className="container">
                                    {item.label}
                                    <input
                                    type="checkbox"
                                    checked={props.sortingId === i ? "checked" : false}
                                    onChange={(e) => {
                                        props.setSortingId(i);
                                    }}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                            </ListItem>
                        );
                    })
                }
            </SortingContainer>
        </div>
    );
}

const mapStateToProps = (state)=>{
    return {
        sortingId: state.sortingId
    }
}

const mapDispatchToProps= (dispatch)=>{
    return{
        setSortingId: (id) => { dispatch(setSortingId(id)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
