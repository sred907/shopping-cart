import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Row, Col, Modal, ModalBody, ModalFooter, Button } from '@bootstrap-styled/v4';

import Cart from '../Cart';

const StyledContainer = styled.div`
    background: #1EA4CE;
    height: 76px;
    display: block;
    z-index: 12;
    margin-bottom: 40px;
`;

const Total = styled.div`
    background: #147594;
    color: #fff;
    padding: 30px;
    min-width: 120px;
    width: auto;
    height: 76px;
    float: right;
    text-align: center;

    @media(max-width: 1199px) {
        padding: 30px 0;
    }
`;

const RowWithMargin = styled(Row)`
    margin: 0 120px !important;

    @media(max-width: 1199px) {
        margin: 0 !important;
    }
`;

const WebCol = styled(Col)`
    @media(max-width: 1199px) {
        display: none;
    }
`;

const MobileCol = styled(Col)`
    display: none;

    @media(max-width: 1199px) {
        display: block;
        padding: 0 !important;
    }
`;

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    handleClose = () => this.setState({ isOpen: !this.state.isOpen });

    render() {
        return (
            <StyledContainer>
                <RowWithMargin>
                    <WebCol md="3"></WebCol>
                    <WebCol md="5"></WebCol>
                    <WebCol md="4">
                        <Total>{this.props.total ? `₺ ${this.props.total}` : "₺ 0,00"}</Total>
                    </WebCol>
                    <MobileCol sm="12">
                        <Total onClick={() => this.handleClose()}>{this.props.total ? `₺ ${this.props.total}` : "₺ 0,00"}</Total>
                        <Modal isOpen={this.state.isOpen} toggle={() => this.handleClose()}>
                            <ModalBody>
                                <Cart />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="secondary" onClick={() => this.handleClose()}>Close</Button>
                            </ModalFooter>
                        </Modal>
                    </MobileCol>
                </RowWithMargin>
            </StyledContainer>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        total: state.total
    }
}
export default connect(mapStateToProps)(Navbar);
