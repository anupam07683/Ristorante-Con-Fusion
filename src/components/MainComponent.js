import React,{Component} from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutUsComponent';
import Favorites from './FavoriteComponent';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, postFeedback, fetchDishes, fetchComments, fetchPromos, fetchLeaders, loginUser, logoutUser, fetchFavorites, postFavorite, deleteFavorite } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapDispatchToProps = dispatch => ({
  
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes())},
    resetFeedbackForm : () => { dispatch(actions.reset('feedback'))},
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    postFeedback: (firstname,lastname,telNum,email,agreed,contactType,message) => dispatch(postFeedback(firstname,lastname,telNum,email,agreed,contactType,message)),
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    fetchFavorites: () => dispatch(fetchFavorites()),
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
  });
  
const mapStateToProps = state => {
    return{
        dishes: state.dishes,
        leaders : state.leaders,
        promotions : state.promotions,
        comments : state.comments,
        favorites: state.favorites,
        auth: state.auth
    }
}

class Main extends Component {
  componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
        this.props.fetchFavorites();
      }
      
  render() {
    const HomePage = () => {
        return(
            <Home 
                dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMess={this.props.dishes.errMess}
                promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                promoLoading={this.props.promotions.isLoading}
                promoErrMess={this.props.promotions.errMess}
                leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                leaderLoading={this.props.leaders.isLoading}
                leaderErrMess={this.props.leaders.errMess}
            />
        );
      }
  
      const DishWithId = ({match}) => {
          console.log("isAuthenticated",this.props.auth.isAuthenticated);
          console.log(this.props.favorites.favorites.dishes,match.params.dishId);
        return(
            this.props.auth.isAuthenticated
            ?
            <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish._id === match.params.dishId)[0]}
              isLoading={this.props.dishes.isLoading}
              errMess={this.props.dishes.errMess}
              comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
              postComment={this.props.postComment}
              favorite={this.props.favorites.favorites.dishes.some((dish) => dish._id === match.params.dishId)}
              postFavorite={this.props.postFavorite}
            />
            :
            <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish._id === match.params.dishId)[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.dish === match.params.dishId)}
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}
            favorite={false}
            postFavorite={this.props.postFavorite}
            />
        );
      };
    
    const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        this.props.auth.isAuthenticated
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/home',
            state: { from: props.location }
            }} />
    )} />
    );

    return (
        <div>
            <Header auth={this.props.auth}
            loginUser={this.props.loginUser}
            logoutUser={this.props.logoutUser}
             />
            <TransitionGroup>
                <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                    <Switch>
                        <Route path="/home" component={ () => <HomePage />}/>
                        <Route exact path="/menu" component={( ) => <Menu dishes={this.props.dishes} />}/>
                        <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>} /> 
                        <PrivateRoute exact path="/favorites" component={() => <Favorites favorites={this.props.favorites} deleteFavorite={this.props.deleteFavorite} />} />
                        <Route exact path='/aboutus' component={( ) => <About leaders={this.props.leaders} />}/>
                        <Route path='/menu/:dishId' component={DishWithId} />
                        <Redirect to="/home"/>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
            <Footer/>
        </div>
        );
    }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
