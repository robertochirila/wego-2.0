import React from 'react';
import NavBar from './NavBar';
import {Accounts} from 'meteor/accounts-base';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    onLogout() {
        Accounts.logout();
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <NavBar/>
                <div className={'home--page'}>
                    <div className={'header--home--page'}>
                        <ReactCSSTransitionGroup transitionName="opacityAnimation" transitionAppear={true}
                                                 transitionAppearTimeout={2000} transitionEnter={false}
                                                 transitionLeave={false}>
                            <h1 className={'hero'}>Wego <br/> Inventing Productive Socialising <br/> Since 2018
                                <span
                                    className={'dot'}>.</span></h1>
                        </ReactCSSTransitionGroup>
                        <ReactCSSTransitionGroup transitionName="moveUpAnimation" transitionAppear={true}
                                                 transitionAppearTimeout={3000} transitionEnter={false}
                                                 transitionLeave={false}>
                            <button className={'btn btn__showMe'}>Show me more</button>
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
                <section className={'section--who'}>
                    <div className={'row'}>
                        <div className={'col span-1-of-2'} id={'userPhoto'}>
                            <figure>
                                <img src={'./img/me.png'} className={'userPhoto'}/>
                            </figure>
                        </div>
                        <div className={'col span-1-of-2'} id={'c1'}>
                            <div className={'box'}>
                                <h2 className={'who--header'}>Who am I</h2>
                            </div>
                            <p className={'who--paragraph'}>My name is Roberto Chirila and I am a junior web developer
                                that came up with a new idea on how to motivate students to achieve better academic
                                performance.</p>
                        </div>
                    </div>
                </section>
                <section className={'section--what'}>
                    <div className={'row'}>
                        <div className={'box'}>
                            <h2 className={'what--header'}>What is the purpose of Wego?</h2>
                        </div>
                        <div className={'col span-1-of-2'} id={'p1'}>
                            <p className={'what--paragraph'}>Everybody loves Social Media applications today, but as
                                much as we love them, we can all agree that in terms of productivity, they are not the
                                best choice. Applications like Facebook or Instagram may be fun, but they don’t
                                stimulate the user behavior so that they will actually become better at any skill.
                                This is why I have created Wego, a web application that combines a task tracking system
                                with social aspects such as: following another student’s activities, participating in
                                events together, or encouraging each other to become a better version of ourselves.
                            </p>
                        </div>
                        <div className={'col span-1-of-3'} id={'p2'}>
                            <p className={'what--paragraph'}>My motto is “ Inventing Productive Socialising ” and I feel
                                that my idea will offer a new perspective on how the student’s behavior can be
                                stimulated in order to achieve a better academic performance. </p>
                        </div>

                    </div>
                </section>
                <section className={'section--science'}>
                    <div className={'row'}>
                        <div className={'col span-1-of-2'} id={'p3'}>
                            <div className={'box'}>
                                <h2 className={'science--header'}>The science behind Wego</h2>
                                <p className={'what--paragraph'}>After doing some research into what are the key elements that pay a huge role in user
                                    productivity I have concluded that I should add these features to my application
                                    also. So I have decided to create 3 “ Health Indicators ”: Dopamine Rush, Comfort
                                    Zone and Willpower.</p>
                            </div>
                        </div>
                        <div className={'col span-1-of-2'} id={'p4'}>
                            <div className={'box'}>
                                <figure>
                                    <img src={'./img/science.png'} className={'sciencePhoto'}/>
                                </figure>
                            </div>
                        </div>
                    </div>
                    <section className={'section--dopamine'}>
                        <div className={'row'}>
                            <div className={'col span-1-of-2'} id={'p5'}>
                                <div className={'box'}>
                                    <h2 className={'science--header'}>DOPAMINE</h2>
                                    <p className={'what--paragraph'}>Dopamine is a neurotransmitter that pays a huge
                                        role in
                                        motivating people to repeat a certain behaviour. Your brain increases the levels
                                        of
                                        dopamine in order to encourage you to be more productive. You guessed it, that
                                        is
                                        why you feel so good after you accomplish something. The more difficult the
                                        tasks
                                        which you undertake, the more dopamine will rush into your brain when you finish
                                        them.</p>
                                </div>
                            </div>
                            <div className={'col span-1-of-2'} id={'p6'}>
                                <div className={'box'}>
                                    <figure>
                                        <img src={'./img/dopamine.png'} className={'sciencePhoto'}/>
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className={'section--willpower'}>
                        <div className={'row'}>
                            <div className={'col span-1-of-2'} id={'p7'}>
                                <div className={'box'}>
                                    <h2 className={'science--header'}>WILLPOWER</h2>
                                    <p className={'what--paragraph'}>Willpower is the power to exert your free will
                                        against
                                        internal or external obstacles. Nowadays research points out that willpower is
                                        more
                                        like a muscle, not an ability that is learned. This means that you can train it
                                        by
                                        following the same principles as for example weight-lifting. The more you train
                                        the
                                        muscle and the more you increase the 'obstacle' the better your adaptation to
                                        stress.</p>
                                </div>
                            </div>
                            <div className={'col span-1-of-2'} id={'p8'}>
                                <div className={'box'}>
                                    <figure>
                                        <img src={'./img/willpower.png'} className={'sciencePhoto'}/>
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className={'section--comfort'}>
                        <div className={'row'}>
                            <div className={'col span-1-of-2'} id={'p9'}>
                                <div className={'box'}>
                                    <h2 className={'science--header'}>COMFORT ZONE</h2>
                                    <p className={'what--paragraph'}>We all like it, but we all now that
                                        saying:"Everything
                                        is nice in the comfort zone, but nothing ever grows there". People have become
                                        more
                                        and more attached to this comfort zone and why shouldn't they? All the media
                                        tries
                                        to keep us there. The entire system is screaming:"Buy this an feel good, eat
                                        this
                                        and you will feel amazing, suffering from depression? Take this pill and you
                                        will be
                                        back in your comfort zone ASAP". But it seems that it doesn't work for us to be
                                        happy in this way. In the comfort zone we have no meaning and no reason to live
                                        whatsoever, we cannot change anything there and our impact towards the world is
                                        null. Maybe it is time to realise that we weren't created for living purposeless
                                        and
                                        show the world what we are made of.
                                    </p>
                                </div>
                            </div>
                            <div className={'col span-1-of-2'} id={'p10'}>
                                <div className={'box'}>
                                    <figure>
                                        <img src={'./img/comfortzone.png'} className={'sciencePhoto'}/>
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
                <section className={'section--future'}>

                </section>
            </div>
        )
            ;
    }
}