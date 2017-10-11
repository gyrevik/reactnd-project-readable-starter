import React from 'react'

/**
* @description Contains the category list
* @param {object} cats - The array of categories to display
*/
class Categories extends React.Component {     
    render () {  
        const { cats } = this.props;
        
        return (                             
            <div>
                <ol>          
                {
                    cats && cats.length > 0 && (cats.map((cat) => (
                        <li>{cat.name} - {cat.path}</li>
                    )))
                }
                </ol>
            </div>
        )
    }
}

export default Categories