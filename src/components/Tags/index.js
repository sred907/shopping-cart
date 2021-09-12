import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { addItems } from '../../actions/cartActions';

const TagsContainer = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 6px 24px rgba(93, 62, 188, 0.04);
    border-radius: 2px;
    padding: 24px;

    .searchBox {
        height: 48px;
        border: 2px solid #E0E0E0;
        box-sizing: border-box;
        border-radius: 2px;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: 0.15px;
        color: #A8A8A8;
        width: 100%;
        padding: 12px;
        margin-bottom: 20px;
    }
`;

const Heading = styled.div`
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    display: flex;
    align-items: center;
    color: #697488;
    margin-bottom: 12px;
    margin-top: 24px;
`;

const ListContainer = styled.div`
    max-height: 140px;
    overflow-y: scroll;
    padding: 5px 0 0 5px;

    /* width */
    ::-webkit-scrollbar {
        width: 4px;
        border-radius: 4px;
        height: 78px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #fff; 
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #E0E0E0; 
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #E0E0E0; 
    }
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
        line-height: 22px;
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
        width: 22px;
        height: 22px;
        background: #FFFFFF;
        box-shadow: 0px 1px 7px rgba(93, 56, 192, 0.4);
        border-radius: 2px;
    }

    &:hover input ~ .checkmark {
        background-color: #ccc;
    }

    input:checked ~ .checkmark {
        background-color: #2196F3;
        color: #fff;
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
        left: 7px;
        top: 3px;
        width: 5px;
        height: 10px;
        border: solid #fff;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
`;

class Tags extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            checkedStateTags: []
        }
    }

    componentDidMount() {
        this.getOptions();
    }

    getOptions = async () => {
        const res = await fetch("/items",{
            headers:{
                "accepts":"application/json"
            }
        });
        let data = await res.json();
        this.props.addItems(data);
        data = this.filterTags(data);
        this.setState({
            tags: [
                "All",
                ...data
            ],
            checkedStateTags: new Array(data.length).fill(false)
        });
    }

    filterTags = (data) => {
        let items = data.flatMap((el) => el.tags);
        return [...new Set(items)].sort();
    }

    handleTagChange = (position) => {
        const { tags, checkedStateTags } = this.state;
        if (position === 0) {
            this.setState({checkedStateTags: new Array(tags.length).fill(true)});
        } else {
            const updatedCheckedStateTags = checkedStateTags.map((item, index) =>
                index === position ? !item : item
            );

            this.setState({checkedStateTags: updatedCheckedStateTags});
        }
    }

    render() {
        const { tags, checkedStateTags } = this.state;
        return (
            <div>
                <Heading>Tags</Heading>
                <TagsContainer>
                    <input
                        placeholder="Search Tag"
                        className="searchBox"
                    />
                    <ListContainer>
                        {
                            tags.map((tag, i) => {
                                return (
                                    <ListItem key={i}>
                                        <label htmlFor={`custom-checkbox-${i}`}>
                                            {tag}
                                            <input
                                            type="checkbox"
                                            id={`custom-checkbox-${i}`}
                                            onChange={(e) => {
                                                this.handleTagChange(i);
                                            }}
                                            checked={checkedStateTags[i]}
                                            name={tag}
                                            value={tag}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </ListItem>
                                );
                            })
                        }
                    </ListContainer>
                </TagsContainer>
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        items: state.items
    }
}

const mapDispatchToProps= (dispatch)=>{
    return{
        addItems: (data)=>{dispatch(addItems(data))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tags);