import React, {Component, ErrorInfo, PropsWithChildren} from 'react';
import {Nullable} from 'types';

import './ErrorBoundary.scss';

type State = {
    error: Nullable<Error>;
    errorInfo: Nullable<ErrorInfo>;
}

const HEADER = 'Oops, something went wrong';
const HEADER_SECONDARY = ' Try to refreshing the page';

export class ErrorBoundary extends Component<PropsWithChildren, State> {
    constructor(props: PropsWithChildren) {
        super(props);
        this.state = {error: null, errorInfo: null};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({
            error,
            errorInfo,
        });
    }

    render() {
        if (this.state.errorInfo && this.state.error) {
            return (
                <div>
                    <h2 className={'title'}>
                        <span>{HEADER}</span>
                        <span className={'secondary-title'}>{HEADER_SECONDARY}</span>
                    </h2>
                    <details className={'details'}>
                        <summary className={'subtitle'}>
                            Details
                        </summary>
                        <div className={'error-description'}>
                            {String(this.state.error)}
                            <br />
                            <code className={'code'}>
                                {this.state.errorInfo.componentStack}
                            </code>
                        </div>
                    </details>
                </div>
            );
        }
        return this.props.children;
    }
}
