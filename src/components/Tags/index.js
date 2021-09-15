import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Freeze from "../Freeze";

import { setTags } from '../../actions/cartActions';
import {FiltersContainer, FilterHeading, FilterListContainer, FilterListItem} from "../../commonStyles";

class Tags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            loading: false
        }
    }

    componentDidMount() {
        this.setState({
            loading: true
        })
        this.getOptions();
    }

    getOptions = async () => {
        const res = await fetch("https://shopping-cart-database.herokuapp.com/tags",{
            headers:{
                "accepts":"application/json"
            }
        });
        let data = await res.json();
        this.options = [
            "All",
            ...data
        ];
        this.setState({
            options: [...this.options],
            loading: false
        });
    }

    updateChecks = (index, tag) => {
        const { options } = this.state;
        const { tags } = this.props;
        let arr = [...tags];
        if (tag === "All") {
            arr = tags[0] === "All" ? [] : ["All"];
        } else {
            if(arr.indexOf("All") > -1) arr.splice(arr.indexOf("All"), 1);
            if (arr.indexOf(options[index]) > -1) {
                arr.splice(arr.indexOf(options[index]), 1);
            } else {
                arr.push(options[index]);
            }
        }
        this.props.setTags(arr);
    }

    updateResult = (event) => {
        let { value } = event.target;
        let arr = [];
        arr = this.options.filter((option) => {
            return (option.toLowerCase()).indexOf(value.toLowerCase()) > -1
        });
        this.setState({
            options: arr.length ? [...arr] : []
        })
    }

    getStatus = (tag) => {
        const { tags } = this.props;
        if (tags.indexOf(tag) > -1) {
            return "checked";
        } else {
            return "";
        }
    }

    render() {
        const { options, loading } = this.state;
        return (
            <div>
                <FilterHeading>Tags</FilterHeading>
                <FiltersContainer>
                    <input
                        placeholder="Search Tag"
                        className="searchBox"
                        onChange={(e) => this.updateResult(e)}
                        type="search"
                    />
                    {
                        options.length ?
                        <FilterListContainer>
                            {
                                options.map((tag, i) => {
                                    return (
                                        <FilterListItem key={i}>
                                            <label>
                                                {tag}
                                                <input
                                                type="checkbox"
                                                onChange={(e) => {
                                                    this.updateChecks(i, tag);
                                                }}
                                                checked={this.getStatus(tag)}
                                                name={tag}
                                                value={tag}
                                                />
                                                <span className="checkmark"></span>
                                            </label>
                                        </FilterListItem>
                                    );
                                })
                            }
                        </FilterListContainer>
                        :
                        loading ? <Freeze customClass={"padding40"}/> : "No Tags found"
                    }
                </FiltersContainer>
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        tags: state.tags
    }
}

const mapDispatchToProps= (dispatch)=>{
    return{
        setTags: (tags)=>{dispatch(setTags(tags))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
