import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem ,CardImgOverlay, Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentFormComponent';
import { Loading } from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

    function RenderComments({comments}){
         
        if(comments !== null){

            return(
                <div >
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                            <Stagger in>
                                {comments.map((comment) => {
                                    return (
                                        <Fade in>
                                        <li key={comment.id}>
                                        <p>{comment.comment}</p>
                                        <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                        </li>
                                        </Fade>
                                    );
                                })}
                            </Stagger>  
                    </ul>  
                </div>  
            )
        }
        else{
            return(
                <div>
                    <h4>Comments</h4>
                    <p> there is no comments</p>
                </div>
            )
        }
        

    }

    function RenderDish({dish, favorite, postFavorite}) {
        return(
            <div className="col-12 col-md-5 m-1">
                <FadeTransform in 
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <Card>
                        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <Button outline color="primary" onClick={() => favorite ? console.log('Already favorite') : postFavorite(dish._id)}>
                                {favorite ?
                                    <span className="fa fa-heart"></span>
                                    : 
                                    <span className="fa fa-heart-o"></span>
                                }
                            </Button>
                        </CardImgOverlay>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            </div>
        );
    }

    const DishDetail = (props) => {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null){
            return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} favorite={props.favorite} postFavorite={props.postFavorite} />
                    <div className="col-12 col-md-5 m-1">
                        
                        <RenderComments comments={props.comments} />
                        <CommentForm dishId={props.dish.id} postComment={props.postComment} />
                    </div>
                    
                </div>
                </div>
            ); 
        }
        else{
            return(<div>null</div>);
        }
    }

export default DishDetail;