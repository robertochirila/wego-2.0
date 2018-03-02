import React from 'react';
import NavBar from './NavBar';
import {Accounts} from 'meteor/accounts-base';

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
                        <h1 className={'hero'}>Wego <br/> Inventing Productive Socialising <br/> Since 2018 <span
                            className={'dot'}>.</span></h1>
                        <button className={'btn btn__showMe'}>Show me more</button>
                    </div>
                </div>
                <section className={'section--who'}>
                    <div className={'row'}>
                        <div className={'col span-1-of-2'}>
                            <figure>
                                <img src={'./img/david.png'} className={'userPhoto'}/>
                            </figure>
                        </div>
                        <div className={'col span-1-of-2'}>
                            <div className={'box'}>
                                <h2 className={'who--header'}>Who am I</h2>
                            </div>
                            <p className={'who--paragraph'}>jjdaskbdashdbasjhsbjhsdbsajhdbsajhdbsdjhsabdjhsdbasjdbajsdbasjdhbd<br/>
                                jhsdbasjdbsajdbsajdbasjdhbasjdbasjdbasjdbasjdbasjdbasjdbasjdbasdbasd</p>
                        </div>
                    </div>
                </section>
                <section className={'section--what'}>
                    <div className={'row'}>
                        <div className={'box'}>
                            <h2 className={'what--header'}>What is the purpose of Wego?</h2>
                        </div>
                        <div className={'col span-1-of-2'}>
                            <p className={'what--paragraph'}>jjdaskbdashdbasjhsbjhsdbsajhdbsajhdbsd<br/>
                                jhsdbasjdbsajdbsajdbasjdhbasjdbasjdbasjd</p>
                        </div>
                        <div className={'col span-1-of-3'}>
                            <p className={'what--paragraph'}>jjdaskbdashdbasjhsbjhsdbsajhdbsajhdbsdjhsa<br/>
                                jhsdbasjdbsajdbsajdbasjdhbasjdbasjdb</p>
                        </div>

                    </div>
                </section>
                <section className={'section--science'}>
                    <div className={'row'}>
                        <div className={'col span-1-of-2'}>
                            <div className={'box'}>
                                <h2 className={'science--header'}>The science behind Wego</h2>
                                <p>ABCABCBABCBIBUVUVYCYYTYCYTCYTYCYCYCYCYC</p>
                            </div>
                        </div>
                        <div className={'col span-1-of-2'}>
                            <div className={'box'}>
                                <figure>
                                    <img src={'./img/science.png'} className={'sciencePhoto'}/>
                                </figure>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={'section--future'}>

                </section>
            </div>
        )
            ;
    }
}