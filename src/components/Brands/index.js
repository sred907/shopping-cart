import React from 'react';
import { connect } from 'react-redux';

import Freeze from "../Freeze";

import { setBrands } from "../../actions/cartActions";
import {FiltersContainer, FilterHeading, FilterListContainer, FilterListItem} from "../../commonStyles";

class Brands extends React.Component {
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
        const res = await fetch("https://shopping-cart-database.herokuapp.com/companies",{
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
            options: [...this.options],
            loading: false
        });

    }

    updateChecks = (index, brandName) => {
        const { options } = this.state;
        const { brands } = this.props;
        let arr = [...brands];
        if (brandName === "All") {
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
            options: arr.length ? [...arr] : []
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
        const { options, loading } = this.state;
        return (
            <div>
                <FilterHeading>Brands</FilterHeading>
                <FiltersContainer>
                    <input
                        placeholder="Search Brand"
                        className="searchBox"
                        onChange={(e) => this.updateResult(e)}
                        type="search"
                    />
                    {
                        options.length ?
                        <FilterListContainer>
                            {
                                options.map((option, i) => {
                                    return (
                                        <FilterListItem key={i}>
                                            <label>
                                                {option.name}
                                                <input
                                                    type="checkbox"
                                                    onChange={(e) => {
                                                        this.updateChecks(i, option.name);
                                                    }}
                                                    checked={this.getStatus(option)}
                                                    name={option.name}
                                                    value={option.slug}
                                                />
                                                <span className="checkmark"></span>
                                            </label>
                                        </FilterListItem>
                                    );
                                })
                            }
                        </FilterListContainer>
                        :
                        loading ? <Freeze customClass={"padding40"}/> : "No Brands found!"
                    }
                </FiltersContainer>
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
