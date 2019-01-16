import React from "react";


class ShowLoader  extends React.Component {
    render() {
        const { isLoading, component } = this.props
        console.log('isLoading', isLoading)
        if( isLoading ) {
            return <div>Loading***</div>
        }else{
            return component
        }
    }
}

export default ShowLoader