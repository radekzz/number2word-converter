import React, { Component } from 'react';
import './Suggestions.css';

class Suggestions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            suggestionsSlides: Math.ceil(this.props.suggestions.length / 3),
            slideDisplayed: 1,
        }

        this.handleClick = this.handleClick.bind(this)
        this.slideSuggestions = this.slideSuggestions.bind(this)
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState((prevState, props) => {
            return {
                suggestionsSlides: Math.ceil(props.suggestions.length / 3),
                slideDisplayed: 1
            }
        })
    }

    handleClick(e) {
        this.props.addWord(e.target.innerText)
    }

    slideSuggestions(event) {
        const target = event.target.name;
        if (target === 'previous') {
            this.state.slideDisplayed !== 1 &&
                this.setState(prevState => {
                    return {
                        slideDisplayed: prevState.slideDisplayed - 1
                    }
                })
        } else {
            this.state.slideDisplayed !== this.state.suggestionsSlides &&
                this.setState(prevState => {
                    return {
                        slideDisplayed: prevState.slideDisplayed + 1
                    }
                })
        }
    }

    render() {

        const hideListItem = (i) => {
            const startSlide = (this.state.slideDisplayed - 1) * 3;
            const endSlide = startSlide + 2;
            console.log(startSlide)
            if (this.state.slideDisplayed === 1) {
                if (i > 2) {
                    return {display: 'none'}
                }
            } else {
                if (i < startSlide || i > endSlide) {
                    return {display: 'none'}
                }
            }
        }

        const hidePrevButton = () => {
            if (this.state.suggestionsSlides > 1) {
                if (this.state.slideDisplayed === 1) {
                    return {display: 'none'}
                }
            } else {
                return {display: 'none'}
            }
        }

        const hideNextButton = () => {
            if (this.state.suggestionsSlides > 1) {
                if (this.state.suggestionsSlides === this.state.slideDisplayed) {
                    return {display: 'none'}
                }
            } else {
                return {display: 'none'}
            }            
        }

        return (
            <div className="suggestions">
                <ol className="suggestions-list">
                    {this.props.suggestions.map((suggestion, i) => {
                        return (
                            <li 
                                style={hideListItem(i)}
                                key={i}
                                onClick={(e) => this.handleClick(e)}>
                                {suggestion}
                            </li>
                        )
                    })}
                </ol>
                <button
                    className="suggestions-control suggestions-control--prev"
                    style={hidePrevButton()}
                    name="previous"
                    onClick={(e) => this.slideSuggestions(e)}>
                    <span>Show previous suggestions</span>
                </button>
                <button 
                    className="suggestions-control suggestions-control--next"
                    style={hideNextButton()}
                    name="next"
                    onClick={(e) => this.slideSuggestions(e)}>
                    <span>Show next suggestions</span>
                </button>
            </div>
        );
    }
}

export default Suggestions;

// if more than three, than display none or dont render