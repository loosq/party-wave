import React, {Component, ErrorInfo, PropsWithChildren} from 'react';
import {Nullable} from 'types';
import bemCn from '../../../libs/bemCn';

import './ErrorBoundary.scss';

type State = {
    error: Nullable<Error>;
    errorInfo: Nullable<ErrorInfo>;
}

const bemBlock = bemCn('error-boundary');

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
                <div className={bemBlock()}>
                    <h2 className={bemBlock('title')}>
                        <span>{HEADER}</span>
                        <span className={bemBlock('secondary-title')}>{HEADER_SECONDARY}</span>
                    </h2>
                    <details className={bemBlock('details')}>
                        <summary className={bemBlock('subtitle')}>
                            Details
                        </summary>
                        <div className={bemBlock('error-description')}>
                            {String(this.state.error)}
                            <br />
                            <code className={bemBlock('code')}>
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
