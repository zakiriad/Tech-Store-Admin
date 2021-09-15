import React, {Component} from 'react';
import '../../css/page.css';
import { connect } from 'react-redux';
import { clearErrors } from '../../actions/errorActions';
import {Add} from "../../actions/productActions";
import PropTypes from "prop-types";
import {getListCategories} from "../../actions/categActions";




class AddProduct extends Component {
    
    
    state = {
        nom:"",
        description:"",
        prix:0,
        photoURI:"",
        Categorie:"",
        quantite:0,
        msg: null,
        disabled:{
            nom:false,
            description:false,
        },
        list_categories:[]
    }
    static propTypes = {
        error: PropTypes.object.isRequired,
        getListCategories: PropTypes.func.isRequired,
        Add:PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }
    componentDidMount(){
        this.props.getListCategories();
    }
    onChange = e =>{
        if(e.target.name == "description"){
            if(e.target.value.length > 500){
                //TODO: afficher un message d'erreur
                var disabled = {...this.state.disabled};
                disabled.description = true;
                this.setState({disabled});
            }
        }else{
            if(e.target.value.length > 100){
                //TODO: afficher un message d'erreur
                var disabled = {...this.state.disabled};

                disabled[e.target.name] = true;
                this.setState({disabled});
            }
        }
        this.setState({ [e.target.name]: e.target.value});
      }
      onSubmit = e =>{
        e.preventDefault();

        const {nom, description,prix, quantite,photoURI, Category} = this.state;
        this.props.Add({nom,  description, prix, quantite,photoURI, Category});
        window.location.reload(false);
        
        
      }
      
    render()
    {
       const options = this.props.categorie;

       const list_options = options.list_Categories.map(o =>{
           return <option value ={o}>{o}</option>
       });
       
        
        return(
          

        <form className="container">
                    
                    <div className="header">
                        <h1>Ajout De Produit</h1>
                    </div>


                    <div className="box">
                        <input type="text"  name="nom" value = {this.state.nom}  disabled={this.state.disabled.nom} onChange={this.onChange}/>
                        <label className={this.state.nom && 'filled'} htmlFor="text">nom</label>
                    </div>


                    <div className="box">
                        <input type="text"  name="description" value = {this.state.description}  disabled={this.state.disabled.description} onChange={this.onChange}/>
                        <label className={this.state.description && 'filled'} htmlFor="text">description</label>
                    </div>
                    <div className="box">
                        <input type="number"  name="quantite"   disabled={this.state.disabled.quantite} onChange={this.onChange}/>
                        <label className={this.state.quantite && 'filled'} htmlFor="number">quantite</label>
                    </div>
                    <div className="box">
                        <input type="number"  name="prix"   disabled={this.state.disabled.prix} onChange={this.onChange}/>
                        <label className={this.state.prix && 'filled'} htmlFor="text">prix</label>
                    </div>

                    <div className="box">
                        <label>Categorie</label>
                        <select name="Category" onChange={this.onChange}>
                            {list_options}
                        </select>
                    </div>
                    
                    
                    <div className="buttonproduit">
                        <button className="subbuttonproduit" onClick={this.onSubmit}>Ajouter</button>
                    </div>
        </form>
            
        


    )}
}

const mapStateToProps = state =>({
    error : state.error,
    categorie: state.categorie
  });
  
  
  export default connect(
    mapStateToProps,
    {Add, clearErrors,getListCategories}
  )(AddProduct);
  