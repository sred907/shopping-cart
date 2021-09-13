import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { setBrands } from "../../actions/cartActions";

const BrandsContainer = styled.div`
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

    input[type="checkbox"]:checked {
        background: red;
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

class Brands extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            options: []
        }
    }

    componentDidMount() {
        this.getOptions();
    }

    getOptions = async () => {
        const res = await fetch("/companies",{
            headers:{
                "accepts":"application/json"
            }
        });
        const data = await res.json();
        this.options = [
            {
                "slug": "All",
                "name": "All",
            },
            ...data
        ];
        this.setState({
            options: [...this.options]
        });

    }

    updateChecks = (index) => {
        const { options } = this.state;
        const { brands } = this.props;
        let arr = [...brands];
        if (index === 0) {
            arr = brands[0] === "All" ? [] : ["All"]
        } else {
            if(arr.indexOf("All") > -1) arr.splice(arr.indexOf("All"), 1);
            if (arr.indexOf(options[index].slug) > -1) {
                arr.splice(arr.indexOf(options[index].slug), 1);
            } else {
                arr.push(options[index].slug);
            }
        }
        this.props.setBrands(arr);
    }

    updateResult = (event) => {
        let { value } = event.target;
        let arr = [];
        arr = this.options.filter((option) => {
            return (option.name.toLowerCase()).indexOf(value.toLowerCase()) > -1
        });
        this.setState({
            options: arr.length ? [...arr] : [...this.options]
        })
    }

    getStatus = (option) => {
        const { brands } = this.props;
        if (brands.indexOf(option.slug) > -1) {
            return "checked";
        } else {
            return "";
        }
    }

    render() {
        const { options } = this.state;
        return (
            <div>
                <Heading>Brands</Heading>
                <BrandsContainer>
                    <input
                        placeholder="Search Brand"
                        className="searchBox"
                        onChange={(e) => this.updateResult(e)}
                    />
                    <ListContainer>
                        {
                            options.map((option, i) => {
                                return (
                                    <ListItem key={i}>
                                        <label>
                                            {option.name}
                                            <input
                                                type="checkbox"
                                                onChange={(e) => {
                                                    this.updateChecks(i);
                                                }}
                                                checked={this.getStatus(option)}
                                                name={option.name}
                                                value={option.slug}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </ListItem>
                                );
                            })
                        }
                    </ListContainer>
                </BrandsContainer>
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        brands: state.brands
    }
}

const mapDispatchToProps= (dispatch)=>{
    return{
        setBrands: (brands)=>{dispatch(setBrands(brands))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Brands);