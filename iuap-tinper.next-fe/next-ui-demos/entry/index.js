import React, {Component} from "react";
import ReactDOM from "react-dom";
import {HashRouter, Link, Route, Switch} from "react-router-dom";
import DemoGroup from "./DemoGroup";
import "./DemoGroup.less";
import DemoRoutes from "./DemoRoutes";

const demoRoutes = DemoRoutes.default ? DemoRoutes.default : DemoRoutes;
const pageRoutes = [];
const pageLinks = [];
for (let key in demoRoutes) {
    pageRoutes.push(
        <Route
            path={`/${key}/:type`}
            render={() => {
                return (
                    <div className={`demos-${key}`}>
                        <DemoGroup componentKey={key} DemoArray={demoRoutes[key]}/>
                    </div>
                );
            }}
        />
    );
    pageRoutes.push(
        <Route
            path={`/detail/component/${key}/:type`}
            exact
            render={() => {
                return (
                    <div className={`demos-${key}`}>
                        <DemoGroup componentKey={key} DemoArray={demoRoutes[key]}/>
                    </div>
                );
            }}
        />
    );
    pageLinks.push(
        <div key={key}>
            <Link style={{padding: 5}} to={`/${key}/bip`}>
                {key}-bip
            </Link>
            <Link style={{padding: 5}} to={`/${key}/other`}>
                {key}-other
            </Link>
            <Link style={{padding: 5}} to={`/${key}/dev`}>
                {key}-dev
            </Link>
        </div>
    );
}

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{padding: "20px"}}>
                <h2>demo已正常启动</h2>
                {pageLinks}
            </div>
        );
    }
}

ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route path={"/"} exact component={App}/>
            {pageRoutes}
        </Switch>
    </HashRouter>,
    document.getElementById("tinperDemo")
);
