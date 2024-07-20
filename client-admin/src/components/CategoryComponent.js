import axios from 'axios';
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuid
import '../assets/SCSS//CategoryComponent.scss'; // Import SCSS for Category
import MyContext from '../contexts/MyContext';
import CategoryDetail from './CategoryDetailComponent';
// import FooterComponent from './FooterComponent'; // Ensure correct import

class Category extends Component {
    static contextType = MyContext; // using this.context to access global state
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            itemSelected: null,
            isOpenModal: false, // State to control modal visibility
        };
    }
    //my shit
    render() {
        const cates = this.state.categories.map((item) => {
            return (
                <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                </tr>
            );
        });
        return (
            <div>
                <div className="float-left">
                    <h2 className="text-center">CATEGORY LIST</h2>
                    <table className="datatable" border="1">
                        <tbody>
                            <tr className="datatable">
                                <th>ID</th>
                                <th>Name</th>
                            </tr>
                            {cates}
                        </tbody>
                    </table>
                </div>
                <div className="inline" />
                <CategoryDetail item={this.state.itemSelected} updateCategories={this.updateCategories} />
                <div className="float-clear" />
            </div>
        );
        // render() {
        //     const { categories, itemSelected, isOpenModal } = this.state;

        //     const cates = categories.map(category => (
        //       <tr key={category._id} className="datatable" onClick={() => this.trItemClick(category)}>
        //         <td>{category._id}</td>
        //         <td>{category.name}</td>
        //       </tr>
        //     ));

        //     return (
        //       <div className="category-container">
        //         <div className="table-container">
        //           <Table className="table table-bordered">
        //             <thead className="thead-dark">
        //               <tr>
        //                 <th className="table-dark">ID</th>
        //                 <th className="table-dark">Name</th>
        //               </tr>
        //             </thead>
        //             <tbody>
        //               {cates}
        //             </tbody>
        //           </Table>

        //           <Modal isOpen={isOpenModal} toggle={this.toggleModal}>
        //             <ModalHeader toggle={this.toggleModal}>{itemSelected ? 'Edit Category' : 'Add New Category'}</ModalHeader>
        //             <ModalBody>
        //               <CategoryDetail item={itemSelected} updateCategories={this.updateCategories} />
        //             </ModalBody>
        //             <ModalFooter>
        //               <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
        //             </ModalFooter>
        //           </Modal>
        //         </div>
        //         <FooterComponent />
        //       </div>
        //     );
    }
    updateCategories = (categories) => { // arrow-function
        this.setState({ categories: categories });
    }
    componentDidMount() {
        this.apiGetCategories();
    }
    // event-handlers
    trItemClick(item) {
        this.setState({ itemSelected: item });
    }
    // apis
    apiGetCategories() {
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.get('/api/admin/categories', config).then((res) => {
            const result = res.data;
            this.setState({ categories: result });
        });
    }
    // Toggle modal visibility
    toggleModal = () => {
        this.setState(prevState => ({
            isOpenModal: !prevState.isOpenModal
        }));
    }
    // Handle click on Add new category button
    handleAddNewUser = () => {
        const { categories } = this.state;
        let newItemSelected;

        if (categories.length === 0) {
            // If categories array is empty, generate new UUID for ID
            const tempId = uuidv4();
            newItemSelected = { _id: tempId, name: '' };
        } else {
            // Use ID of the first item in the list
            const firstItem = categories[0];
            newItemSelected = { ...firstItem }; // Ensure _id is kept unchanged
        }

        this.setState({
            itemSelected: newItemSelected,
            isOpenModal: true,
        });
    }
    // Handle click on a row in the table
    trItemClick = (item) => {
        this.setState({ itemSelected: item, isOpenModal: true });
    }

    // Function to update categories state
    updateCategories = (updatedCategories) => {
        this.setState({ categories: updatedCategories });
    }
}
export default Category;